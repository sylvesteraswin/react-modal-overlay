/* global VERSION */
import '../components/commons.scss';
import React from 'react';

import AppBar from '../components/app_bar';
import AppBarTest from './components/app_bar';
import TypographyTest from './components/typography';
import FontIcon from './components/font_icon';
import Button from './components/button';
import Image from './components/image';
import Link from './components/link';
import Dialog from './components/dialog';
import Drawer from './components/drawer';

import style from './style';

const RootAppBar = () => (
  <AppBar className={style.appbar}
    fixed
    leftIcon='view_headline'
    title={"React ZVUI Framework"} />
);

const Root = () => (
  <div className={style.app}>
    <RootAppBar />
    <TypographyTest />
    <AppBarTest />
    <Button />
    <Image />
    <Link />
    <FontIcon />
    <Dialog />
    <Drawer />
  </div>
);

export default Root;
