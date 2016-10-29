import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LINK } from '../identifiers.js';
import Ellipsis from '../ellipsis/Ellipsis.js';
import FontIcon from '../font_icon/FontIcon.js';

const Link = ({
  active,
  children,
  className,
  countBadge,
  ellipsis,
  length,
  icon,
  label,
  theme,
  ...others
}) => {
  const classes = classnames(theme.link, {
    [theme.active]: active,
  }, className);

  const props = {
    ...others,
    'data-react-zvui-framework': 'link',
    className: classes,
  };

  return React.createElement(
    'a',
    props,
    icon ? <FontIcon className={theme.icon} value={icon} /> : null,
    label ? ellipsis ? <Ellipsis length={length}>{label}</Ellipsis> : <span>{label}</span> : null,
    (countBadge && parseInt(countBadge) !== 0) ? <small>{countBadge}</small> : null,
    children,
  );
};

Link.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  countBadge: PropTypes.number,
  ellipsis: PropTypes.bool,
  length: PropTypes.number,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  label: PropTypes.string,
  theme: PropTypes.shape({
    active: PropTypes.string,
    icon: PropTypes.string,
    link: PropTypes.string,
  }),
};

Link.defaultProps = {
  active: false,
  className: '',
  length: 15,
  ellipsis: false,
};

export default themr(LINK)(Link);
export { Link };
