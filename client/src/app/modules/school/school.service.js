import http from 'axios';

const SAVED_SCHOOLS = 'savedSchools';
const SEPARATOR = ',';

function fetchSchools() {
  return http.get('/api/search/names')
    .then(result => result.data || []);
}

function fetchSchoolByDBN(dbn) {
  return http.get(`/api/search/dbn/${dbn}`)
    .then(result => result.data || []);
}

function starSchool(dbn) {
  const list = getStarredSchools();
  if (!list.some(s => s === dbn)) {
    list.push(dbn);
    window.localStorage.setItem(SAVED_SCHOOLS, list.join(SEPARATOR));
  }
}

function unstarSchool(dbn) {
  const list = getStarredSchools();
  const filtered = list.filter(s => s !== dbn);
  window.localStorage.setItem(SAVED_SCHOOLS, filtered.join(SEPARATOR));
}

function getStarredSchools() {
  const dbns = window.localStorage.getItem(SAVED_SCHOOLS);
  return dbns ? dbns.split(SEPARATOR) : [];
}

export {
  fetchSchools, fetchSchoolByDBN, getStarredSchools, starSchool, unstarSchool
}


