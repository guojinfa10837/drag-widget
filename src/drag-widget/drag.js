
import Guide from './guide';
import Utils from './utils';
import Tips from './tips';
var Drag = function(option){
    this.option = option;
    this.init();
    this.state = {};
};
Drag.prototype.init = function(){
    this.guide = this.option.isAdsorption ?new Guide(this.option) : null;
    this.utils = new Utils(this.option);
    this.tips = new Tips();
    this.eventFn();
}
//吸附辅助线
Drag.prototype.isAdsorbent = function(itemObj,adsorbentCallback,noadsorbentCallback){
    var $wrap = this.option.target;
    var speed = 20;
    var $eventItem = $wrap.querySelectorAll(this.option.eventItem);
    var componentsData = this.option.componentData;
    var array = [];
    for(var i=0;i<$eventItem.length;i++){
        var id = $eventItem[i].getAttribute('data-id');
        if(id == itemObj.id){
            continue
        }else{
            var offsetLeft = $eventItem[i].offsetLeft;
            var offsetTop = $eventItem[i].offsetTop;
            var type = (Math.abs(itemObj.moveLeft - offsetLeft) <= speed) ? 'Y':(Math.abs(itemObj.moveTop - offsetTop) <= speed)?'X':'';
            var obj = {
                itemLeft:offsetLeft,
                itemTop:offsetTop,
                type:type
            };

            if(Math.abs(itemObj.moveLeft - offsetLeft) <= speed || Math.abs(itemObj.moveTop - offsetTop) <= speed){
                array.push(obj);
                adsorbentCallback(obj);
                console.log(array);
                break;
            }else{
                noadsorbentCallback(obj);
                array = [];
                //break;
            }
            
        }
        
    }
};
Drag.prototype.eventFn = function(){
   var _this = this;

   var componentsData = this.utils.getComponentsData();
   
   var $wrap = this.option.target;
   var ads = {
       isads:true
   }; //是否吸附
   var $eventItem = $wrap.querySelectorAll(this.option.eventItem);
   var editorWrapL =_this.option.editorWrap.offsetLeft; 
   var editorWrapT =_this.option.editorWrap.offsetTop; 
   var ismove  = false;
   var evtFn = function(cObj){
        var itemObj = {
            wrapT:'', //包裹元素盒子的t
            wrapL:'',//包裹元素盒子的L
            wrapW:'',
            wrapH:'',
            width:'',
            height:'',
            downTop:'',
            downLeft:'',
            downevtT:'',
            downevtL:'',
            moveTop:'',
            moveLeft:'',
            moveevtT:'',
            moveevtL:'',
            moveingT:'',//移动中的距离  
            moveingL:'',
            isads:false,
        }
        var mousedownFn = function(e){
            ismove = false;
            itemObj = {isads:false,adsL:"",adsT:""};
            var getMaxZindex = _this.utils.getMaxZindex(componentsData);
           _this.option.ischangeZindex &&  _this.utils.setZindex(cObj.componentEle,getMaxZindex+1);
            var index = getMaxZindex+1;
            itemObj = Object.assign({isads:false,adsL:"",adsT:""},itemObj,cObj,{
                id:this.getAttribute('data-id'),
                zIndex:index,
                downTop:this.offsetTop,
                downLeft:this.offsetLeft,
                downevtL:e.pageX,
                downevtT:e.pageY,
                width:this.offsetWidth,
                height:this.offsetHeight,
            });
            //位置框
            _this.option.isShowTips && _this.tips.show({
               left:itemObj.downLeft,
               top:itemObj.downTop,
               width:itemObj.width,
               height:itemObj.height,
               componentEle:cObj.componentEle
            });
            this.removeEventListener("mousemove",mousemoveFn);
            this.addEventListener("mousemove",mousemoveFn);
        };
        var mousemoveFn = function(e){
            e.stopPropagation();
            e.preventDefault();
            itemObj.moveTop = this.offsetTop;
            itemObj.moveLeft = this.offsetLeft;
            itemObj.moveevtL = e.pageX;
            itemObj.moveevtT = e.pageY;
            var t = itemObj.moveevtT - itemObj.downevtT + itemObj.downTop;
            var l = itemObj.moveevtL - itemObj.downevtL + itemObj.downLeft;
            if(t <  itemObj.wrapT || l <  itemObj.wrapL|| t > (itemObj.wrapT+ itemObj.wrapH-itemObj.height) || l > (itemObj.wrapL+ itemObj.wrapW-itemObj.width)){
                return;
            }
            itemObj.moveingL = itemObj.left =  l;
            itemObj.moveingT = itemObj.top = t;
            (_this.option.isAdsorption) &&  (itemObj.lineArr = _this.utils.getAdsorbentArr({
                id:cObj.id,
                left:itemObj.moveingL,
                top: itemObj.moveingT,
                width:itemObj.width,
                height:itemObj.height,
                componentEle:cObj.componentEle
            }));
            _this.option.isAdsorption && _this.guide.playGuids( itemObj.lineArr);
            _this.option.isShowTips && _this.tips.upDate({
               left:itemObj.moveingL,
               top:itemObj.moveingT,
               width:itemObj.width,
               height:itemObj.height,
               componentEle:cObj.componentEle
            });
            //判断是否移动
            (Math.abs(itemObj.moveingT - itemObj.downTop)>0 || Math.abs(itemObj.moveingT - itemObj.downTop)>0) && (ismove = true) ;

            
            this.style.top = itemObj.moveingT+"px";
            this.style.left = itemObj.moveingL+"px";
            this.removeEventListener("mouseleave",mouseupFn);
            this.addEventListener("mouseleave",mouseupFn);
        };

        var mouseupFn = function(e){
            var _t = this;
            this.removeEventListener("mousemove",mousemoveFn);
            //清除辅助线
            (_this.option.isAdsorption) && (_this.utils.lineAdsorbent({
                lineArray: itemObj.lineArr,
                callback:function(curObj){
                   /*  sizeObj = Object.assign(sizeObj,curObj)
                    setWh(sizeObj,cObj); */
                    _t.style.left = curObj.left+"px";
                    _t.style.top = curObj.top+"px";

                    _this.guide.clearGuid();
                }
            }));
            _this.option.isShowTips &&  _this.tips.hide({
                componentEle:cObj.componentEle
            });
            (_this.option.drag && ismove && (itemObj.left || itemObj.top)) &&  _this.option.drag(itemObj);
            //_this.guide.clearGuid();
            itemObj = {};
        }; 
       /*  cObj.componentEle.removeEventListener("mousedown",mousedownFn);
        cObj.componentEle.addEventListener("mousedown",mousedownFn);
        cObj.componentEle.removeEventListener("mouseup",mouseupFn);
        cObj.componentEle.addEventListener("mouseup",mouseupFn); */
        cObj.componentEle.onmousedown = null;
        cObj.componentEle.onmousedown = mousedownFn;
        cObj.componentEle.onmouseup = null;
        cObj.componentEle.onmouseup = mouseupFn;
       // cObj.componentEle.onMousedown = mousedownFn;
        
        
    }
    console.log(componentsData);
    for(var i=0;i<componentsData.length;i++){
        console.log('9999');
        evtFn(componentsData[i]);
      /*  (function(Obj){
           evtFn(Obj);
       })(componentsData[i]); */
    }
};

Drag.prototype.update = function(opts){
    this.option = Object.assign({},this.option,opts);
    this.init()
}
export default Drag;