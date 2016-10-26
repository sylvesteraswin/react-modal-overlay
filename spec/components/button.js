import React from 'react';
import {
  Button,
  IconButton,
} from '../../components/button';

const ButtonTest = () => (
  <section
    className="pa3 pa5-ns">
    <h5>Buttons</h5>

    <h6>Link & Buttons</h6>
    <p
      className="mv2">
      <Button
          primary
          href="http://www.google.com"
          label="Primary Link" />
    </p>

    <p
      className="mv2">
      <Button
          primary
          icon="favorite_border"
          label="Primary Button" />
    </p>

    <p
      className="mv2">
      <Button
          secondary
          href="http://www.google.com"
          label="Secondary Link" />
    </p>

    <p
      className="mv2">
      <Button
          secondary
          icon="create"
          label="Secondary Button" />
    </p>

    <p
      className="mv2">
      <Button
          href="http://www.google.com"
          label="Tertiary Link" />
    </p>

    <p
      className="mv2">
      <Button
          icon="add_shopping_cart"
          label="Tertiary Button" />
    </p>

    <p
      className="mv2">
      <Button
          inverse
          href="http://www.google.com"
          label="Inverse Link" />
    </p>

    <p
      className="mv2">
      <Button
          inverse
          icon="bookmark"
          label="Inverse Button" />
    </p>

    <h6>Icon Buttons</h6>
    <p
      className="mv3 tc">
      <IconButton className="mr2" icon='favorite' primary />
      <IconButton className="mr2" icon='favorite' secondary />
      <IconButton className="mr2" icon='favorite' />
      <IconButton className="mr2" icon='favorite' inverse />
      <IconButton className="mr2" icon='favorite' disabled />
    </p>

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
