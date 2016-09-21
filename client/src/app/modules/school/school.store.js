import { createAction, handleActions } from 'redux-actions';

import { initialStatus, STATUS } from '../../store';

const getSchools  = createAction('school-analysis/schools/GET');
const receiveSchools   = createAction('school-analysis/schools/RECEIVED', (schools) => schools);

const initialState = { schools: [], status: initialStatus };

const reducer = handleActions({

  getSchools: (state, action) => ({
    status: STATUS.BUSY
  }),

  receiveSchools: (state, action) => ({
    schools: action.payload,
    status: STATUS.READY
  })
}, initialState);

export default { reducer };

export { getSchools, receiveSchools };
