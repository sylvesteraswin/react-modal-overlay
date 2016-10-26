/* global VERSION */
import '../components/commons.scss';
import React from 'react';

import AppBar from '../components/app_bar';
import Logo from '../components/logo';

import AppBarTest from './components/app_bar';
import TypographyTest from './components/typography';
import FontIconTest from './components/font_icon';
import ButtonTest from './components/button';
import ImageTest from './components/image';
import LogoTest from './components/logo';
import LinkTest from './components/link';
import DialogTest from './components/dialog';
import DrawerTest from './components/drawer';

import style from './style';

const RootAppBar = () => (
  <AppBar
    className={style.appbar}
    fixed
    leftIcon='view_headline'
    title={"Framework"}>
    <Logo
      className={style.header_logo}
      src="https://dl.dropboxusercontent.com/u/8725581/zvui-framework-logo.png"
      alt="Add Review" />
  </AppBar>
);

const Root = () => (
  <div className={style.app}>
    <RootAppBar />
    <TypographyTest />
    <AppBarTest />
    <ButtonTest />
    <ImageTest />
    <LogoTest />
    <LinkTest />
    <FontIconTest />
    <DialogTest />
    <DrawerTest />
  </div>
);

export default Root;
