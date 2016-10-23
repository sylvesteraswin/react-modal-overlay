import React from 'react';
import Link from '../../components/link';

const LinkTest = () => (
  <section
    className="pa3 pa5-ns">
    <h1>Links</h1>

    <p
      className="mv2">
      <Link
        active
        icon="thumb_up"
        href="http://www.google.com"
        label="Primary Link" />
    </p>
  </section>
);

export default LinkTest;
