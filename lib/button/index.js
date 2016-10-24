'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrowseButton = exports.IconButton = exports.Button = undefined;

var _identifiers = require('../identifiers.js');

var _reactCssThemr = require('react-css-themr');

var _Button = require('./Button.js');

var _BrowseButton = require('./BrowseButton.js');

var _IconButton = require('./IconButton.js');

var _FontIcon = require('../font_icon/FontIcon.js');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = (0, _Button.buttonFactory)(_FontIcon2.default);
var IconButton = (0, _IconButton.iconButtonFactory)(_FontIcon2.default);
var BrowseButton = (0, _BrowseButton.browseButtonFactory)(_FontIcon2.default);

var ThemeButton = (0, _reactCssThemr.themr)(_identifiers.BUTTON, _theme2.default)(Button);
var ThemedIconButton = (0, _reactCssThemr.themr)(_identifiers.BUTTON, _theme2.default)(IconButton);
var ThemedBrowseButton = (0, _reactCssThemr.themr)(_identifiers.BUTTON, _theme2.default)(BrowseButton);

exports.default = ThemeButton;
exports.Button = ThemeButton;
exports.IconButton = ThemedIconButton;
exports.BrowseButton = ThemedBrowseButton;