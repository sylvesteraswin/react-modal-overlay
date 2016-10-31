import React, { PropTypes } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { CARD } from '../identifiers.js';

const Card = ({
  childre,
  className,
  theme,
  ...others,
}) => {
  const classes = classnames(theme.cart, className);

  return (
    <div
      data-react-zvui-framework='card'
      className={classes}
      {...others}
      >
      {children}
    </div>
  );
};

Card.propType = {
  children: PropTypes.any,
  className: PropTypes.string,
  theme: PropTypes.shape({
    card: PropTypes.string,
  }),
};

export default themr(CARD)(Card);
export { Card };
