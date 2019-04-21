import api from 'helpers/api.lib';

/**
 * Default
 */
const defaultState = {}

/**
 * Get IPFS
 */
export const GET_IPFS = 'GET_IPFS';
export const GET_IPFS_OK = 'GET_IPFS_OK';
export const GET_IPFS_FAIL = 'GET_IPFS_FAIL';

function _getIPFS(hash, callback) {
  api.getIPFS(hash).then(re => {
    return callback(null, re.data.data);
  }).catch(er => {
    return callback(er, null);
  });
}

export const getIPFS = (hash) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_IPFS });
      _getIPFS(hash, (er, re) => {
        if (er) {
          dispatch({ type: GET_IPFS_FAIL, reason: er, data: null });
          return reject(er);
        }
        dispatch({ type: GET_IPFS_OK, reason: null, data: re });
        return resolve(re);
      });
    });
  }
}

/**
 * Set IPFS
 */
export const SET_IPFS = 'SET_IPFS';
export const SET_IPFS_OK = 'SET_IPFS_OK';
export const SET_IPFS_FAIL = 'SET_IPFS_FAIL';

function _setIPFS(data, callback) {
  api.setIPFS(data).then(re => {
    return callback(null, re.data.data);
  }).catch(er => {
    return callback(er, null);
  });
}

export const setIPFS = (data) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: SET_IPFS });
      _setIPFS(data, (er, re) => {
        if (er) {
          dispatch({ type: SET_IPFS_FAIL, reason: er, data: null });
          return reject(er);
        }
        dispatch({ type: SET_IPFS_OK, reason: null, data: re });
        return resolve(re);
      });
    });
  }
}

/**
 * Buy Data
 */
export const BUY_DATA = 'BUY_DATA';
export const BUY_DATA_OK = 'BUY_DATA_OK';
export const BUY_DATA_FAIL = 'BUY_DATA_FAIL';

function _buyData(txId, data, callback) {
  api.buyData(txId, data).then(re => {
    return callback(null, re.data.data);
  }).catch(er => {
    return callback(er, null);
  });
}

export const buyData = (txId, data) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: BUY_DATA });
      _buyData(txId, data, (er, re) => {
        if (er) {
          dispatch({ type: BUY_DATA_FAIL, reason: er, data: null });
          return reject(er);
        }
        dispatch({ type: BUY_DATA_OK, reason: null, data: re });
        return resolve(re);
      });
    });
  }
}

/**
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_IPFS_OK:
      return { ...state, ...action.data };
    case GET_IPFS_FAIL:
      return { ...state, ...action.data };
    case SET_IPFS_OK:
      return { ...state, ...action.data };
    case SET_IPFS_FAIL:
      return { ...state, ...action.data };
    case BUY_DATA_OK:
      return { ...state, ...action.data };
    case BUY_DATA_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}