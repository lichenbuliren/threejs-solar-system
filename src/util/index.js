//动画循环 
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame =
    (window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 17 /*~ 1000/60*/);
      });
}

//动画循环取消 
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame =
    (window.cancelRequestAnimationFrame ||
      window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
      window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
      window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
      window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
      window.clearTimeout);
}

export * from './detector';
export * from './helper';