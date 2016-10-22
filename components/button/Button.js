import React, { Component, PropTypes } from 'react'
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { BUTTON } from '../identifiers.js';

const factory = () => {
  class Button extends Component {
    static propTypes = {
      accent: PropTypes.bool,
      children: PropTypes.node,
      className: PropTypes.string,
      disabled: PropTypes.bool,
      flat: PropTypes.bool,
      floating: PropTypes.bool,
      href: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
      ]),
      inverse: PropTypes.bool,
      label: PropTypes.string,
      mini: PropTypes.bool,
      neutral: PropTypes.bool,
      onMouseLeave: PropTypes.func,
      onMouseUp: PropTypes.func,
      primary: PropTypes.bool,
      raised: PropTypes.bool,
      theme: PropTypes.shape({
        accent: PropTypes.string,
        button: PropTypes.string,
        flat: PropTypes.string,
        floating: PropTypes.string,
        icon: PropTypes.string,
        inverse: PropTypes.string,
        mini: PropTypes.string,
        neutral: PropTypes.string,
        primary: PropTypes.string,
        raised: PropTypes.string,
        rippleWrapper: PropTypes.string,
        toggle: PropTypes.string
      }),
      type: PropTypes.string,
    };

    static defaultProps = {
      accent: false,
      className: '',
      flat: false,
      floating: false,
      mini: false,
      neutral: true,
      primary: false,
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

  }
};
