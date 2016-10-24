'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dialogFactory = exports.Dialog = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _identifiers = require('../identifiers.js');

var _ActivableRenderer = require('../hoc/ActivableRenderer.js');

var _ActivableRenderer2 = _interopRequireDefault(_ActivableRenderer);

var _Button = require('../button/Button.js');

var _Button2 = _interopRequireDefault(_Button);

var _Overlay = require('../overlay/Overlay.js');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var factory = function factory(Overlay, Button) {
  var Dialog = function Dialog(props) {
    var actions = props.actions;
    var theme = props.theme;
    var active = props.active;
    var className = props.className;
    var type = props.type;
    var title = props.title;
    var children = props.children;
    var onOverlayClick = props.onOverlayClick;
    var onEscKeyDown = props.onEscKeyDown;
    var onOverlayMouseDown = props.onOverlayMouseDown;
    var onOverlayMouseUp = props.onOverlayMouseUp;
    var onOverlayMouseMove = props.onOverlayMouseMove;


    var actionsEl = actions.map(function (action, idx) {
      var className = (0, _classnames4.default)(theme.button, _defineProperty({}, action.className, action.className));
      return _react2.default.createElement(Button, _extends({
        key: idx
      }, action, {
        className: className }));
    });

    var classes = (0, _classnames4.default)([theme.dialog, theme[type]], _defineProperty({}, theme.active, active), className);

    return _react2.default.createElement(
      Overlay,
      {
        active: active,
        onClick: onOverlayClick,
        onEscKeyDown: onEscKeyDown,
        onMouseDown: onOverlayMouseDown,
        onMouseMove: onOverlayMouseMove,
        onMouseUp: onOverlayMouseUp
      },
      _react2.default.createElement(
        'div',
        {
          'data-react-zvui-framework': 'dialog',
          className: classes
        },
        _react2.default.createElement(
          'section',
          {
            role: 'body',
            className: theme.body
          },
          title && _react2.default.createElement(
            'h6',
            {
              className: theme.title },
            title
          ),
          children
        ),
        actionsEl.length && _react2.default.createElement(
          'nav',
          {
            role: 'navigation',
            className: theme.navigation },
          actionsEl
        )
      )
    );
  };

  Dialog.propTypes = {
    actions: _react.PropTypes.array,
    active: _react.PropTypes.bool,
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    onEscKeyDown: _react.PropTypes.func,
    onOverlayClick: _react.PropTypes.func,
    onOverlayMouseDown: _react.PropTypes.func,
    onOverlayMouseMove: _react.PropTypes.func,
    onOverlayMouseUp: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      active: _react.PropTypes.string,
      body: _react.PropTypes.string,
      button: _react.PropTypes.string,
      dialog: _react.PropTypes.string,
      navigation: _react.PropTypes.string,
      title: _react.PropTypes.string
    }),
    title: _react.PropTypes.string,
    type: _react.PropTypes.string
  };

  Dialog.defaultProps = {
    actions: [],
    active: false,
    type: 'normal'
  };

  return (0, _ActivableRenderer2.default)()(Dialog);
};

var Dialog = factory(_Overlay2.default, _Button2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.DIALOG)(Dialog);
exports.Dialog = Dialog;
exports.dialogFactory = factory;