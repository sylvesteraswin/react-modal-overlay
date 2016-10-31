import { themr } from 'react-css-themr';
import { LOGO } from '../identifiers.js';
import { logoFactory } from './Logo.js';
import Image from '../image/Image.js';
import theme from './theme.scss';

const Logo = logoFactory(Image);

const ThemedLogo = themr(LOGO, theme)(Logo);

export default ThemedLogo;
export { ThemedLogo as Logo };
