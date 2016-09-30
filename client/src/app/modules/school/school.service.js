import http from 'axios';

function fetchSchools() {
  return http.get('/api/search/names')
    .then(result => result.data || []);
}

export {
  fetchSchools
}


