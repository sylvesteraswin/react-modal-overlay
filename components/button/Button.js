import React, { Component, PropTypes } from 'react'
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { BUTTON } from '../identifiers.js';

import InjectFontIcon from '../font_icon/FontIcon.js';
import InjectEllipsis from '../ellipsis/Ellipsis.js';

const factory = (FontIcon, Ellipsis) => {
  class Button extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      floating: PropTypes.bool,
      href: PropTypes.string,
      ellipsis: PropTypes.bool,
      length: PropTypes.number,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      inverse: PropTypes.bool,
      label: PropTypes.string,
      mini: PropTypes.bool,
      onMouseLeave: PropTypes.func,
      onMouseUp: PropTypes.func,
      primary: PropTypes.bool,
      secondary: PropTypes.bool,
      tertiary: PropTypes.bool,
      inline: PropTypes.bool,
      theme: PropTypes.shape({
        button: PropTypes.string,
        floating: PropTypes.string,
        icon: PropTypes.string,
        inverse: PropTypes.string,
        mini: PropTypes.string,
        primary: PropTypes.string,
        secondary: PropTypes.string,
        tertiary: PropTypes.string,
        toggle: PropTypes.string,
        inline: PropTypes.string,
      }),
      type: PropTypes.string,
    };

    static defaultProps = {
      className: '',
      floating: false,
      mini: false,
      primary: false,
      secondary: false,
      tertiary: true,
      inline: false,
      ellipsis: false,
      length: 10,
    };

    handleMouseUp = (event) => {
      const {
        button,
      } = this.refs;

      const {
        onMouseUp,
      } = this.props;

      button.blur();
      if (onMouseUp) {
        onMouseUp(event)
      };
    };

    handleMouseLeave = (event) => {
      const {
        button,
      } = this.refs;

      const {
        onMouseLeave,
      } = this.props;

      button.blur();
      if (onMouseLeave) {
        onMouseLeave(event)
      };
    };

    render = () => {
      const {
        children,
        className,
        floating,
        href,
        icon,
        inverse,
        label,
        mini,
        primary,
        secondary,
        tertiary,
        theme,
        disabled,
        inline,
        ellipsis,
        length,
        ...others,
      } = this.props;

      const element = href ? 'a' : 'button';


      const classes = classnames({
        [theme.button]: !floating,
        [theme.floating]: floating,
        [theme.tertiary]: tertiary && !secondary && !primary,
        [theme.secondary]: secondary,
        [theme.primary]: primary,
        [theme.mini]: mini,
        [theme.inline]: inline,
        [theme.inverse]: inverse,
      }, className);

      const props = {
        ...others,
        href,
        ref: 'button',
        className: classes,
        disabled,
        onMouseUp: this.handleMouseUp,
        onMouseLeave: this.handleMouseLeave,
        'data-react-zvui-framework': 'button',
      };

      return React.createElement(
        element,
        props,
        icon ? <FontIcon className={theme.icon} value={icon} /> : null,
        ellipsis ? <Ellipsis length={length}>{label}</Ellipsis> : label,
        children,
      );
    };
  }

  return Button;
};

const Button = factory(InjectFontIcon, InjectEllipsis);
export default themr(BUTTON)(Button);
export { factory as buttonFactory };
export { Button };
