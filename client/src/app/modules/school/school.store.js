import { createAction, handleActions } from 'redux-actions';

import { initialStatus, STATUS } from '../../store/StoreStatus';

const fetchSchoolsAction  = createAction('school-analysis/schools/FETCH');
const receiveSchoolsAction = createAction('school-analysis/schools/RECEIVED');
const selectSchoolAction = createAction('school-analysis/schools/SELECTED');
const unselectSchoolAction = createAction('school-analysis/schools/UNSELECTED');

const initialState = { schoolNames: [], status: initialStatus, selected: [] };

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
  }

}, initialState);

function getSchoolNames(schools) {
  return schools.schoolNames;
}

function getSelectedSchools(schools) {
  return schools.selected;
}

export default reducer;

export { fetchSchoolsAction, receiveSchoolsAction, selectSchoolAction, unselectSchoolAction,
  getSchoolNames, getSelectedSchools };
