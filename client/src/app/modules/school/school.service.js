import http from 'axios';

function fetchSchools() {
  return http.get('/api/search/names')
    .then(result => result.data || []);
}

function fetchSchoolByDBN(dbn) {
  return http.get(`/api/search/dbn/${dbn}`)
    .then(result => result.data || []);
}

export {
  fetchSchools, fetchSchoolByDBN
}


