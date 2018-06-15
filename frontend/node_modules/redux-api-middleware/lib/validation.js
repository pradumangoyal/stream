'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidRSAA = exports.validateRSAA = exports.isValidTypeDescriptor = exports.isRSAA = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _RSAA = require('./RSAA');

var _RSAA2 = _interopRequireDefault(_RSAA);

var _lodash = require('lodash.isplainobject');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Is the given action a plain JavaScript object with an [RSAA] property?
 *
 * @function isRSAA
 * @access public
 * @param {object} action - The action to check
 * @returns {boolean}
 */
function isRSAA(action) {
  return (0, _lodash2.default)(action) && action.hasOwnProperty(_RSAA2.default);
}

/**
 * Is the given object a valid type descriptor?
 *
 * @function isValidTypeDescriptor
 * @access private
 * @param {object} obj - The object to check agains the type descriptor definition
 * @returns {boolean}
 */
function isValidTypeDescriptor(obj) {
  var validKeys = ['type', 'payload', 'meta'];

  if (!(0, _lodash2.default)(obj)) {
    return false;
  }
  for (var key in obj) {
    if (!~validKeys.indexOf(key)) {
      return false;
    }
  }
  if (!('type' in obj)) {
    return false;
  } else if (typeof obj.type !== 'string' && (0, _typeof3.default)(obj.type) !== 'symbol') {
    return false;
  }

  return true;
}

/**
 * Checks an action against the RSAA definition, returning a (possibly empty)
 * array of validation errors.
 *
 * @function validateRSAA
 * @access public
 * @param {object} action - The action to check against the RSAA definition
 * @returns {array}
 */
function validateRSAA(action) {
  var validationErrors = [];
  var validCallAPIKeys = ['endpoint', 'method', 'body', 'headers', 'credentials', 'bailout', 'types'];
  var validMethods = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];
  var validCredentials = ['omit', 'same-origin', 'include'];

  if (!isRSAA(action)) {
    validationErrors.push('RSAAs must be plain JavaScript objects with an [RSAA] property');
    return validationErrors;
  }

  for (var key in action) {
    if (key !== _RSAA2.default) {
      validationErrors.push('Invalid root key: ' + key);
    }
  }

  var callAPI = action[_RSAA2.default];
  if (!(0, _lodash2.default)(callAPI)) {
    validationErrors.push('[RSAA] property must be a plain JavaScript object');
  }
  for (var _key in callAPI) {
    if (!~validCallAPIKeys.indexOf(_key)) {
      validationErrors.push('Invalid [RSAA] key: ' + _key);
    }
  }

  var endpoint = callAPI.endpoint,
      method = callAPI.method,
      headers = callAPI.headers,
      credentials = callAPI.credentials,
      types = callAPI.types,
      bailout = callAPI.bailout;

  if (typeof endpoint === 'undefined') {
    validationErrors.push('[RSAA] must have an endpoint property');
  } else if (typeof endpoint !== 'string' && typeof endpoint !== 'function') {
    validationErrors.push('[RSAA].endpoint property must be a string or a function');
  }
  if (typeof method === 'undefined') {
    validationErrors.push('[RSAA] must have a method property');
  } else if (typeof method !== 'string') {
    validationErrors.push('[RSAA].method property must be a string');
  } else if (!~validMethods.indexOf(method.toUpperCase())) {
    validationErrors.push('Invalid [RSAA].method: ' + method.toUpperCase());
  }

  if (typeof headers !== 'undefined' && !(0, _lodash2.default)(headers) && typeof headers !== 'function') {
    validationErrors.push('[RSAA].headers property must be undefined, a plain JavaScript object, or a function');
  }
  if (typeof credentials !== 'undefined') {
    if (typeof credentials !== 'string') {
      validationErrors.push('[RSAA].credentials property must be undefined, or a string');
    } else if (!~validCredentials.indexOf(credentials)) {
      validationErrors.push('Invalid [RSAA].credentials: ' + credentials);
    }
  }
  if (typeof bailout !== 'undefined' && typeof bailout !== 'boolean' && typeof bailout !== 'function') {
    validationErrors.push('[RSAA].bailout property must be undefined, a boolean, or a function');
  }

  if (typeof types === 'undefined') {
    validationErrors.push('[RSAA] must have a types property');
  } else if (!Array.isArray(types) || types.length !== 3) {
    validationErrors.push('[RSAA].types property must be an array of length 3');
  } else {
    var _types = (0, _slicedToArray3.default)(types, 3),
        requestType = _types[0],
        successType = _types[1],
        failureType = _types[2];

    if (typeof requestType !== 'string' && (typeof requestType === 'undefined' ? 'undefined' : (0, _typeof3.default)(requestType)) !== 'symbol' && !isValidTypeDescriptor(requestType)) {
      validationErrors.push('Invalid request type');
    }
    if (typeof successType !== 'string' && (typeof successType === 'undefined' ? 'undefined' : (0, _typeof3.default)(successType)) !== 'symbol' && !isValidTypeDescriptor(successType)) {
      validationErrors.push('Invalid success type');
    }
    if (typeof failureType !== 'string' && (typeof failureType === 'undefined' ? 'undefined' : (0, _typeof3.default)(failureType)) !== 'symbol' && !isValidTypeDescriptor(failureType)) {
      validationErrors.push('Invalid failure type');
    }
  }

  return validationErrors;
}

/**
 * Is the given action a valid RSAA?
 *
 * @function isValidRSAA
 * @access public
 * @param {object} action - The action to check against the RSAA definition
 * @returns {boolean}
 */
function isValidRSAA(action) {
  return !validateRSAA(action).length;
}

exports.isRSAA = isRSAA;
exports.isValidTypeDescriptor = isValidTypeDescriptor;
exports.validateRSAA = validateRSAA;
exports.isValidRSAA = isValidRSAA;