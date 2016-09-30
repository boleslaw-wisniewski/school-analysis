import { schoolNames, schools, schoolByDBN } from '../schools.cache';
import { search, CRITERIA_TYPE } from '../search';
import Criterion from '../../../shared/search/Citerion';

function setupEndpoint(app, acl) {

  app.get('/api/search', function (req, res) {

    const criteria = [
      Criterion.Every(CRITERIA_TYPE.GRADE, ['5', '9', '10', '11', '12']),
      Criterion.Range(CRITERIA_TYPE.POVERTY_PERCENTAGE, { start: 98, end: 100 })
    ];

    const filteredSchools = search(schools, criteria) || [];

    res.send(filteredSchools.map(school => acl.convertSchool(school)));
  });

  app.get('/api/search/names', function (req, res) {
    res.send(schoolNames);
  });

  app.get('/api/search/dbn/:dbn', function (req, res) {
    res.send(schoolByDBN[req.params.dbn]);
  });

}

export default {
  setupEndpoint
}
