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
      fade: PropTypes.bool,
      lazy: PropTypes.bool,
      loadingAnimation: PropTypes.bool,
      placeholderSrc: PropTypes.string,
      lazyOffset: PropTypes.number,
      aspectRatio: PropTypes.oneOf([
        'square',
        '3x4',
        '4x6',
        '5x7',
        '8x10',
        '4x3',
        '6x4',
        '7x5',
        '10x8',
    ]),
      crossorigin: PropTypes.oneOf([
        'anonymous',
        'use-credentials',
      ]),
      onLoad: PropTypes.func,
      onError: PropTypes.func,
      theme: PropTypes.shape({
        image: PropTypes.string,
        media: PropTypes.string,
        loaded: PropTypes.string,
        loading: PropTypes.string,
        blur: PropTypes.sting,
        visible: PropTypes.string,
        wrapper: PropTypes.string,
        aspectRatio: PropTypes.string,
        'aspectRatio--square': PropTypes.string,
        'aspectRatio--3x4': PropTypes.string,
        'aspectRatio-4x6': PropTypes.string,
        'aspectRatio-5x7': PropTypes.string,
      }),
    };

    static defaultProps = {
      onLoad: () => {},
      onError: () => {},
      srcSet: '',
      lazy: true,
      lazyOffset: 0,
      loadingAnimation: true,
      aspectRatio: 'square',
      placeholderSrc: 'data:image/gif;base64,R0lGODlhEAAJAIAAAP///wAAACH5BAEAAAAALAAAAAAQAAkAAAIKhI+py+0Po5yUFQA7',
    };

    state = {
      width: 0,
      height: 0,
      pixelRatio: 0,
      events: {},
      viewLoaded: false,
      imageLoaded: false,
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

        const placeholder = this.placeHolder;
        if (placeholder && this._checkElementInViewport(placeholder, this._getViewportHeight(), lazyOffset)) {
          this.setState({
            viewLoaded: true,
          });
        }
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
      if ((currentDelta === 0 && prevDelta !== 0) || (prevDelta < 0 && currentDelta >= 0)) {
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

     _onMainImageLoad = (e) => {
       const {
         onLoad,
       } = this.props;

       const {
         imageLoaded
       } = this.state;

       if (imageLoaded) {
         return false;
       }

       this.setState({
         imageLoaded: true,
       }, () => {
         onLoad.call(this, e);
       });
     };

     commonLayoutPattern = (loading, loaded) => {
       const {
         theme,
         aspectRatio,
       } = this.props;

       if (!loading) {
         return null;
       }

       ActivableRenderer()(loading);
       ActivableRenderer()(loaded);

       return (
         <figure
           className={theme.wrapper}>
           <div
             className={theme.aspectRatio}>
             <div
               className={classnames(theme[`aspectRatio--${aspectRatio}`])}></div>
             <div className={theme.image}>
               {loading}
               {loaded}
             </div>
           </div>
         </figure>
       );
     };

     renderPlaceholder = () => {
       const {
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

       const loadingImageProps = {
         ref: i => this.placeHolder = i,
         'data-react-zvui-framework': 'image',
         className: classes,
         src: placeholderSrc,
       };

       const loadingImage = React.createElement(
         'img',
         loadingImageProps,
       );

       return this.commonLayoutPattern(loadingImage);
     };

     renderNative = () => {
        const {
          onLoad,
          onError,
          theme,
          className,
          lazy,
          loadingAnimation,
          aspectRatio,
          src,
          ...others,
        } = this.props;

        const {
          viewLoaded,
          variations,
          imageLoaded,
        } = this.state;

        const largeImg = this._matchImage();

        //////////////////////////////////////////////////

        const classes_loading = classnames(theme.image, {
          [theme.blur]: viewLoaded && loadingAnimation,
        });


        const loadingImageProps = {
          'data-react-zvui-framework': 'image',
          className: classes_loading,
          src,
        };

        const loadingImage = React.createElement(
          'img',
          loadingImageProps,
        );

        //////////////////////////////////////////////////

        const classes_loaded = classnames(theme.image, theme.media, {
          [theme.loaded]: imageLoaded,
        });

        const loadedImageProps = {
          className: classes_loaded,
          'data-react-zvui-framework': 'image',
          onLoad: this._onMainImageLoad,
          src: largeImg,
          onError,
        }

        const loadedImage = React.createElement(
          'img',
          loadedImageProps,
        );

        //////////////////////////////////////////////////

        return this.commonLayoutPattern(loadingImage, loadedImage);
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

       return this.renderNative();
     };
  }

  return Image;
};

const Image = factory();
export default themr(IMAGE)(Image);
export { factory as imageFactory };
export { Image };
