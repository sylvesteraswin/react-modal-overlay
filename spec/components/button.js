import React from 'react';
import {
  Button
} from '../../components/button';

const ButtonTest = () => (
  <section
    className="pa3 pa5-ns">
    <h1>Buttons</h1>

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
  </section>
);

export default ButtonTest;
