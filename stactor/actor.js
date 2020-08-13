(function(){
  if(!this._CX){
    this._CX={};
  }
  var _global=this;
  var _dom=this._CX.dom;
  function _Actor(name,el,stage,options){//name,stage,options
    // if(!stage){
    //   console.warn("Actor实例必须有stage");
    //   return;
    // }
    this.name=name;
    if(el.nodeType){
      this.el=el;
      this.stage=stage;
      this.options=options;
    }else{
      this.stage=el;
      this.options=stage;
      this.el=document.createElement("div");
      this.stage.el.appendChild(this.el);
      this.stage.actors[name]=this;
    }
    var fIndex=1;
    var frame=this.el.getAttribute("data-frame-"+fIndex);
    var _framePoints=[];
    while(frame){
      _framePoints.push(JSON.parse(frame));
      fIndex++;
      frame=this.el.getAttribute("data-frame-"+fIndex);
    }
    this.frameLine=new _global._CX.FrameLine(_framePoints);
    this.ps={
      //background:"#009",
      //width:60,
      //height:60,
      position:"absolute",
      top:-1100,
      left:-1100
    };
    Object.assign(this.ps,this.options);
    _dom.setStyle(this.el,this.ps);
    
  }
  _Actor.prototype={
    type:"Actor"
  };
  _global._CX.Actor=_Actor;
  return;
})();