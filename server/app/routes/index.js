import requireDir from 'require-dir';
import { assign, pick, values } from 'lodash';


const acl = {
  convertSchool: (school) => pick(school, 'DBN', 'schoolName', 'grades')
};

function setupEndpoints(app) {
  const routes = requireDir('./');
  values(routes).forEach(route => route.default ? route.default.setupEndpoint(app, acl) : route.setupEndpoint(app, acl));
}

export default {
  setupEndpoints
}
