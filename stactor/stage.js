(function(){
  if(!this._CX){
    this._CX={};
  }
  var _global=this;
  var _dom=this._CX.dom;
  function _Stage(viewDiv,options){
    if(!viewDiv){
      viewDiv=window.document.body;
    }
    this.actors=[];
    this.actorsMap={};
    this.el=viewDiv;
    this.viewHeight=window.document.body.offsetHeight;
    this.viewWidth=window.document.body.offsetWidth;
    this.ps={
      //background:"#ddf",
      width:"100%",
      height:"100%",
      position:"absolute",
      top:(-this.viewHeight)+"px",
      overflow:"hidden"
    };
    Object.assign(this.ps,options||{});
    _dom.setStyle(viewDiv,this.ps);
    
  }
  _Stage.prototype={
    type:"Stage",
    switchBackground:function(colorOrUrl){
      this.ps.background=colorOrUrl;
      _dom.setStyle(viewDiv,{background:background});
    },
    addActor:function(actor){
      if(!actor){
        console.warn("actor不存在");
        return;
      }
      if(this.actors[actor.name]){
        console.warn("已存在的actor");
        return;
      }
      if(!actor.stage){
        actor.stage=this;
        this.el.appendChild(actor.el);
      }
      this.actorsMap[actor.name]=actor;
      this.actors.push(actor);
      return actor;
    },
    initActors:function(){
      var els=this.el.getElementsByClassName("CX-Actor");
      var _actor=null,_name="";
      if(els){
        for(var a=0;a<els.length;a++){
          _name="actor_"+a;
          _actor=new _global._CX.Actor(_name,els[a],this,{});
          this.actorsMap[_name]=_actor;
          this.actors.push(_actor);
        }
      }
    },
    topHide:function(){
      
    }
  };

  _global._CX.Stage=_Stage;


  return;
})();