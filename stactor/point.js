(function(){
  if(!this._CX){
    this._CX={};
  }
  var _global=this;
  var _dom=this._CX.dom;
  
  /**
   * frame:{
   * name:
   * duration:
   * function:
        linear： 线性过渡。等同于贝塞尔曲线(0.0, 0.0, 1.0, 1.0) 
        ease： 平滑过渡。等同于贝塞尔曲线(0.25, 0.1, 0.25, 1.0) 
        ease-in： 由慢到快。等同于贝塞尔曲线(0.42, 0, 1.0, 1.0) 
        ease-out： 由快到慢。等同于贝塞尔曲线(0, 0, 0.58, 1.0) 
        ease-in-out： 由慢到快再到慢。等同于贝塞尔曲线(0.42, 0, 0.58, 1.0) 
        cubic-bezier(<number>, <number>, <number>, <number>)： 特定的贝塞尔曲线类型，4个数值需在[0, 1]区
   * delay:
   * count:infinite||number
   * direction:normal： 正常方向 alternate： 正常与反向交替 
   * fill-mode：none | forwards | backwards | both [ , none | forwards | backwards | both ]*
   * 以上属性决定当前帧到下一帧的动画效果
   * 
   * style:当前帧的样式
   * }
   */
  function _Point(frame){
    if(!frame){
      console.warn("_Point实例必须有frame");
      return;
    }
    Object.assign(this,frame);
  }

  _Point.prototype={
     toStyleString:function(){
       return _dom.getStyleString(this.style);
     }
  };
   _global._CX.Point=_Point;

  return;
})();