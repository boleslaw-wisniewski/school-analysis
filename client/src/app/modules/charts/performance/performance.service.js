import { has, keyBy, uniq } from 'lodash';

function getYearAvgPerformance(data) {

  const { performance: { english, math } } = data;
  let englishData = {}, mathData = {};
  if (has(english, 'nonDisabled.length') && english.nonDisabled.length > 0) {
    englishData = keyBy(english.nonDisabled, (d) => d.grade);
  } else if (has(english, 'total.length') && english.total.length > 0) {
    englishData = keyBy(english.total, (d) => d.grade);
  }
  if (has(math, 'nonDisabled.length') && math.nonDisabled.length > 0) {
    mathData = keyBy(math.nonDisabled, (d) => d.grade);
  } else if (has(math, 'total.length') && math.total.length > 0) {
    mathData = keyBy(math.total, (d) => d.grade);
  }

  const keys = uniq(Object.keys(englishData).concat(Object.keys(mathData)));

  return {};
}

export {
  getYearAvgPerformance
}
