import store from './school.store';

function getSchools() {
  fetch('/users.json')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
}

export {
  getSchools
}


