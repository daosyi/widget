(function(){
  var _global=this;
  var _unitStyles={
    position:"",
    overflow:""
  };
  if(!this._CX){
    this._CX={
      frameLineKeys:{}//记录下全局frameLine，如果已经渲染过，则不用重新添加CSS。
    };
  }
  var _dom={
    setStyle:function(el,styleObj){
      for(var sk in styleObj){
        if(sk=="background"){
          if(styleObj[sk].indexOf("https://")>-1||styleObj[sk].indexOf("http://")>-1){
            el.style[sk]="url("+styleObj[sk]+")";
          }else{
            el.style[sk]=styleObj[sk];
          }
        }else if(_unitStyles[sk]!==undefined){
          el.style[sk]=styleObj[sk];
        }else{
          el.style[sk]=this.getUnitByVal(styleObj[sk]);
        }
      }
    },
    getStyleString:function(styleObj){
      var arr=[];
      for(var sk in styleObj){
        if(sk=="background"){
          if(styleObj[sk].indexOf("https://")>-1||styleObj[sk].indexOf("http://")>-1){
            arr.push(sk+":url("+styleObj[sk]+")");
          }else{
            arr.push(sk+":"+styleObj[sk]);
          }
        }else if(_unitStyles[sk]!==undefined){
          arr.push(sk+":"+styleObj[sk]);
        }else{
          arr.push(sk+":"+this.getUnitByVal(styleObj[sk]));
        }
      }
      return arr.join(";");
    },
    getUnitByVal:function(val){
      val+="";
      if(/^-?\d+$/.test(val)){
        return val+"px";
      }else{
        return val;
      }
    },
    addEvent:function(el,event,fn){
      el.addEventListener(event,fn);
      return function(){
        el.removeEventListener(event,fn);
      };
    },

  };
  this._CX.dom=_dom;
  this._CX.bootstrap=function(rootEl){
    var els=rootEl.getElementsByClassName("CX-Stage");
    var _stages=[],_stage=null;
    if(els){
      for(var a=0;a<els.length;a++){
        _stage=new _global._CX.Stage(els[a]);
        _stage.initActors();
        _stages.push(_stage);
      }
    }
    var _director=new _global._CX.Director(rootEl,_stages);
    _director.start(rootEl);
    return _director;
  };

  return;
})();