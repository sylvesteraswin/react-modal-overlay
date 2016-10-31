import React from 'react';
import Image from '../../components/image';

const SRC_SET = [
  "https://c4.staticflickr.com/2/1625/26256221835_6a1963a741_h.jpg 800w",
  "https://c4.staticflickr.com/2/1625/26256221835_060c07acc5_n.jpg 500w"
]

const ImageTest = () => (
  <section
    className="pa3 pa5-ns">
    <h5>Responsive Image</h5>

    <div
      className="mv2 tc">
      <Image
        srcSet={SRC_SET.join(',')}
        aspectRatio="19x10"
        src="https://c4.staticflickr.com/2/1625/26256221835_060c07acc5_n.jpg" />
    </div>

  </section>
);

export default ImageTest;
