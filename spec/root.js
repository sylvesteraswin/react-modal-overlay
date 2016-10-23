/* global VERSION */
import '../components/commons.scss';
import React from 'react';

import FontIcon from './components/font_icon';
import Button from './components/button';
import Link from './components/link';
import Dialog from './components/dialog';

import style from './style';

const Root = () => (
  <div className={style.app}>
    <Button />
    <Link />
    <FontIcon />
    <Dialog />
  </div>
);

export default Root;
