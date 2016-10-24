import React from 'react';
import AppBar from '../../components/app_bar';

const AppBarTest = () => (
  <section
    className="pa3 pa5-ns">
    <h1>AppBar</h1>

    <div
      className="mv3">
      <AppBar title='Title' />
    </div>

    <div
      className="mv3">
      <AppBar leftIcon='menu' title='Title' />
    </div>

    <div
      className="mv3">
      <AppBar leftIcon='arrow_back' title='Title' rightIcon='close' />
    </div>
  </section>
);

export default AppBarTest;
