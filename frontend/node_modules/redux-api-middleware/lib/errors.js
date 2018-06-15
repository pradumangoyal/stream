'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiError = exports.RequestError = exports.InternalError = exports.InvalidRSAA = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Error class for an RSAA that does not conform to the RSAA definition
 *
 * @class InvalidRSAA
 * @access public
 * @param {array} validationErrors - an array of validation errors
 */
var InvalidRSAA = function (_Error) {
  (0, _inherits3.default)(InvalidRSAA, _Error);

  function InvalidRSAA(validationErrors) {
    (0, _classCallCheck3.default)(this, InvalidRSAA);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InvalidRSAA.__proto__ || (0, _getPrototypeOf2.default)(InvalidRSAA)).call(this));

    _this.name = 'InvalidRSAA';
    _this.message = 'Invalid RSAA';
    _this.validationErrors = validationErrors;
    return _this;
  }

  return InvalidRSAA;
}(Error);

/**
 * Error class for a custom `payload` or `meta` function throwing
 *
 * @class InternalError
 * @access public
 * @param {string} message - the error message
 */


var InternalError = function (_Error2) {
  (0, _inherits3.default)(InternalError, _Error2);

  function InternalError(message) {
    (0, _classCallCheck3.default)(this, InternalError);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (InternalError.__proto__ || (0, _getPrototypeOf2.default)(InternalError)).call(this));

    _this2.name = 'InternalError';
    _this2.message = message;
    return _this2;
  }

  return InternalError;
}(Error);

/**
 * Error class for an error raised trying to make an API call
 *
 * @class RequestError
 * @access public
 * @param {string} message - the error message
 */


var RequestError = function (_Error3) {
  (0, _inherits3.default)(RequestError, _Error3);

  function RequestError(message) {
    (0, _classCallCheck3.default)(this, RequestError);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (RequestError.__proto__ || (0, _getPrototypeOf2.default)(RequestError)).call(this));

    _this3.name = 'RequestError';
    _this3.message = message;
    return _this3;
  }

  return RequestError;
}(Error);

/**
 * Error class for an API response outside the 200 range
 *
 * @class ApiError
 * @access public
 * @param {number} status - the status code of the API response
 * @param {string} statusText - the status text of the API response
 * @param {object} response - the parsed JSON response of the API server if the
 *  'Content-Type' header signals a JSON response
 */


var ApiError = function (_Error4) {
  (0, _inherits3.default)(ApiError, _Error4);

  function ApiError(status, statusText, response) {
    (0, _classCallCheck3.default)(this, ApiError);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (ApiError.__proto__ || (0, _getPrototypeOf2.default)(ApiError)).call(this));

    _this4.name = 'ApiError';
    _this4.status = status;
    _this4.statusText = statusText;
    _this4.response = response;
    _this4.message = status + ' - ' + statusText;
    return _this4;
  }

  return ApiError;
}(Error);

exports.InvalidRSAA = InvalidRSAA;
exports.InternalError = InternalError;
exports.RequestError = RequestError;
exports.ApiError = ApiError;