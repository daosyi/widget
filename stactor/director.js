(function(){
  if(!this._CX){
    this._CX={};
  }
  var _global=this;
  var _dom=this._CX.dom;
  //记录下当前正在切换动画的舞台，如果正在进行，则不允许其他舞台同时切入
  function _remenberAnimationingStage(compileObj){
    _global._CX._animationingStage=compileObj.target;
    window.setTimeout(function(){
        _global._CX._animationingStage=null;
    },compileObj.time*1000);
  }

  function _Director(rootEL,stages){
    if(!rootEL){
      console.warn("Director实例必须有rootEL");
      return;
    }
    this.rootEL=rootEL;
    this.crtStageIndex=0;
    if(stages){
      this.stages=stages;
      this.stages[0].el.style.top="0px";
    }
    this.viewHeight=window.document.body.offsetHeight;
    this.viewWidth=window.document.body.offsetWidth;
  }

  _Director.prototype={

    createActor:function(name,_aoptions,stage){
      if(stage&&stage.actors[name]){
        console.warn("已存在的actor");
        return null;
      }
      return new _global._CX.Actor(name,_aoptions,stage);
    },
    createFrameLine:function(points){
      return new _global._CX.FrameLine(points);
    },
    animation:function(target,fline,endfn){
      var compileObj=null,removeEvent=null;
      var el=target.el;
      compileObj=fline.compile();//cx-frameline
      compileObj.target=target;
      compileObj._aclassNameIndex=0;
      
      el.className=compileObj.classNames[compileObj._aclassNameIndex];
      removeEvent=_dom.addEvent(el,"animationend",function(){
          compileObj._aclassNameIndex++;
          var nextClsName=compileObj.classNames[compileObj._aclassNameIndex];
          if(nextClsName){
            el.className=nextClsName;
          }else {
            if(endfn){
            endfn();
            }
            removeEvent();
          }
          return;
      }.bind(this));

      if(!_global._CX.frameLineKeys[fline.key]){
        _global._CX.frameLineKeys[fline.key]=fline.key;
        var _txtNode=document.createTextNode(compileObj.cssText);
        _global._CX.styleEL.appendChild(_txtNode);
      }
      return compileObj;
      
    },
    act:function(stage,actorname,fline,fn){
       var actor=stage.actors[actorname];
       this.animation(actor,fline,fn);
    },
    stageHide:function(stageIndex,dir){
      var _index=stageIndex==undefined?this.crtStageIndex:stageIndex;
      var _stage=this.stages[_index];
      if(_stage){
        var line1=_global._CX.defaultLines.hideTop;
        if(dir=="bottom"){
          line1=line1=_global._CX.defaultLines.hideBottom;
        }
        var compiledObj=this.animation(_stage,line1);
        _remenberAnimationingStage(compiledObj);
      }
    },
    stageShow:function(stageIndex,dir){
      var _index=stageIndex==undefined?(this.crtStageIndex+1):stageIndex;
      var _stage=this.stages[_index];
      if(_stage){
        var line1=_global._CX.defaultLines.showTop;
        if(dir=="bottom"){
          line1=_global._CX.defaultLines.showBottom;
        }
        this._actStage(_stage);
        var compiledObj=this.animation(_stage,line1);
        _remenberAnimationingStage(compiledObj);
      }
    },
    //开始某一幕的表演
    _actStage:function(stage){
      var _actors=stage.actors;
      if(_actors){
        for(var a=0;a<_actors.length;a++){
          this.animation(_actors[a],_actors[a].frameLine);
        }
      }
    },
    _initNavBtn:function(){
      var navELS=this.rootEL.getElementsByClassName("CX-nav-icon");
      if(navELS){
        for(var a=0;a<navELS.length;a++){
          if(navELS[a]){
            _dom.addEvent(navELS[a],"click",function(target,e){
              if(_global._CX._animationingStage){
                return;
              }
              if(target.className.indexOf("CX-nav-icon-up")>-1){
                if(this.crtStageIndex>0){
                  this.stageHide(this.crtStageIndex);
                  this.stageShow(this.crtStageIndex-1);
                  this.crtStageIndex--;
                }
              }else{
                if(this.crtStageIndex<this.stages.length-1){
                  this.stageHide(this.crtStageIndex,"bottom");
                  this.stageShow(this.crtStageIndex+1,"bottom");
                  this.crtStageIndex++;
                }
              }
              this.uiRefresh({
                crtStageIndex:this.crtStageIndex
              });
            }.bind(this,navELS[a]));
          }
          
        }
        
      }
    },
    start:function(){
      this._initNavBtn();
      this._actStage(this.stages[this.crtStageIndex]);
      this.uiRefresh({
        crtStageIndex:this.crtStageIndex
      });
    },
    bootstrap:function(){
      var els=this.rootEL.getElementsByClassName("CX-Stage");
      var _stages=[],_stage=null;
      if(els){
        for(var a=0;a<els.length;a++){
          _stage=new _global._CX.Stage(els[a]);
          _stage.initActors();
          _stages.push(_stage);
        }
      }
      this.stages=_stages;
      this.stages[0].el.style.top="0px";
      this.start();
    },
    uiRefresh:function(){
      var navELS=this.rootEL.getElementsByClassName("CX-nav-icon");
      if(this.crtStageIndex==0){
        navELS[0].style.display="none";
      }else{
        navELS[0].style.display="block";
      }
      if(this.crtStageIndex==this.stages.length-1){
        navELS[1].style.display="none";
      }else{
        navELS[1].style.display="block";
      }
    }

  };


  _global._CX.Director=_Director;

  var _style=document.createElement("style");
  document.head.appendChild(_style);
  _global._CX.styleEL=_style;
  var _initPS={
    width:"100%",
    height:"100%",
    position:"relative",
    overflow:"hidden",
    padding:0,
    margin:0
  };
  _dom.setStyle(document.documentElement,_initPS);
  _dom.setStyle(document.body,_initPS);
  _global._CX.viewHeight=window.document.body.offsetHeight;
  _global._CX.viewWidth=window.document.body.offsetWidth;

  _global._CX.defaultLines={
    toFullscreen:new _global._CX.FrameLine([
      {left:0,top:0,width:0,height:0},
      {left:0,top:0,width:"100%",height:"100%"},
      {left:0,top:0,width:0,height:0}
    ]),
    hideTop:new _global._CX.FrameLine([{left:0,top:0},{left:0,top:-_global._CX.viewHeight}]),
    hideBottom:new _global._CX.FrameLine([{left:0,top:"auto",bottom:0},{left:0,top:"auto",bottom:-_global._CX.viewHeight}]),
    showTop:new _global._CX.FrameLine([{left:0,top:_global._CX.viewHeight},{left:0,top:0}]),
    showBottom:new _global._CX.FrameLine([{left:0,top:"auto",bottom:_global._CX.viewHeight},{left:0,top:"auto",bottom:0}])

  };

  return;
})();