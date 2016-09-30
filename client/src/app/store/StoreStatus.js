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

function isBusy(state) {
  return state.status === STATUS.BUSY;
}

function hasError(state) {
  return state.status === STATUS.ERROR;
}

function isReady(state) {
  return state.status === STATUS.READY;
}

export {
  STATUS,
  initialStatus,
  isBusy,
  isEmpty,
  isReady,
  hasError
}
