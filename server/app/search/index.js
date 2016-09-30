'use strict';

import Criterion from '../../../shared/search/Citerion';

const CRITERIA_TYPE = {
  GRADE: 'GRADE',
  POVERTY_PERCENTAGE: 'POVERTY_PERCENTAGE'
};

const CRITERIA_FIELD_REDUCER = {};
CRITERIA_FIELD_REDUCER[CRITERIA_TYPE.GRADE] = (school) => school.grades || [];
CRITERIA_FIELD_REDUCER[CRITERIA_TYPE.POVERTY_PERCENTAGE] = (school) => school.demographic ? school.demographic.povertyPercentage : undefined;

export function search(schools, criteria) {

  return criteria.reduce((result, criterion) => {

    const fieldReducer = CRITERIA_FIELD_REDUCER[criterion.type];
    return result.filter(school => criterion.filter(fieldReducer(school)));

  }, schools)
}

export {
  CRITERIA_TYPE
}
