import { themr } from 'react-css-themr';
import { LOGO } from '../identifiers.js';
import { Logo } from './Logo.js';
import theme from './theme.scss';

const ThemedLogo = themr(LOGO, theme)(Logo);

export default ThemedLogo;
export { ThemedLogo as Logo };
