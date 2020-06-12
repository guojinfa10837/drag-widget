var Utils = function(option){
    this.option = option;
    this.methods = {
        //通过行为找到对应的辅助线类型 left或者top
        behaviorTolineType:function(opts){
            switch(opts.behavior){
                case 'l':
                    return ['left'];
                case 'r':
                    return ['LAndW'];
                case 't':
                    return ['top'];
                case 'b':
                    return ['TAndH'];
                case 'lt':
                    return ['left','top'];
                case 'lb':
                    return ['left','TAndH'];  
                case 'rt':    
                    return ['LAndW','top'];  
                case 'rb':    
                    return ['LAndW','TAndH']; 
                default :
                    return [];         
            }
        },
        objMerge:function(obj1,obj2){
            var obj = {
                width:obj1.width == obj2.width ? obj1.width:obj2.width,
                height:obj1.height == obj2.height ? obj1.width:obj2.height,
                top:obj1.top == obj2.top ? obj1.top:obj2.top,
                left:obj1.left == obj2.left ? obj1.left:obj2.left,
            }
            return obj;
        },
        /*
        *辅助线的坐标--组件的坐标
        */
        getCurobj:function(behaviorType,obj){
            var ctop = obj.componentEle.offsetTop;
            var cleft = obj.componentEle.offsetLeft;
            var speedY = 0,speedX= 0;
            var curobj = {};
            var left,top,width,height;
            if(behaviorType == 'top'){
                speedY = ctop - obj.top ;
                top = obj.top ;
                height = obj.cHeight + speedY;
                return {
                    top:top,
                    height:height,
                }
            }
            if(behaviorType == 'left'){
                speedX = cleft - obj.left;
                left = obj.left;
                width = obj.cWidth + speedX ;
                return {
                    left: left,
                    width:width,
                }
            }
            if(behaviorType == 'LAndW'){ //这种情况是吸附right
                speedX = obj.LAndW -  obj.cWidth - cleft  ;
                width = obj.cWidth + speedX ;
                return {
                    width:width,
                }
            }
            if(behaviorType == 'TAndH'){ //这种情况是吸附bottom
                speedY = obj.TAndH -  obj.cHeight - ctop  ;
                height = obj.cHeight + speedY;
                return {
                    height:height,
                }
            }
            return {};
        },
        behaviorTypeToline:function(typeArr,array){
            //返回实际的left 以及top 和width/height
           var curObj = {};
           var array = array || [];
           var typeArr  = typeArr || [];
           if(!typeArr.length){ //如果没有拖拽行为 这种情况可以是在拖拽整个组件而不是resize
               return;
           }
           for(var i=0;i<array.length;i++){
               var curobj = {
                    left: array[i].componentEle.offsetleft,
                    top: array[i].componentEle.offsetTop,
                    width:array[i].cWidth,
                    height:array[i].cHeight,
                }
                for(var j=0;j<typeArr.length;j++){
                    if(array[i][typeArr[j]]){
                       curObj = Object.assign({},curObj,this.getCurobj(typeArr[j],array[i]));
                   }
               }
              
           }
         
           return curObj
        },
        getTypeTocurLAndW:function(obj){
            var ctop = obj.componentEle.offsetTop;
            var cleft = obj.componentEle.offsetLeft;
            var nobj = {};
            if(obj.LAndW){ //
               nobj.left = obj.LAndW - obj.cWidth;
            }
            if(obj.LAndW){ //
                nobj.top = obj.TAndH - obj.cHeight;
            }
            return Object.assign({},obj,nobj);
        },
        //通过每条线的最小值进行吸附 todo
        minNumBehaviorToline:function(lineArray){
            var nArrAy = [];
            var curobj = {};
            var lineArray = lineArray || [];
            var leftArr = [];
            var topArr = [];
            var minTop = 0;
            var minleft = 0;
            if(!lineArray.length){ return null}
            
            curobj = {
              top:lineArray[0].componentEle.offsetTop,
              left:lineArray[0].componentEle.offsetLeft,
            }
           for(var i=0;i<lineArray.length;i++){
               var zcObj = this.getTypeTocurLAndW(lineArray[i]);
               zcObj.left && leftArr.push(zcObj.left);
               zcObj.top && topArr.push(zcObj.top);
           }
           var minleft =  Math.max.apply(Math, leftArr);
           var minTop =  Math.max.apply(Math, topArr);
           return Object.assign(curobj,{
               left:minleft,
               top:minTop
           });
        }

    }
}
/*
 * 获取吸附的目标组件数据
 * 参数当前的组件数据
*/
Utils.prototype.getAdsorbentArr = function(curObj){
    var array = new Array();
    var speed = this.option.adsorptionNum;
    var componentData = this.option.componentData;
    var curTAndH = curObj.top+ curObj.height;
    var curLAndW = curObj.left + curObj.width;
     /**
     * 1.left 值相近
     * 2.top值相近
     * 3.top+component.height
     * 4.left+component.width;
     */
    for(var i=0;i<componentData.length;i++){
        if(componentData[i].id != curObj.id){
            var width = componentData[i].componentEle.offsetWidth;
            var height= componentData[i].componentEle.offsetHeight;
            var top = componentData[i].componentEle.offsetTop;
            var left = componentData[i].componentEle.offsetLeft;
            var TAndH = top + height;
            var LAndW = left + width;
            if(Math.abs(left-curObj.left) <= speed){
               var obj = {
                   type:'Y',
                   left:left,
                   cWidth:curObj.width,
                   cHeight:curObj.height,
                   componentEle:curObj.componentEle
               }
               array.push(obj);
            } 
            if(Math.abs(top-curObj.top) <= speed){
                var obj = {
                   type:'X',
                   top:top,
                   cWidth:curObj.width,
                   cHeight:curObj.height,
                   componentEle:curObj.componentEle
               }
               array.push(obj);
            }
            if(Math.abs(LAndW-curLAndW) <= speed){
                var obj = {
                   type:'Y',
                   LAndW:LAndW,
                   cWidth:curObj.width,
                   cHeight:curObj.height,
                   componentEle:curObj.componentEle
               }
               array.push(obj);
            }
            if(Math.abs(TAndH-curTAndH) <= speed){
                var obj = {
                   type:'X',
                   TAndH:TAndH,
                   cWidth:curObj.width,
                   cHeight:curObj.height,
                   componentEle:curObj.componentEle
               }
               array.push(obj);
            }
        }
    }
    //console.log('getAdsorbentArr',array);
    return array;
   // console.log(curObj);
};
Utils.prototype.lineAdsorbent = function(opts){
     var behavior = opts.behavior || behavior;//行为
     var lineArray = opts.lineArray;
     var methods = this.methods;
     if(!behavior){ //无行为 //这种情况一般出现在drag中
        var curobj = methods.minNumBehaviorToline(lineArray);
        (curobj !=null)  && (opts.callback(curobj));
     }else{
        var behaviorTolineType = methods.behaviorTolineType(opts);
        //通过行为类型获取到实际的位置
        var curobj =  methods.behaviorTypeToline(behaviorTolineType,lineArray);
        opts.callback(curobj);
     }
    
};
//获取最大的z-index
Utils.prototype.getMaxZindex = function(arr){
    var maxZindex = 0;
    var inxArr = [];
    for(var i=0;i<arr.length;i++){
        var zIndx = arr[i].componentEle.getAttribute('z-index');
        inxArr.push(zIndx);
    };
    maxZindex = Math.max.apply(Math, inxArr)
    return maxZindex;
};
//setZindex
Utils.prototype.setZindex = function(componentEle,index){          
    componentEle.setAttribute('z-index',index);
    componentEle.style.zIndex = index; 
};
Utils.prototype.getComponentsData = function(){
    var _this = this;
    var componentsWrap  = this.option.componentsWrap;
    var components = componentsWrap.querySelectorAll(this.option.eventItem);
    var componentArray = [];
    for(var i=0;i<components.length;i++){
        var obj = {
            id: components[i].getAttribute('data-id'),
            componentEle:components[i],
            zIndex:components[i].getAttribute('z-index') || 1,
            offsetTop: components[i].offsetTop,
            offsetLeft : components[i].offsetLeft,
            wrapT:_this.option.cavasEl.offsetTop,
            wrapL : _this.option.cavasEl.offsetLeft,
            wrapW : _this.option.cavasWidth,
            wrapH : _this.option.cavasHeigth,
            width :components[i].offsetWidth,
            height :  components[i].offsetHeight, 
        }
        componentArray.push(obj);
    }
    return componentArray;
};

export default Utils;