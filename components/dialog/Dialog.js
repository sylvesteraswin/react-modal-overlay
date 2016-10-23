import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { DIALOG } from '../identifiers.js';
import ActivableRenderer from '../hoc/ActivableRenderer.js';
import InjectButton from '../button/Button.js';
import InjectOverlay from '../overlay/Overlay.js';

const factory = (Overlay, Button) => {
  const Dialog = (props) => {
    const {
      actions,
      theme,
      active,
      className,
      type,
      title,
      children,
      onOverlayClick,
      onEscKeyDown,
      onOverlayMouseDown,
      onOverlayMouseUp,
      onOverlayMouseMove,
    } = props;

    const actionsEl = actions.map((action, idx) => {
      const className = classnames(theme.button, {
        [action.className]: action.className,
      });
      return (
        <Button
          key={idx}
          {...action}
          className={className} />
      );
    });

    const classes = classnames([theme.dialog, theme[type]], {
      [theme.active]: active,
    }, className);

    return (
      <Overlay
        active={active}
        onClick={onOverlayClick}
        onEscKeyDown={onEscKeyDown}
        onMouseDown={onOverlayMouseDown}
        onMouseMove={onOverlayMouseMove}
        onMouseUp={onOverlayMouseUp}
        >
        <div
          data-react-zvui-framework='dialog'
          className={classes}
          >
          <section
            role='body'
            className={theme.body}
            >
            {
              title &&
              <h6
                className={theme.title}>
                {title}
              </h6>
            }
            {children}
          </section>
          {
            actionsEl.length &&
            <nav
              role="navigation"
              className={theme.navigation}>
              {actionsEl}
            </nav>
          }
        </div>
      </Overlay>
    );
  };

  Dialog.propTypes = {
    actions: PropTypes.array,
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    onEscKeyDown: PropTypes.func,
    onOverlayClick: PropTypes.func,
    onOverlayMouseDown: PropTypes.func,
    onOverlayMouseMove: PropTypes.func,
    onOverlayMouseUp: PropTypes.func,
    theme: PropTypes.shape({
      active: PropTypes.string,
      body: PropTypes.string,
      button: PropTypes.string,
      dialog: PropTypes.string,
      navigation: PropTypes.string,
      title: PropTypes.string
    }),
    title: PropTypes.string,
    type: PropTypes.string,
  };

  Dialog.defaultProps = {
    actions: [],
    active: false,
    type: 'normal',
  };

  return ActivableRenderer()(Dialog);
};

const Dialog = factory(InjectOverlay, InjectButton);
export default themr(DIALOG)(Dialog);
export { Dialog };
export { factory as dialogFactory };
