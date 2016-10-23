import React, { Component, PropTypes } from 'react';

const ActivableRendererFactory = (options = {delay: 100}) => (ActivableComponent) => {
  return class ActivableRenderer extends Component {
    static propTypes = {
      active: PropTypes.bool.isRequired,
      children: PropTypes.any,
      delay: PropTypes.number,
    };

    static defaultProps = {
      delay: options.delay,
    }

    state = {
      active: this.props.active,
      rendered: this.props.active,
    };

    componentWillReceiveProps = (nextProps) => {
      const {
        active,
      } = this.props;

      if (nextProps.active && !active) {
        this.renderAndActivate()
      };
      if (!nextProps.active && active) {
        this.deactivateAndUnrender()
      };
    };

    renderAndActivate = () => {
      clearTimeout(this.unrenderTimeout)

      this.setState({
        rendered: true,
        active: false,
      }, () => {
        setTimeout(() => this.setState({
          active: true,
        }), 20);
      });
    };

    deactivateAndUnrender = () => {
      this.setState({
        rendered: true,
        active: false
      }, () => {
        this.unrenderTimeout = setTimeout(() => {
          this.setState({ rendered: false });
          this.unrenderTimeout = null;
        }, this.props.delay);
      });
    };

    render = () => {
      const { delay, ...others } = this.props; // eslint-disable-line no-unused-vars
      const {
        active,
        rendered
      } = this.state;
      // FIXEME
      // return rendered
      //   ? <ActivableComponent {...others} active={active} />
      //   : null;
      return <ActivableComponent {...others} active={active} />;
    }
  };
};

export default ActivableRendererFactory;
