import React from 'react';
import Ellipsis from '../../components/ellipsis';

const EllipsisTest = () => (
  <section
    className="pa3 pa5-ns">
    <h5>Ellipsis</h5>

      <p
        className="mv2">
        <Ellipsis
          showFullWord={true}
          length={10}>
          You can customize captions in many ways.
        </Ellipsis>
      </p>

    <p
      className="mv2">
      <Ellipsis
        length={9}>
        You can customize captions in many ways.
      </Ellipsis>
    </p>

    <p
      className="mv2">
      <Ellipsis
        length={15}>
        You can customize captions in many ways.
      </Ellipsis>
    </p>

    <p
      className="mv2">
      <Ellipsis
        length={50}
        tail={'~~~'}>
        You can customize captions in many ways.
      </Ellipsis>
    </p>

  </section>
);

export default EllipsisTest;
