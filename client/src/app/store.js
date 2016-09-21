import { applyMiddleware, combineReducers, createStore } from 'redux';
import schools from './modules/school/school.store';
import search from './modules/search/search.store';
import thunk  from 'redux-thunk';

const rootReducer = combineReducers({
  schools,
  search
});

const STATUS = {
  EMPTY: 'EMPTY',
  BUSY: 'BUSY',
  ERROR: 'ERROR',
  READY: 'READY'
};

const initialStatus = STATUS.EMPTY;

function isEmpty(state) {
  return state.status === STATUS.EMPTY;
}

function isBusy() {
  return state.status === STATUS.BUSY;
}

function hasError() {
  return state.status === STATUS.ERROR;
}

function isReady() {
  return state.status === STATUS.READY;
}

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export {
  STATUS,
  initialStatus,
  isBusy,
  isEmpty,
  isReady,
  hasError
}
