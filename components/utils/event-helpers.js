const TRANSITIONS = {
  'transition': 'transitionend',
  'OTransition': 'oTransitionEnd',
  'MozTransition': 'transitionend',
  'WebkitTransition': 'webkitTransitionEnd',
};

export default {
  transitionEventNamesFor: (element) => {
    return TRANSITIONS[
      Object.keys(TRANSITIONS).find((v, i) => {
        if (element && element.style[v] !== undefined) {
          return true;
        }
        return false;
      })
    ];
  },
};
