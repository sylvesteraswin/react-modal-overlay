import React from 'react';
import Button from '../../components/button';
import Drawer from '../../components/drawer';

class DrawerTest extends React.Component {
  state = {
    leftActive: false,
    rightActive: false,
    topActive: false,
    bottomActive: false,
  };

  handleToggleLeft = () => {
    this.setState({leftActive: !this.state.leftActive});
  };

  handleToggleRight = () => {
    this.setState({rightActive: !this.state.rightActive});
  };

  handleToggleTop = () => {
    this.setState({topActive: !this.state.topActive});
  };

  handleToggleBottom = () => {
    this.setState({bottomActive: !this.state.bottomActive});
  };

  render () {
    return (
      <section
        className="pa3 pa5-ns">
        <h5>Drawer</h5>

        <Drawer active={this.state.leftActive} onOverlayClick={this.handleToggleLeft}>
          <div
            className="pa3 pt5">
            <h5 className="mb4s">Officia deserunt mollit.</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </Drawer>

        <Drawer active={this.state.rightActive} type='right' onOverlayClick={this.handleToggleRight}>
          <Button inverse inline label='Close' onClick={this.handleToggleRight} />
        </Drawer>

        <Drawer active={this.state.topActive} type='top' onOverlayClick={this.handleToggleTop}>
          <Button inverse inline label='Top Close' onClick={this.handleToggleTop} />
        </Drawer>

        <Drawer active={this.state.bottomActive} type='bottom' onOverlayClick={this.handleToggleBottom}>
          <Button inverse inline label='Bottom Close' onClick={this.handleToggleBottom} />
        </Drawer>

        <div
          className="mv2">
          <div className="cf">
            <div className="fl w-100 w-20-l tc pa2">
              <Button
                  secondary
                  onClick={this.handleToggleLeft}
                  icon="favorite"
                  ellipsis={true}
                  length={16}
                  label="Left Drawer" />
            </div>
            <div className="fl w-100 w-20-l tc pa2">
              <Button
                  onClick={this.handleToggleRight}
                  icon="star"
                  ellipsis={true}
                  length={16}
                  label="Right Drawer" />
            </div>
            <div className="fl w-100 w-20-l tc pa2">
              <Button
                  primary
                  onClick={this.handleToggleTop}
                  icon="favorite"
                  ellipsis={true}
                  length={16}
                  label="Top Drawer" />
            </div>
            <div className="fl w-100 w-20-l tc pa2">
              <Button
                  inverse
                  onClick={this.handleToggleBottom}
                  icon="star"
                  ellipsis={true}
                  length={16}
                  label="Bottom Drawer" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default DrawerTest;
