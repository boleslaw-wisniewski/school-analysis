import { applyMiddleware, combineReducers, createStore } from 'redux';
import school from '../modules/school/school.store';
import search from '../modules/search/search.store';
import thunk  from 'redux-thunk';

const rootReducer = combineReducers({
  school,
  search
});

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const getSchoolNames = function(state) {
  return schools.getSchoolNames(state.school);
};

export {
  getSchoolNames
}
