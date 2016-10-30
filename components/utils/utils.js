export default {
  getViewport: () => {
    return {
      height: window.innerHeight || document.documentElement.offsetHeight,
      width: window.innerWidth || document.documentElement.offsetWidth,
    };
  },
};
