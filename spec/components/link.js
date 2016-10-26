import React from 'react';
import Link from '../../components/link';

const LinkTest = () => (
  <section
    className="pa3 pa5-ns">
    <h5>Links</h5>

    <p
      className="mv2">
      <Link
        label="Add Review" />
    </p>

    <p
      className="mv2">
      <Link
        active
        icon="arrow_back"
        label="Back" />
    </p>
  </section>
);

export default LinkTest;
