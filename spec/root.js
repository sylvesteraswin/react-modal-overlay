/* global VERSION */
import '../components/commons.scss';
import React from 'react';
import style from './style';

import FontIcon from './components/font_icon';
import Button from './components/button';

const Root = () => (
  <div className={style.app}>
    <Button />
    <FontIcon />
  </div>
);

export default Root;
