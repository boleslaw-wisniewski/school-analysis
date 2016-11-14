import { assign, cloneDeep, groupBy, isEmpty, flatMap, keyBy, mapValues, pickBy, reduce, uniqBy, values } from 'lodash';
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

const groupWithYear = (result, data, year) => {
  if (isEmpty(data)) {
    return result;
  }

  Object.keys(data)
    .filter(key => !isEmpty(data[key]))
    .forEach(key => {
      if (!result[key]) {
        result[key] = [];
      }
      const perfWithYear = data[key].map(v => Object.assign(v, { year }));
      result[key] = result[key].concat(perfWithYear);
    });

  return result;
};

const performanceHistoryByDBN = mapValues(historyByDBN, history => {
  const historyWithPerformance = history.filter(h => !!h.performance);

  const math = historyWithPerformance
    .reduce((result, h) => groupWithYear(result, h.performance.math, h.year), []);
  const english = historyWithPerformance
    .reduce((result, h) => groupWithYear(result, h.performance.english, h.year), []);

  return {
    math,
    english
  };
});

const nameAndDbn = schools.map(school => assign({}, {
  DBN: school.DBN,
  schoolName: school.schoolName
}));

const schoolNames = uniqBy(nameAndDbn, (school) => school.DBN);

const api = {
  schools,
  schoolNames,
  schoolByDBN,
  performanceHistoryByDBN
};

export default api;

export {
  schools,
  schoolByDBN,
  schoolNames,
  performanceHistoryByDBN
}

