import React from 'react';
import FontIcon from '../../components/font_icon';

const FontIconTest = () => (
  <section
    className="pa3 pa5-ns">
    <h1>Font Icons</h1>

    <FontIcon value="done"/>
    <FontIcon value="error"/>
    <FontIcon value="play_arrow"/>
    <FontIcon value="zoom_in"/>
    <FontIcon>send</FontIcon>
  </section>
);

export default FontIconTest;
