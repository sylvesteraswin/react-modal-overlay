import React, { PropTypes, Component } from 'react';
import Button from '../../components/button';
import Dialog from '../../components/dialog';

class DialogTest extends Component {
  state = {
    active: false,
    type: 'normal',
  };

  handleToggle = () => {
    console.log('CLICKED', new Date());
    this.setState({
      active: !this.state.active,
    });
  };

  actions = [
    { label: 'Close', inverse: true, inline: true, onClick: this.handleToggle }
  ];

  render = () => {
    return (
      <section
        className="pa3 pa5-ns">
        <h5>Dialog</h5>

        <div
          className="mv2">
          <Button
              primary
              onClick={this.handleToggle}
              icon="favorite_border"
              label="Primary Button" />
          <Dialog
            actions={this.actions}
            active={this.state.active}
            type={this.state.type}
            title="Hello World"
            onOverlayClick={this.handleToggle}
            onEscKeyDown={this.handleToggle}
            >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus autem, culpa cupiditate dolorem facilis harum iusto necessitatibus nemo non odit optio pariatur perspiciatis quae quaerat quisquam tempore ut velit voluptatum!
            </p>
          </Dialog>
        </div>
      </section>
    );
  };
}

export default DialogTest;
