import { themr } from 'react-css-themr';
import { ELLIPSIS } from '../identifiers.js';
import { Ellipsis } from './Ellipsis.js';
import theme from './theme.scss';

const ThemedEllipsis = themr(ELLIPSIS, theme)(Ellipsis);

export default ThemedEllipsis;
export { ThemedEllipsis as Link };
