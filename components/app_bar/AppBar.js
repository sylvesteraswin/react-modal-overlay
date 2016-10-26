import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { APP_BAR } from '../identifiers.js';
import InjectIconButton from '../button/IconButton.js';

import addEvent from '../utils/add-event-listener';
import removeEvent from '../utils/remove-event-listener';

const factory = (IconButton) => {
  class AppBar extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      fixed: PropTypes.bool,
      leftIcon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      onLeftIconClick: PropTypes.func,
      onRightIconClick: PropTypes.func,
      rightIcon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      scrollHide: PropTypes.bool,
      theme: PropTypes.shape({
        appBar: PropTypes.string,
        fixed: PropTypes.string,
        leftIcon: PropTypes.string,
        rightIcon: PropTypes.string,
        title: PropTypes.string,
      }),
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
    };

    static defaultProps = {
      className: '',
      fixed: false,
      scrollHide: false,
    };

    state = {
      hidden: false,
      height: 0,
      events: {},
    };

    componentDidMount = () => {
      const {
        scrollHide,
      } = this.props;

      if (scrollHide) {
        this.initializeScroll();
      }
    };

    componentWillReceiveProps = (nextProps) => {
      const {
        scrollHide,
      } = this.props;

      if (!scrollHide && nextProps.scrollHide) {
        this.initializeScroll();
      }

      if (scrollHide && !nextProps.scrollHide) {
        this.endScroll();
      }
    };

    componentWillUnmount = () => {
      const {
        scrollHide,
      } = this.props;

      if (scrollHide) {
        this.endScroll();
      }
    };

    initializeScroll = () => {
      const {
        height,
      } = this.rootNode.getBoundingClientRect();
      this.curScroll = window.scrollY;

      this.setState({
        events: {
          scroll: addEvent(window, 'scroll', this.handleScroll, this),
        },
        height,
      });
    };

    endScroll = () => {
      const {
        events: {
          scroll = null,
        },
      } = this.state;

      if (scroll) {
        removeEvent(scroll);
      }
    };

    handleScroll = () => {
      const {
        height,
      } = this.state;

      const scrollDiff = this.curScroll = window.scrollY;
      const hidden = (scrollDiff < 0) && (window.scrollY !== undefined) && (window.scrollY > height);

      this.setState({
        hidden,
      });
      this.curScroll = window.scrollY;
    };

    render = () => {
      const {
        children,
        leftIcon,
        onLeftIconClick,
        onRightIconClick,
        rightIcon,
        theme,
        title,
        fixed,
        className,
      } = this.props;

      const {
        hidden,
      } = this.state;

      const classes = classnames(theme.appBar, {
        [theme.fixed]: fixed,
        [this.scrollHide]: hidden,
      }, className);

      return (
        <header
          className={classes}
          data-react-zvui-framework='app-bar'
          ref={node => {this.refNode = node;}}
          >
          {
            leftIcon &&
            <IconButton
              className={theme.leftIcon}
              onClick={onLeftIconClick}
              icon={leftIcon} />
          }
          {
            title &&
            <h4
              className={theme.title}>{title}</h4>
          }
          {children}
          {
            rightIcon &&
            <IconButton
              className={theme.rightIcon}
              onClick={onRightIconClick}
              icon={rightIcon} />
          }
        </header>
      );
    };
  }
  return AppBar;
};

const AppBar = factory(InjectIconButton);
export default themr(APP_BAR)(AppBar);
export { factory as appBarFactory };
export { AppBar };
