import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { ELLIPSIS } from '../identifiers.js';

const Ellipsis = ({
  children,
  length,
  tail,
  showFullWord,
  className,
  theme,
  ...others,
}) => {
  const classes = classnames(theme.ellipsis, className);

  const props = {
    className,
  };

  let displayText;
  let displayTail;

  if ((typeof children === 'string') && (length > 0) && (children.length >= length)) {
    if (length - tail.length <= 0) {
      displayText = '';
    } else {
      // This will slice to the length
      displayText = children.slice(0, length - tail.length);
      if (showFullWord) {
        // This will make sure the ellipsis is always at the end of a word
        let spaceMin = Math.min(displayText.length, displayText.lastIndexOf(' '));
        if (spaceMin < 0) {
            spaceMin = displayText.length;
        }
        displayText = displayText.slice(0, spaceMin);
      }
      displayTail = (tail);
    }
  } else {
    displayText = children;
  }

  return React.createElement(
    'span',
    props,
    displayText,
    displayTail,
  );
};

Ellipsis.propTypes = {
  children: PropTypes.node.isRequired,
  length: PropTypes.number.isRequired,
  tail: PropTypes.string,
  className: PropTypes.string,
  showFullWord: PropTypes.bool,
  theme: PropTypes.shape({
    ellipsis: PropTypes.string,
  }),
};

Ellipsis.defaultProps = {
  className: '',
  tail: '...',
  showFullWord: false,
};

export default themr(ELLIPSIS)(Ellipsis);
export { Ellipsis };
