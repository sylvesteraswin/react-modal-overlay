'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FontIcon = exports.Drawer = exports.Dialog = exports.Link = undefined;

var _button = require('./button');

Object.keys(_button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _button[key];
    }
  });
});

require('./utils/polyfills');

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _dialog = require('./dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _drawer = require('./drawer');

var _drawer2 = _interopRequireDefault(_drawer);

var _font_icon = require('./font_icon');

var _font_icon2 = _interopRequireDefault(_font_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import polyfills for IE11

exports.Link = _link2.default;
exports.Dialog = _dialog2.default;
exports.Drawer = _drawer2.default;
exports.FontIcon = _font_icon2.default;