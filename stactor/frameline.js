(function(){
  if(!this._CX){
    this._CX={};
  }
  var _dom=this._CX.dom;
  var _global=this;

  _global._CX._FrameLineCount=0;
  function _FrameLine(points){
    if(!points){
      console.warn("_FrameLine实例必须有points");
      return;
    }
    var _d={
      name:"",
      duration:1,
      function:"linear",
      delay:0,
      count:1,
      direction:"normal"
    };
    //_d["fill-mode"]="forwards";
    var _points=[],_p={};
    for(var a=0;a<points.length;a++){
      _p=points[a];
      if(!_p.style){
        _p={style:_p};
      }
      _points.push(new _global._CX.Point(Object.assign(_d,_p)));
    }
    this.points=_points;
    _global._CX._FrameLineCount++;
    this.key="cx-frameline-"+_global._CX._FrameLineCount+"-";
  }

  _FrameLine.prototype={
    addPoint:function(point){
      this.points.push(point);
    },
    compile:function(){
      var line=this;
      var aname=line.key;
      var cssText="",anames=[];
      var sumTime=0;
      for(var i=0;i<line.points.length;i++){
        if(line.points[i+1]){
          aname=line.key+(line.points[i].name||i);
          anames.push(aname);
          cssText+="\n@keyframes "+aname+"{";
          cssText+="0%{"+line.points[i].toStyleString()+"}";
          cssText+="100%{"+line.points[i+1].toStyleString()+"}";
          cssText+="}\n";
          cssText+="."+aname+"{";
          cssText+="animation:"+aname+" "+line.points[i].duration+"s "+line.points[i].function+" "+line.points[i].delay+"s "+line.points[i].count+" forwards;";
          cssText+="}";
          sumTime+=line.points[i].duration+line.points[i].delay;
        }
        
      }
      //cssText：动画的CSS，classNames：动画的对应类名列表，time：动画总时间
      return {cssText:cssText,classNames:anames,time:sumTime};
    }
  };

  _FrameLine.getCssTextByLine=function(line){
    var aname=line.key;
    var cssText="",anames=[];
    for(var i=0;i<line.points.length;i++){
      if(line.points[i+1]){
        aname=line.key+i;
        anames.push(aname);
        cssText+="\n@keyframes "+aname+"{";
        cssText+="0%{"+line.points[i].toStyleString()+"}";
        cssText+="100%{"+line.points[i+1].toStyleString()+"}";
        cssText+="}\n";
        cssText+="."+aname+"{";
        cssText+="animation:"+aname+" 1s ease-out forwards;box-sizing: border-box;";
        cssText+="}";
      }
      
    }
    return {cssText:cssText,classNames:anames};
  };

  _global._CX.FrameLine=_FrameLine;

  
  return;
})();