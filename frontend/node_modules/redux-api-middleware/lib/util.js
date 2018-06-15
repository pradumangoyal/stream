'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionWith = exports.normalizeTypeDescriptors = exports.getJSON = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Extract JSON body from a server response
 *
 * @function getJSON
 * @access public
 * @param {object} res - A raw response object
 * @returns {promise|undefined}
 */
var getJSON = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(res) {
    var contentType, emptyCodes;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contentType = res.headers.get('Content-Type');
            emptyCodes = [204, 205];

            if (!(!~emptyCodes.indexOf(res.status) && contentType && ~contentType.indexOf('json'))) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return res.json();

          case 5:
            return _context.abrupt('return', _context.sent);

          case 8:
            _context.next = 10;
            return _promise2.default.resolve();

          case 10:
            return _context.abrupt('return', _context.sent);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getJSON(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Blow up string or symbol types into full-fledged type descriptors,
 *   and add defaults
 *
 * @function normalizeTypeDescriptors
 * @access private
 * @param {array} types - The [RSAA].types from a validated RSAA
 * @returns {array}
 */


/**
 * Evaluate a type descriptor to an FSA
 *
 * @function actionWith
 * @access private
 * @param {object} descriptor - A type descriptor
 * @param {array} args - The array of arguments for `payload` and `meta` function properties
 * @returns {object}
 */
var actionWith = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(descriptor, args) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return typeof descriptor.payload === 'function' ? descriptor.payload.apply(descriptor, (0, _toConsumableArray3.default)(args)) : descriptor.payload;

          case 3:
            descriptor.payload = _context2.sent;
            _context2.next = 10;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2['catch'](0);

            descriptor.payload = new _errors.InternalError(_context2.t0.message);
            descriptor.error = true;

          case 10:
            _context2.prev = 10;
            _context2.next = 13;
            return typeof descriptor.meta === 'function' ? descriptor.meta.apply(descriptor, (0, _toConsumableArray3.default)(args)) : descriptor.meta;

          case 13:
            descriptor.meta = _context2.sent;
            _context2.next = 21;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t1 = _context2['catch'](10);

            delete descriptor.meta;
            descriptor.payload = new _errors.InternalError(_context2.t1.message);
            descriptor.error = true;

          case 21:
            return _context2.abrupt('return', descriptor);

          case 22:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 6], [10, 16]]);
  }));

  return function actionWith(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalizeTypeDescriptors(types) {
  var _types = (0, _slicedToArray3.default)(types, 3),
      requestType = _types[0],
      successType = _types[1],
      failureType = _types[2];

  if (typeof requestType === 'string' || (typeof requestType === 'undefined' ? 'undefined' : (0, _typeof3.default)(requestType)) === 'symbol') {
    requestType = { type: requestType };
  }

  if (typeof successType === 'string' || (typeof successType === 'undefined' ? 'undefined' : (0, _typeof3.default)(successType)) === 'symbol') {
    successType = { type: successType };
  }
  successType = (0, _extends3.default)({
    payload: function payload(action, state, res) {
      return getJSON(res);
    }
  }, successType);

  if (typeof failureType === 'string' || (typeof failureType === 'undefined' ? 'undefined' : (0, _typeof3.default)(failureType)) === 'symbol') {
    failureType = { type: failureType };
  }
  failureType = (0, _extends3.default)({
    payload: function payload(action, state, res) {
      return getJSON(res).then(function (json) {
        return new _errors.ApiError(res.status, res.statusText, json);
      });
    }
  }, failureType);

  return [requestType, successType, failureType];
}exports.getJSON = getJSON;
exports.normalizeTypeDescriptors = normalizeTypeDescriptors;
exports.actionWith = actionWith;