import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LOGO } from '../identifiers.js';
import Image from '../image/Image.js';

const Logo = ({
  children,
  src,
  srcSet = null,
  className,
  alt,
  theme,
  ...others
}) => {
  const classes = classnames(theme.logo, className);

  const props = {
    ...others,
    'data-react-zvui-framework': 'logo',
    className: classes,
  };

  return React.createElement(
    'div',
    props,
    src ? <Image src={src} srcSet={srcSet} /> : null,
    children,
  );
};

Logo.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  theme: PropTypes.shape({
    link: PropTypes.string,
    image: PropTypes.image,
  }),
};

Logo.defaultProps = {
  className: '',
};

export default themr(LOGO)(Logo);
export { Logo };
