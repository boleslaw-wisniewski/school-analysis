import { assign, groupBy, flatMap, keyBy, mapValues, pickBy, reduce, uniqBy, values } from 'lodash';
import schoolsWithHistory from '../../data/nyc.db.json';

function generateGrades(school) {
  const gradeObj = pickBy(school.demographic, (value, key) => key.startsWith('grade'));
  return reduce(gradeObj, (grades, value, key) => {
    if (!(isNaN(value) || value === 0)) {
      grades.push(key.split('grade')[1].toLowerCase());
    }
    return grades;
  }, []);
}
// generated values (MUTATES!)
schoolsWithHistory.forEach(school => {
  school.grades = generateGrades(school);
});

const historyByDBN = groupBy(schoolsWithHistory, 'DBN');
const schoolHistoryByDBN = mapValues(historyByDBN, (entry) => entry.sort((a,b) => a.year < b.year));
const schools = values(schoolHistoryByDBN).map(history => history[0]);
const schoolByDBN = keyBy(schools, 'DBN');

const nameAndDbn = schools.map(school => assign({}, {
  DBN: school.DBN,
  schoolName: school.schoolName
}));

export const schoolNames = uniqBy(nameAndDbn, (school) => school.DBN);

const api = {
  schools,
  schoolNames,
  schoolByDBN
};

export default api;

export {
  schools,
  schoolByDBN,
  schoolNames
}

