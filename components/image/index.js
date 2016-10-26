import { themr } from 'react-css-themr';
import { IMAGE } from '../identifiers.js';
import { Image } from './Image.js';
import theme from './theme.scss';

const ThemedImage = themr(IMAGE, theme)(Image);

export default ThemedImage;
export { ThemedImage as Image };
