import { BUTTON } from '../identifiers.js';
import { themr } from 'react-css-themr';
import { buttonFactory } from './Button.js';
// import { browseButtonFactory } from './BrowseButton.js';
import { iconButtonFactory } from './IconButton.js';
import FontIcon from '../font_icon/FontIcon.js';

import theme from './theme.scss';

const Button = buttonFactory(FontIcon);
const IconButton = iconButtonFactory(FontIcon);
// const BrowseButton = browseButtonFactory(FontIcon);

const ThemeButton = themr(BUTTON, theme)(Button);
const ThemedIconButton = themr(BUTTON, theme)(IconButton);
// const ThemedBrowseButton = themr(BUTTON, theme)(BrowseButton);

export default ThemeButton;
export { ThemeButton as Button };
export { ThemedIconButton as IconButton };
// export { ThemedBrowseButton as BrowseButton };
