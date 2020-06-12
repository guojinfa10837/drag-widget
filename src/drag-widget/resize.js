
import Guide from './guide';
import Utils from './utils';
import Tips from './tips';
var Resize = function(option){
    this.opts = option;
    this.utils = new Utils(option);
    this.guide = new Guide(option);
    this.tips = new Tips();
    this.init();
};
Resize.prototype.init = function(){
    // 
    this.selectedEvt();

};
Resize.prototype.selectedEvt = function(){
    var _this = this;
    var componentData = this.opts.componentData;
    var componentsWrap = this.opts.componentsWrap;
    var getClass = function(node){
         return node.getAttribute('class');
    };
    var setBorderWh = function(parent,obj){
        parent.querySelector('.l').style.height = obj.height+"px";
        parent.querySelector('.r').style.height = obj.height+"px";
        parent.querySelector('.t').style.width = obj.width+"px";
        parent.querySelector('.b').style.width = obj.width+"px";
    };
    var setWh = function(object,cObj){
        cObj.componentEle.style.width = object.width+'px';
        cObj.componentEle.style.height = object.height+'px';
        cObj.componentEle.style.left = object.left+'px';
        cObj.componentEle.style.top = object.top+'px';
        setBorderWh(cObj.componentEle,object);
    }
    var sizeObj = {
        type:''
    }
    var sizeMouseMove = function(e,cObj){
        e.stopPropagation();
        var width = sizeObj.downW ;
        var height = sizeObj.downH ;
        var left = sizeObj.downLeft;
        var top = sizeObj.downTop;
        sizeObj = Object.assign({},sizeObj,{
            moveX:e.pageX,
            moveY:e.pageY,
            moveLeft:cObj.componentEle.offsetLeft
        });
        if(sizeObj.type == 'l') {
            var speedX = sizeObj.moveX - sizeObj.downX;
            width = sizeObj.downW - speedX;
            height = sizeObj.downH;
            left = sizeObj.downLeft + speedX;
            top = sizeObj.downTop;
            // 控制 left 最小边距
            (left<= cObj.wrapL) &&  (left = cObj.wrapL);
            (left<= cObj.wrapL) &&  (width = cObj.componentEle.offsetWidth);

            
            //设置卡尺 待todo..
            
        }
        if(sizeObj.type == 'r') {
            var speedX = sizeObj.moveX - sizeObj.downX;
            width = sizeObj.downW + speedX;
            height = sizeObj.downH;
            left = sizeObj.downLeft ;
            top = sizeObj.downTop;
            var leftAndW = width +  left;
            // 控制 left 最小边距
            (leftAndW >= cObj.wrapW) && (width = (cObj.wrapW-left));
            //设置卡尺 待todo..
           
        }
       
        if(sizeObj.type == 'b') {
            var speedY = sizeObj.moveY - sizeObj.downY;
            width = sizeObj.downW;
            height = sizeObj.downH + speedY;
            left = sizeObj.downLeft ;
            top = sizeObj.downTop;
            topAndH = height +  top;
            // 控制 left 最小边距
            (topAndH >= cObj.wrapH) && (height = (cObj.wrapH-top));
            //设置卡尺 待todo..
            
        }
        if(sizeObj.type == 't') {
            var speedY = sizeObj.moveY - sizeObj.downY;
            width = sizeObj.downW;
            height = sizeObj.downH - speedY;
            left = sizeObj.downLeft ;
            top = sizeObj.downTop + speedY;
            // 控制最小边距
            (top<= cObj.wrapT) && (height = cObj.componentEle.offsetHeight);
            (top<= cObj.wrapT) && (top = cObj.wrapT);
            //设置卡尺 待todo..
           
        }

        if(sizeObj.type == 'lt') {
            var speedX = sizeObj.moveX - sizeObj.downX;
            var speedY = sizeObj.moveY - sizeObj.downY;

            width = sizeObj.downW - speedX;
            height = sizeObj.downH - speedY;
            left = sizeObj.downLeft + speedX ;
            top = sizeObj.downTop + speedY;
            var topAndH = height +  top;
            // 控制最小边距
            (left<= cObj.wrapL) &&  (left = cObj.wrapL);
            (left<= cObj.wrapL) &&  (width = cObj.componentEle.offsetWidth);
            (top<= cObj.wrapT) && (height = cObj.componentEle.offsetHeight);
            (top<= cObj.wrapT) && (top = cObj.wrapT);
            //设置卡尺 待todo..
           
        }
        if(sizeObj.type == 'rt') {
            var speedX = sizeObj.moveX - sizeObj.downX;
            var speedY = sizeObj.moveY - sizeObj.downY;

            width = sizeObj.downW +speedX;
            height = sizeObj.downH - speedY;
            left = sizeObj.downLeft ;
            top = sizeObj.downTop + speedY;
            leftAndW = width +  left;
            // 控制 最小边距
            (leftAndW >= cObj.wrapW) && (width = (cObj.wrapW-left));
            (top<= cObj.wrapT) && (height = cObj.componentEle.offsetHeight);
            (top<= cObj.wrapT) && (top = cObj.wrapT);

            
        }

        if(sizeObj.type == 'lb') {
            var speedX = sizeObj.moveX - sizeObj.downX;
            var speedY = sizeObj.moveY - sizeObj.downY;

            width = sizeObj.downW - speedX;
            height = sizeObj.downH + speedY;
            left = sizeObj.downLeft + speedX ;
            top = sizeObj.downTop;
            var topAndH = height +  top;
            // 控制 left 最小边距
            (left<= cObj.wrapL) &&  (left = cObj.wrapL);
            (left<= cObj.wrapL) &&  (width = cObj.componentEle.offsetWidth);
            (topAndH >= cObj.wrapH) && (height = (cObj.wrapH-top));

            
        }
        if(sizeObj.type == 'rb') {
            var speedX = sizeObj.moveX - sizeObj.downX;
            var speedY = sizeObj.moveY - sizeObj.downY;
            
            width = sizeObj.downW +speedX;
            height = sizeObj.downH + speedY;
            left = sizeObj.downLeft  ;
            top = sizeObj.downTop;
            var topAndH = height +  top;
            var leftAndW = width +  left;
            // 控制 left 最小边距
            (leftAndW >= cObj.wrapW) && (width = (cObj.wrapW-left));
            (topAndH >= cObj.wrapH) && (height = (cObj.wrapH-top));
        };
        //辅助线
        sizeObj.lineArr = _this.utils.getAdsorbentArr({
            id:cObj.id,
            componentEle:cObj.componentEle,
            type:sizeObj.type,
            width:width,
            height:height,
            left:left,
            top:top
        });
    
        _this.guide.playGuids(sizeObj.lineArr);
        _this.tips.show({
            top:top,
            left:left,
            width:width,
            height:height,
            componentEle:cObj.componentEle
        })
        Object.assign(sizeObj,{
            width:width,
            height:height,
            left: left,
            top:top
        });
        
        
        setWh(sizeObj,cObj);
    }
    var sizeMouseup = function(e,cObj){
        e.stopPropagation();
        //通过辅助线查找最近的吸附目标
        document.onmousemove = null;
        _this.utils.lineAdsorbent({
            behavior:sizeObj.type,
            lineArray:sizeObj.lineArr,
            callback:function(curObj){
                sizeObj = Object.assign(sizeObj,curObj)
                setWh(sizeObj,cObj);
                _this.guide.clearGuid();
            }
        });
        _this.tips.hide({ componentEle:cObj.componentEle});
        _this.opts.resize &&  _this.opts.resize(sizeObj)
       
    }
    var sizeMousedown = function(e,cObj){
        e.stopPropagation();
        var nodeCls = getClass(this);
        sizeObj = Object.assign({},sizeObj,{
            id:cObj.id,
            zIndex:cObj.componentEle.getAttribute('z-index') || 1,
            type:nodeCls,
            downX:e.pageX,
            downY:e.pageY,
            downW:cObj.componentEle.offsetWidth,
            downH:cObj.componentEle.offsetHeight,
            downLeft:cObj.componentEle.offsetLeft,
            downTop:cObj.componentEle.offsetTop,
        });
        _this.tips.show({
            top:sizeObj.downTop,
            left:sizeObj.downLeft,
            width:sizeObj.downW,
            height:sizeObj.downH,
            componentEle:cObj.componentEle
        });
        document.onmousemove  = null;
        document.onmousemove  = function(e){
            sizeMouseMove.call(this,e,cObj)
        };
        
    }


    var insetHtml = function(cObj){
        var resizeStr = '<span class="l"  style="height:'+cObj.componentEle.offsetHeight+'px"></span>'+
                         '<span class="r" style="height:'+cObj.componentEle.offsetHeight+'px;"></span>'+
                         '<span class="t" style="width:'+cObj.componentEle.offsetWidth+'px;"></span>'+
                         '<span class="b" style="width:'+cObj.componentEle.offsetWidth+'px;"></span>'+
                         '<span class="lt"></span>'+
                         '<span class="lb"></span>'+
                         '<span class="rt"></span>'+
                         '<span class="rb"></span>'; 
        var oldResizeWrap = this.querySelector(".resizeWrap");
        if (oldResizeWrap){return}; 
        var $resizeWrap = document.createElement('div');
       
        $resizeWrap.classList.add("resizeWrap");
        $resizeWrap.innerHTML = resizeStr;
        var reszieItem = $resizeWrap.querySelectorAll('span');
        this.append($resizeWrap); 
        for(var i=0;i<reszieItem.length;i++){
            reszieItem[i].onmousedown = function(e){
                document.onmouseup = null;
                sizeMousedown.call(this,e,cObj);
            };
            reszieItem[i].onmouseup = function(e){
                e.stopPropagation();
                document.onmousemove = null;
                this.onmouseup = null;
                sizeMouseup.call(this,e,cObj);
            };
            
        }
    };
    var clearSublingsResize = function(){
        for(var i=0;i<componentData.length;i++){
           var oldResizeWrap = componentData[i].componentEle.querySelector(".resizeWrap");
           oldResizeWrap && oldResizeWrap.remove();
        };
    }
    var selectedFn = function(cObj){
        clearSublingsResize();
        insetHtml.call(this,cObj)
    };
    for(var i=0;i<componentData.length;i++){
        (function(cObj){
            cObj.componentEle.onclick  = null;
            cObj.componentEle.onclick = function(e){
                e.stopPropagation();
                selectedFn.call(this,cObj);
            };
        })(componentData[i]);
    };
}

export default Resize;