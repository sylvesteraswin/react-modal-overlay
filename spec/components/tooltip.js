import React from 'react';
import Button from '../../components/button';
import Link from '../../components/link';
import Tooltip from '../../components/tooltip';

const TooltipButton = Tooltip(Button);
const TooltipLink = Tooltip(Link);

const TooltipTest = () => (
  <section
    className="pa3 pa5-ns">
    <h5>Tooltip</h5>

    <div
      className="mv2">
      <TooltipButton
        label='Bookmark'
        icon='bookmark'
        primary
        tooltip='Bookmark Tooltip'
        />
    </div>

    <div
      className="mv2 tc">
      <TooltipLink
        icon="weekend"
        label="Netflix"
        tooltip='And Chill'
        />
    </div>
  </section>
);

export default TooltipTest;
