import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { IMAGE } from '../identifiers.js';
import ActivableRenderer from '../hoc/ActivableRenderer.js';

import addEvent from '../utils/add-event-listener.js';
import removeEvent from '../utils/remove-event-listener.js';

const DEBOUNCE_TIME = 300;

const factory = () => {
  class Image extends Component {
    static propTypes = {
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.string,
      className: PropTypes.string,
      sizes: PropTypes.string,
      alt: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      fade: PropTypes.bool,
      lazy: PropTypes.bool,
      placeholderSrc: PropTypes.string,
      lazyOffset: PropTypes.number,
      aspectRatio: PropTypes.oneOf([
        'square',
        '4x3',
        '16x9',
        '19x10',
      ]),
      crossorigin: PropTypes.oneOf([
        'anonymous',
        'use-credentials',
      ]),
      onLoad: PropTypes.func,
      onError: PropTypes.func,
      theme: PropTypes.shape({
        image: PropTypes.string,
        loading: PropTypes.string,
        visible: PropTypes.string,
        wrapper: PropTypes.string,
        aspectRatio: PropTypes.string,
        'aspectRatio--square': PropTypes.string,
        'aspectRatio--4x3': PropTypes.string,
        'aspectRatio-16x9': PropTypes.string,
        'aspectRatio-19x10': PropTypes.string,
      }),
    };

    static defaultProps = {
      onLoad: () => {},
      onError: () => {},
      srcSet: '',
      lazy: true,
      lazyOffset: 0,
      width: 100,
      height: 100,
      aspectRatio: 'square',
      placeholderSrc: 'data:image/gif;base64,R0lGODlhEAAJAIAAAP///wAAACH5BAEAAAAALAAAAAAQAAkAAAIKhI+py+0Po5yUFQA7',
    };

    state = {
      width: 0,
      height: 0,
      pixelRatio: 0,
      events: {},
      viewLoaded: false,
    };

    componentWillMount = () => {
      const {
        srcSet,
      } = this.props;

      this.setState({
        width: this._getViewportWidth(),
        height: this._getViewportHeight(),
        pixelRatio: this._getDevicePixelRatio(),
        variations: this._generatePossibleVariations(srcSet),
        nativeSupport: this._checkForNativeSupport(),
      });
    };

    componentWillReceiveProps = (nextProps) => {
      const {
        srcSet,
      } = this.props;

      if (srcSet !== nextProps.srcSet) {
        this.setState({
          variations: this._generatePossibleVariations(nextProps.srcSet),
        });
      }
    };

    componentDidMount = () => {
      const {
        lazy,
      } = this.props;

      const {
        nativeSupport,
      } = this.state;

      if (typeof window !== 'undefined') {
        if (lazy) {
          this._handleViewportScroll();
          this.setState({
            events: Object.assign({}, this.state.events, {
              scroll: addEvent(window, 'scroll', this._handleViewportScroll, this),
            }),
          });
        }

        setTimeout(() => {
          if (nativeSupport) {
            this.setState({
              events: Object.assign({}, this.state.events, {
                resize: addEvent(window, 'resize', this._handleViewportResize, this),
              }),
            });
          }
        }, 0);
      }
    };

    componentWillUnmount = () => {
      const {
        scroll,
        resize,
      } = this.state.events;

      if (scroll) {
        removeEvent(scroll);
      }

      if (resize) {
        removeEvent(resize);
      }
    };

    _checkForNativeSupport = () => {
      if (typeof document !== 'undefined') {
          var img = document.createElement('img');
          return ('sizes' in img) && ('srcset' in img);
      }
      return false;
    };

    _getViewportWidth = () => {
      if (typeof window !== 'undefined') {
          return window.innerWidth || document.documentElement.clientWidth;
      } else {
          return 0;
      }
    };

    _getViewportHeight = () => {
      if (typeof window !== 'undefined') {
          return window.innerHeight || document.documentElement.clientHeight;
      } else {
          return 0;
      }
    };

    _getDevicePixelRatio = () => {
      if (typeof window !== 'undefined') {
          return window.devicePixelRatio;
      } else {
          return 1;
      }
    };

    _handleViewportScroll = () => {
      clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(()=> {
        const {
          lazyOffset,
        } = this.props;

        // const placeholder = this.placeHolder;
        // if (placeholder && this._checkElementInViewport(placeholder, this._getViewportHeight(), lazyOffset)) {
        //   this.setState({
        //     viewLoaded: true,
        //   });
        // }
      }, DEBOUNCE_TIME);
    };

    _handleViewportResize = () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(()=> {
        this.setState({
          width: this._getViewportWidth(),
          height: this._getViewportHeight(),
        });
      }, DEBOUNCE_TIME);
    };

    _matchImage = () => {
      const {
        variations,
        width,
        height,
        pixelRatio,
      } = this.state;

      const {
        src,
      } = this.props;

      if (!variations.length) {
        return src;
      }

      return variations.reduce((prev, current) => {
        if (current.pixelRatio === prev.pixelRatio) {
          // Both have the same density so attempt to find a better one using width
          if (prev.width === current.width) {
            // Both have the same width so attempt to use height
            if (prev.height === current.height) {
              return prev;
            } else {
              return this._compareImages(prev, current, height, (img) => img.height);
            }
          } else {
            return this._compareImages(prev, current, width, (img) => img.width);
          }
        } else {
          return this._compareImages(prev, current, pixelRatio, (img) => img.pixelRatio);
        }
      }).url;
    };

    _compareImages = (prev, current, state, fn) => {
      const prevDelta = fn(prev) - state;
      const currentDelta = fn(current) - state;

      // prev perfectly matches target but current does not or
      // current is less than target but prev is the same or better
      if ((prevDelta === 0 && currentDelta !== 0) || (currentDelta < 0 && prevDelta >= 0)) {
        return prev;
      }

      // current perfectly matches target but prev does not or
      // prev is less than target but current is the same or better
      if ((currentDelta === 0 && prevDelta !== 0) || (prevDelta < 0 && currentColor >= 0)) {
        return current;
      }

      if (Math.abs(currentDelta) < Math.abs(prevDelta)) {
        return current;
      }

      if (Math.abs(prevDelta) < Math.abs(currentDelta)) {
        return prev;
      }

      return prev;

    }


    // document.body.scrollTop was working in Chrome but didn't work on Firefox,
    // so had to resort to window.pageYOffset
    // but can't fallback to document.body.scrollTop as that doesn't work in IE
    // with a doctype (?) so have to use document.documentElement.scrollTop
    _getPageOffset = () => {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    _checkElementInViewport = (el, viewportHeight, lazyOffset) => {
      let elOffsetTop = 0;
      const offset = this._getPageOffset() + lazyOffset;

      if (el.offsetParent) {
        do {
          elOffsetTop += el.offsetTop;
        } while (el = el.offsetParent)
      }

      return elOffsetTop < (viewportHeight + offset);
    };

    /**
     * Takes a srcSet in the form of url/
     * ex. "images/pic-medium.png 1x, images/pic-medium-2x.png 2x" or
     *     "images/pic-medium.png 400w, images/pic-medium-2x.png 800w" or
     *     "images/pic-small.png"
     * Get an array of image candidates in the form of
     *      {url: "/foo/bar.png", x: 1, w:0, h: 0}
     * where resolution is http://dev.w3.org/csswg/css-values-3/#resolution-value
     * If sizes is specified, resolution is calculated
     */
     _generatePossibleVariations = (srcSet) => {
       if (!srcSet || !srcSet.length) {
         return [];
       }

       return srcSet.split(',').map((srcImg) => {
          var stringComponents = srcImg.trim().split(' ');
          var candidate = {
              url: stringComponents[0].trim(),
              width: 0,
              height: 0,
              pixelRatio: 1.0
          };

          for (var i = 1; i < stringComponents.length; i++) {
              var str = stringComponents[i].trim();
              if (str.indexOf('w', str.length - 1) !== -1) {
                  candidate.width = parseInt(str.substring(0,str.length-1));
              } else if (str.indexOf('h', str.length-1) !== -1) {
                  candidate.height = parseInt(str.substring(0,str.length-1));
              } else if (str.indexOf('x', str.length-1) !== -1) {
                  candidate.pixelRatio = parseFloat(str.substring(0,str.length-1));
              } else {
                  console.warn('Invalid parameter passed to Image srcSet: [' + str + '] in ' + srcImg);
              }
          }

          return candidate;
      });
     };

     commonLayoutPattern = (image) => {
       const {
         theme,
         aspectRatio,
       } = this.props;

       if (!image) {
         return null;
       }

       const ActiveRender = ActivableRenderer()(image);

       return (
         <figure
           className={theme.wrapper}>
           <div
             className={theme.aspectRatio}>
             <div
               className={classnames(theme[`aspectRatio--${aspectRatio}`])}></div>
             <div className={theme.image}>
               {image}
             </div>
           </div>
         </figure>
       );
     };

     renderPlaceholder = () => {
       const {
         width,
         height,
         placeholderSrc,
         theme,
         className,
         lazy,
         aspectRatio,
         ...others,
       } = this.props;

       const {
         viewLoaded,
       } = this.state;

       const classes = classnames({
         [theme.loading]: (lazy && !viewLoaded),
       });

       const imageProps = {
         width,
         height,
         ref: i => this.placeHolder = i,
         'data-react-zvui-framework': 'image',
         className: classes,
         src: placeholderSrc,
         active: !this.state.visible
       };

       const image = React.createElement(
         'img',
         imageProps,
       );

       return this.commonLayoutPattern(image);
     };

     renderNative = () => {
        const {
          onLoad,
          onError,
          theme,
          className,
          lazy,
          srcSet,
          aspectRatio,
          src: fallbackSrc,
          ...others,
        } = this.props;

        const {
          viewLoaded,
          variations,
        } = this.state;

        const {
          url: src = fallbackSrc,
        } = variations[0] || {};

        const classes = classnames({
          [theme.visible]: viewLoaded,
        });

        const props = {
          'data-react-zvui-framework': 'image',
          className: classes,
          onLoad,
          onError,
          srcSet,
          src,
        };

        const image = React.createElement(
          'img',
          props,
        );

        return this.commonLayoutPattern(image);
     };

     render = () => {
       const {
         lazy,
         onLoad,
         onError,
         theme,
         aspectRatio,
         ...others,
       } = this.props;

       const {
         viewLoaded,
         nativeSupport,
       } = this.state;

       if (lazy && !viewLoaded) {
         return this.renderPlaceholder();
       }

       if (nativeSupport) {
         return this.renderNative();
       }

       const classes = classnames(theme.image, {
         [theme.visible]: viewLoaded,
       });

       const props = {
         ...others,
         onLoad,
         onError,
         src: this._matchImage(),
         className: classes,
       };

       const image = React.createElement(
         'img',
         this.props,
       );

       return this.commonLayoutPattern(image);
     };
  }

  return Image;
};

const Image = factory();
export default themr(IMAGE)(Image);
export { factory as imageFactory };
export { Image };
