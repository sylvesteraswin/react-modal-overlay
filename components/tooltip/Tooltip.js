import React, { Component, PropTypes } from 'react';
import Portal from '../hoc/Portal';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TOOLTIP } from '../identifiers.js';
import eventHelper from '../utils/event-helpers';
import utils from '../utils/utils';

import addEvent from '../utils/add-event-listener.js';
import removeEvent from '../utils/remove-event-listener.js';

const POSITION = {
  BOTTOM: 'bottom',
  HORIZONTAL: 'horizontal',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  VERTICAL: 'vertical',
};

const defaults = {
  className: '',
  delay: 0,
  hideOnClick: true,
  position: POSITION.VERTICAL,
  theme: {}
};

const toolTipFactory = (options = {}) => {
  const {
    className: defaultClassName,
    delay: defaultDelay,
    hideOnClick: defaultHideOnClick,
    position: defaultPosition,
    theme: defaultTheme
  } = {...defaults, ...options};

  return ComposedComponent => {
    class ToolTippedComponent extends Component {
      static propTypes = {
        children: PropTypes.any,
        className: PropTypes.string,
        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        theme: PropTypes.shape({
          tooltip: PropTypes.string,
          tooltipActive: PropTypes.string,
          tooltipWrapper: PropTypes.string,
        }),
        tooltip: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.node,
        ]),
        tooltipDelay: PropTypes.number,
        tooltipHideOnClick: PropTypes.bool,
        tooltipPosition: PropTypes.oneOf(
          Object.keys(POSITION).map(key => POSITION[key])
        )
      };

      static defaultProps = {
        className: defaultClassName,
        tooltipDelay: defaultDelay,
        tooltipHideOnClick: defaultHideOnClick,
        tooltipPosition: defaultPosition,
      };

      state = {
        active: false,
        position: this.props.tooltipPosition,
        visible: false,
        events: {},
      };

      componentWillUnMount = () => {
        const {
          transitionend,
        } = this.state.events;

        if (this.tooltip && transitionend) {
          removeEvent(transitionend);
        }
      };

      _getPosition = (element, {
        width,
        height,
      }) => {
        const {
          tooltipPosition,
        } = this.props;

        if (tooltipPosition === POSITION.HORIZONTAL) {
          const origin = element.getBoundingClientRect();

          const toRight = origin.left < ((width / 2) - origin.width /2);
          return toRight ? POSITION.RIGHT : POSITION.LEFT;
        } else if (tooltipPosition === POSITION.VERTICAL) {
          const origin = element.getBoundingClientRect();

          const toBottom = origin.top < ((height / 2) - origin.height /2);
          return toBottom ? POSITION.BOTTOM : POSITION.TOP;
        } else {
          return tooltipPosition;
        }
      };

      _calculatePosition = (element) => {
        const {
          top,
          left,
          height,
          width,
        } = element.getBoundingClientRect();

        const position = this._getPosition(element, {
          width,
          height,
        });

        const xOffset = window.scrollX || window.pageXOffset;
        const yOffset = window.scrollY || window.pageYOffset;

        if (position === POSITION.BOTTOM) {
          return {
            top: top + height + yOffset,
            left: left + (width / 2) + xOffset,
            position,
          };
        } else if (position === POSITION.TOP) {
          return {
            top: top + yOffset,
            left: left + (width / 2) + xOffset,
            position,
          };
        } else if (position === POSITION.LEFT) {
          return {
            top: top + (height / 2) + yOffset,
            left: left + xOffset,
            position,
          };
        } else if (position === POSITION.RIGHT) {
          return {
            top: top + (height / 2) + yOffset,
            left: left + width + xOffset,
            position,
          };
        }
      };

      _onTransformEnd = (e) => {
        if (e.propertyName === 'transform') {
          const {
            transitionend = false,
          } = this.state.events;

          if (transitionend) {
            removeEvent(transitionend);
            this.setState({
              visible: false,
            });
          }
        }
      };

      _activate = ({ top, left, position, }) => {
        const {
          tooltipDelay,
        } = this.props;

        if (this.tooltipTimeout) {
          clearTimeout(this.tooltipTimeout);
        }

        this.setState({
          visible: true,
          position,
        });

        this.tooltipTimeout = setTimeout(() => {
          this.setState({
            active: true,
            top,
            left,
          })
        }, tooltipDelay);
      };

      _deactivate = () => {
        const {
          active,
          visible,
        } = this.state;

        if (this.tooltipTimeout) {
          clearTimeout(this.tooltipTimeout);
        }

        if (active) {
          const eventName = eventHelper.transitionEventNamesFor(this.tooltip);
          if (eventName) {
            this.setState({
              events: Object.assign({}, this.state.events, {
                transitionend: addEvent(this.tooltip, eventName, this._onTransformEnd, this),
              }),
            });
          }
          this.setState({
            active: false,
          });
        } else if (visible) {
          this.setState({
            visible: false,
          })
        }
      };

      _handleClick = (event) => {
        const {
          tooltipHideOnClick,
          onClick,
        } = this.props;

        if (tooltipHideOnClick) {
          this._deactivate();
        }

        if (typeof onClick === 'function') {
          onClick.call(this, event);
        }
      };

      _handleMouseEnter = (event) => {
        const {
          onMouseEnter,
        } = this.props;
        this._activate(this._calculatePosition(event.target));

        if (typeof onMouseEnter === 'function') {
          onMouseEnter.call(this, event);
        }
      };

      _handleMouseLeave = (event) => {
        const {
          onMouseLeave,
        } = this.props;

        this._deactivate();

        if (typeof onMouseLeave === 'function') {
          onMouseLeave.call(this, event);
        }
      };

      render = () => {
        const {
          active,
          left,
          top,
          position,
          visible,
        } = this.state;

        const {
          children,
          className,
          theme,
          tooltip,
          tooltipDelay,       //eslint-disable-line no-unused-vars
          tooltipHideOnClick, //eslint-disable-line no-unused-vars
          tooltipPosition,    //eslint-disable-line no-unused-vars
          ...others,
        } = this.props;

        const positionClass = `tooltip${position.charAt(0).toUpperCase() + position.slice(1)}`;

        const classes = classnames(theme.tooltip, {
          [theme.tooltipActive]: active,
          [theme[positionClass]]: theme[positionClass],
        });

        return (
          <ComposedComponent
            {...others}
            className={className}
            onClick={this._handleClick}
            onMouseEnter={this._handleMouseEnter}
            onMouseLeave={this._handleMouseLeave}
            theme={theme}
            >
            {children ? children : null}
            {
              visible && (
                <Portal>
                  <span
                    ref={t => this.tooltip = t}
                    className={classes}
                    data-react-zvui-framework={tooltip}
                    style={{
                      top,
                      left,
                    }}
                    >
                      <span
                        className={theme.tooltipInner}
                        >
                        {tooltip}
                      </span>
                    </span>
                </Portal>
              )
            }
          </ComposedComponent>
        );
      };
    }

    return themr(TOOLTIP, defaultTheme)(ToolTippedComponent);
  };
};

export default toolTipFactory;
