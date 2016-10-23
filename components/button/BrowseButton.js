import React, { Component, PropTypes } from 'react'
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { BUTTON } from '../identifiers.js';

import InjectFontIcon from '../font_icon/FontIcon.js';

const factory = (FontIcon) => {
  class SimpleBrowseButton extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      floating: PropTypes.bool,
      href: PropTypes.string,
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
      theme: PropTypes.shape({
        button: PropTypes.string,
        floating: PropTypes.string,
        icon: PropTypes.string,
        inverse: PropTypes.string,
        mini: PropTypes.string,
        primary: PropTypes.string,
        secondary: PropTypes.string,
        tertiary: PropTypes.string,
        toggle: PropTypes.string
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
      raised: false
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

    handleFileChange = (event) => {
        const {
            onChange,
        } = this.props;

        if (onChange) {
            onChange(event);
        }
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
        ...others,
      } = this.props;

      const element = href ? 'a' : 'button';


      const classes = classnames(theme.button, {
        [theme.floating]: floating,
        [theme.tertiary]: tertiary && !secondary && !primary,
        [theme.secondary]: secondary && !tertiary && !primary,
        [theme.primary]: primary && !tertiary && !secondary,
        [theme.mini]: mini,
        [theme.inverse]: inverse,
      }, className);

      const props = {
        ...others,
        ref: 'label',
        className: classes,
        disabled,
        onMouseUp: this.handleMouseUp,
        onMouseLeave: this.handleMouseLeave,
        'data-react-zvui-framework': 'label',
      };

      return React.createElement(
        element,
        props,
        icon ? <FontIcon className={theme.icon} value={icon}/> : null,
        <span>{label}</span>,
        <input className={classes} type="file" onChange={this.handleFileChange}/>,
        children,
      );
    };
  }

  return SimpleBrowseButton;
};

const BrowseButton = factory(InjectFontIcon);
export default themr(BUTTON)(BrowseButton);
export { factory as browseButtonFactory };
export { BrowseButton };
