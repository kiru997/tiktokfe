export const getPercentScrollOfElement = event => {
  const {
    scrollTop
  } = event.target;
  const {
    scrollHeight
  } = event.target;
  const {
    clientHeight
  } = event.target;
  const pos = ((scrollTop + clientHeight) / scrollHeight) * 100;
  return Math.round(pos);
};
export const formatHeartCount = number => {
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`;
  }
  return number;
};
export const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};