import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LOGO } from '../identifiers.js';
import themeImage from '../image/theme.scss';

import InjectImage from '../image/Image.js';

const factory = (Image) => {
  class Logo extends Component {
    static propTypes = {
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

    static defaultProps = {
      className: '',
    };

    render = () => {
      const {
        children,
        src,
        srcSet = null,
        className,
        alt,
        theme,
        ...others
      } = this.props;

      const classes = classnames(theme.logo, className);

      const props = {
        ...others,
        'data-react-zvui-framework': 'logo',
        className: classes,
      };

      return React.createElement(
        'div',
        props,
        src ? <Image src={src} srcSet={srcSet} theme={themeImage} /> : null,
        children,
      );
    };
  }
  return Logo;
};

const Logo = factory(InjectImage);
export default themr(LOGO)(Logo);
export { factory as logoFactory };
export { Logo };
