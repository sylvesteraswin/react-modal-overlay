/* global VERSION */
import '../components/commons.scss';
import React from 'react';

import AppBarTest from './components/app_bar';
import FontIcon from './components/font_icon';
import Button from './components/button';
import Link from './components/link';
import Dialog from './components/dialog';
import Drawer from './components/drawer';

import style from './style';

const Root = () => (
  <div className={style.app}>
    <AppBarTest />
    <Button />
    <Link />
    <FontIcon />
    <Dialog />
    <Drawer />
  </div>
);

export default Root;
