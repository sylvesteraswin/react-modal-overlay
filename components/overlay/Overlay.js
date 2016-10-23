import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { OVERLAY } from '../identifiers.js';
import Portal from '../hoc/Portal.js';

import addEventListener from '../utils/add-event-listener.js';
import removeEventListener from '../utils/remove-event-listener.js';

class Overlay extends Component {
  state = {
    events: {},
  };

  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    invisible: PropTypes.bool,
    onClick: PropTypes.func,
    onEscKeyDown: PropTypes.func,
    theme: PropTypes.shape({
      active: PropTypes.string,
      backdrop: PropTypes.string,
      invisible: PropTypes.string,
      overlay: PropTypes.string
    })
  };

  static defaultProps = {
    invisible: false
  };

  componentDidMount = () => {
    const {
      active,
    } = this.props;

    if (active) {
      this.setState({
        events: {
          escKey: addEventListener(window, 'keydown', this.handleEscKey, this),
        },
      });
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUpdate = (nextProps) => {
    const {
      active,
    } = this.props;

    if (nextProps.active && !active) {
      document.body.style.overflow = 'hidden';
    }
    if (!nextProps.active && active && !document.querySelectorAll('[data-react-zvui-framework="overlay"]')[1]) {
      document.body.style.overflow = '';
    }
  };

  componentDidUpdate = () => {
    const {
      active,
    } = this.props;

    if (active) {
      this.setState({
        events: {
          escKey: addEventListener(window, 'keydown', this.handleEscKey, this),
        },
      });
    }
  };

  componentWillUnmount = () => {
    const {
      events: {
        escKey,
      },
    } = this.props;
    if (!document.querySelectorAll('[data-react-zvui-framework="overlay"]')[1]) {
      document.body.style.overflow = '';
    }

    removeEventListener(escKey);
  };

  handleEscKey = (e) => {
    if (this.props.active && this.props.onEscKeyDown && e.which === 27) {
      this.props.onEscKeyDown(e);
    }
  }

  render = () => {
    const {
      active,
      className,
      children,
      invisible,
      onClick,
      theme
    } = this.props;

    const classes = classnames(theme.overlay, {
      [theme.active]: active,
      [theme.invisible]: invisible
    }, className);

    return (
      <Portal>
        <div className={classes} data-react-toolbox="overlay">
          <div className={theme.backdrop} onClick={onClick} />
          {children}
        </div>
      </Portal>
    );
  };
}

export default themr(OVERLAY)(Overlay);
export { Overlay };
