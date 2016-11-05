import React from 'react';
import {
  Button,
  IconButton,
} from '../../components/button';

import style from '../style';

const ButtonTest = () => (
  <section
    className="pa3 pa5-ns">
    <h5>Buttons</h5>

    <h6>Link & Buttons on White</h6>

      <div
        className="mv2 pa4">
        <div className="cf">
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                primary
                href="http://www.google.com"
                label="Primary Link" />
          </div>
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                secondary
                icon="favorite_border"
                label="Secondary Button" />
          </div>
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                href="http://www.google.com"
                label="Tertiary Link" />
          </div>
        </div>
      </div>

      <h6>Link & Buttons on Color</h6>

      <div
        className={`mv4 pa4 ${style.orangeBg}`}>
        <div className="cf">
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                inverse
                icon="bookmark"
                label="Primary Button" />
          </div>
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                white
                icon="bookmark"
                label="Secondary Button" />
          </div>
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                href="http://www.google.com"
                label="Tertiary Link" />
          </div>
        </div>
      </div>

      <h6>Link & Buttons on Black</h6>

      <div
        className={`mv4 pa4 ${style.blackBg}`}>
        <div className="cf">
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                primary
                href="http://www.google.com"
                label="Primary Link" />
          </div>
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                secondary
                icon="favorite_border"
                label="Secondary Button" />
          </div>
          <div className="fl w-100 w-20-l tc pa2">
            <Button
              white
                href="http://www.google.com"
                label="Tertiary Link" />
          </div>
        </div>
      </div>

      <h6>Link & Buttons on Blue</h6>

      <div
        className={`mv4 pa4 ${style.blueBg}`}>
        <div className="cf">
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                primary
                href="http://www.google.com"
                label="Primary Link" />
          </div>
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                white
                icon="favorite_border"
                label="Secondary Button" />
          </div>
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                href="http://www.google.com"
                label="Tertiary Link" />
          </div>
        </div>
      </div>


    <h6>Follow Compact</h6>
    <p
      className="mv3 tc">
      <IconButton className="mr2" icon='favorite' primary />
      <IconButton className="mr2" icon='favorite' secondary />
      <IconButton className="mr2" icon='favorite' />
      <IconButton className="mr2" icon='favorite' inverse />
      <IconButton className="mr2" icon='favorite' disabled />
    </p>

    <h6>Follow CTA</h6>
      <div
        className="mv4 pa4">
        <div className="cf">
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                rounded
                icon="add"
                label="Follow" />
          </div>
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                rounded
                secondary
                icon="check"
                label="Following" />
          </div>
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                rounded
                icon="add"
                label="Follow Brand" />
          </div>
          <div className="fl w-100 w-20-l tc pa2">
            <Button
                rounded
                secondary
                icon="check"
                label="Following" />
          </div>
        </div>
      </div>

    <h6>Floating Buttons</h6>
    <p
      className="mv3 tc">
      <Button className="mr3" icon='add' floating primary />
      <Button className="mr3" icon='view_headline' floating secondary />
      <Button className="mr3" icon='clear' floating />
      <Button className="mr3" icon='keyboard_arrow_left' floating inverse />
    </p>


  </section>
);

export default ButtonTest;
