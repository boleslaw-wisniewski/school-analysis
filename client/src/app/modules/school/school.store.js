import { createAction, handleActions } from 'redux-actions';

import { initialStatus, STATUS } from '../../store/StoreStatus';
import { getStarredSchools as getPersistedStarredSchools } from './school.service';

const fetchSchoolsAction  = createAction('school-analysis/schools/FETCH');
const receiveSchoolsAction = createAction('school-analysis/schools/RECEIVED');
const selectSchoolAction = createAction('school-analysis/schools/SELECTED');
const unselectSchoolAction = createAction('school-analysis/schools/UNSELECTED');
const starSchoolAction = createAction('school-analysis/schools/STAR');
const unstarSchoolAction = createAction('school-analysis/schools/UNSTAR');


const starred = getPersistedStarredSchools();
const initialState = { schoolNames: [], status: initialStatus, selected: [], starred };

const reducer = handleActions({

  [fetchSchoolsAction]: (state, action) => Object.assign({}, state, { status: STATUS.BUSY }),

  [receiveSchoolsAction]: (state, action) => {
    return Object.assign({}, state, {
      schoolNames: action.payload,
      status: STATUS.READY
    });
  },

  [selectSchoolAction]: (state, action) => {
    return Object.assign({}, state, {
      selected: state.selected.concat(action.payload),
      status: STATUS.READY
    });
  },

  [unselectSchoolAction]: (state, action) => {
    return Object.assign({}, state, {
      selected: state.selected.filter(school => school.DBN !== action.payload)
    });
  },

  [starSchoolAction]: (state, action) => {
    return Object.assign({}, state, {
      starred: state.starred.concat(action.payload),
      status: STATUS.READY
    });
  },

  [unstarSchoolAction]: (state, action) => {
    return Object.assign({}, state, {
      starred: state.starred.filter(DBN => DBN !== action.payload)
    });
  }

}, initialState);

function getSchoolNames(schools) {
  return schools.schoolNames;
}

function getSelectedSchools(schools) {
  return schools.selected;
}

function getStarredSchools(schools) {
  return schools.starred;
}

export default reducer;

export {
  fetchSchoolsAction, receiveSchoolsAction,
  selectSchoolAction, unselectSchoolAction,
  starSchoolAction, unstarSchoolAction,
  getSchoolNames, getSelectedSchools, getStarredSchools };
