import fs  from 'fs';
import printf from 'printf';
import { flatMap, keyBy, groupBy, omitBy, pick, pickBy } from 'lodash';

import schools from '../../data/nyc.db.json';
import config from '../../config';

const schoolsByDBNAndYear = keyBy(schools, (school) => `${school.DBN}-${school.year}`);
const schoolsByDBN = groupBy(schools, 'DBN');

function getPerformance(list, entry) {
  if (!list) {
    list = [];
  }
  const level1 = entry['# Level 1'];
  if (level1 && !isNaN(level1)) {
    list.push({
      grade: entry.Grade,
      count: entry['Number Tested'],
      l1Total: entry['# Level 1'],
      l1Percentage: entry['% Level 1'],
      l2Total: entry['# Level 2'],
      l2Percentage: entry['% Level 2'],
      l3Total: entry['# Level 3'],
      l3Percentage: entry['% Level 3'],
      l4Total: entry['# Level 4'],
      l4Percentage: entry['% Level 4']
    });
  }
  return list;
}

const perfKey = 'math';
const performance = []; //require(`/Users/bolek.wisniewski/Downloads/school data/performance/${perfKey}.json`);
performance.forEach(entry => {
  const key = `${entry.DBN}-${entry.Year}`;
  let school = schoolsByDBNAndYear[key];

  if (!school) {
    console.log('creating school', entry.DBN, entry['School Name'], entry.Year);
    school = {
      DBN: entry.DBN,
      schoolName: entry['School Name'],
      year: entry.Year,
      demographic: {}
    };
    schools.push(school);
    schoolsByDBNAndYear[key] = school;
  }

  if (!school.performance) {
    school.performance = { math: {}, english: {} };
  }

  if (Number.isInteger(entry.Grade)) {
    switch (entry.Category) {
      case 'ELL':
        school.performance[perfKey].ell = getPerformance(school.performance[perfKey].ell, entry);
        break;
      case 'EP':
        school.performance[perfKey].nonEll = getPerformance(school.performance[perfKey].nonEll, entry);
        break;
      case 'All Students':
        school.performance[perfKey].total = getPerformance(school.performance[perfKey].total, entry);
        break;
      case 'SWD':
        school.performance[perfKey].disabled = getPerformance(school.performance[perfKey].disabled, entry);
        break;
      case 'Not SWD':
        school.performance[perfKey].nonDisabled = getPerformance(school.performance[perfKey].nonDisabled, entry);
        break;
      default:
        console.log('found unknown category', entry.Category);
    }
  }

});

const classSizeYear = 2012;
const classsize = []; //require(`/Users/bolek.wisniewski/Downloads/school data/class size/classsize-${classSizeYear}.json`);
classsize.forEach(entry => {
  const DBN = printf('%02d', entry.CSD) + entry['SCHOOL CODE'];
  const key = `${DBN}-${classSizeYear}`;
  let school = schoolsByDBNAndYear[key];

  if (!school) {
    console.log('creating school', DBN, entry['SCHOOL NAME'], classSizeYear);
    school = {
      DBN,
      schoolName: entry['SCHOOL NAME'],
      year: classSizeYear,
      demographic: {},
      performance: {math: {}, english: {}}
    };
    schools.push(school);
    schoolsByDBNAndYear[key] = school;
  }

  if (!school.classSize) {
    school.classSize = [];
  }

  const grade = entry.GRADE === '0K' ? 0 : entry.GRADE;
  if (!isNaN(grade)) {
    school.classSize.push({
      grade,
      type: entry['PROGRAM TYPE'],
      avgClassSize: entry['AVERAGE CLASS SIZE']
    });
  }


});


const details = [];//require(`/Users/bolek.wisniewski/Downloads/school data/school-details.json`);
details.forEach(entry => {
  const DBN = entry['ATS System Code'];
  const schoolRecords = schoolsByDBN[DBN];
  if (schoolRecords) {
    schoolRecords.forEach(school => {
      school.gradeType = entry['Location Category Description'].toLowerCase();
      school.opened = entry['Open Date'].replace(/\s+/g, " ");
      school.address = {
        street: entry['Primary Address'].toLowerCase().replace(/\s+/g, " "),
        city: entry['City'].toLowerCase(),
        zip: entry['Zip']
      };
      const code = entry['Geographical District Code'];
      school.district = code < 10 ? `0${code}` : code+"";
    });
  }
});

const dataDir = config.utils_paths.data();
const exportFile = `${dataDir}/${config.data.db}`;
console.log('exporting to:', exportFile);
fs.writeFileSync(exportFile, JSON.stringify(schools, null, 2), 'utf8');

