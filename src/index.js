

import '../assets/style.css';
import {DragWidget,Drag} from './drag-widget/index.js';
var node = document.createElement('div');
var adBtn = document.createElement('div');
var dragWrap = document.createElement('div');
var str = `<div class="calipersWrap" >
<canvas id="calipers" class="calipers" width="2000px" height="2000px"></canvas>
</div>
<div class="editorWrap" id="editorWrap">
<div class="cavasWrap">
    <canvas id="canvas" class="cavas" width="1000px" height="1000px"></canvas>
    <div class="bgWrap"></div>
 </div>
 <div class="componentsWrap" id="componentsWrap">
     
        <div class="item" data-id="1" z-index='1' style="z-index:1">
            <span>1111</span>
            <span>1111</span>
            <span>1111</span>
            <span>1111</span>
            <span>1111</span>
          
        </div>
        <div class="item" data-id="2" z-index='2'  style="top:200px;left:300px;z-index:2"></div>
        <div class="item" data-id="3" z-index='3'  style="top:100px;left:300px;z-index:3"></div>
        <div class="item" data-id="4" z-index='4'  style="top:230px;left:500px;z-index:4"></div>
        <div class="item" data-id="5" z-index='5'  style="top:277px;left:300px;z-index:5"></div>
        <div class="item" data-id="6" z-index='6'  style="top:150px;left:200px;z-index:6"></div>
        <div class="item" data-id="7" z-index='7'  style="top:600px;left:300px;z-index:7"></div>
     
    
 </div>
</div>`;
var str2 = `<div class="header">head</div><div><input type="text"><button class="submit">提交</button></div>`
node.classList.add('Wrap');
adBtn.classList.add('addBtn');
dragWrap.classList.add('dragWrap');
dragWrap.innerHTML = str2;

node.setAttribute("id","Wrap");
node.innerHTML = str;
adBtn.innerHTML = '添加';
document.body.append(adBtn);
document.body.append(dragWrap);
document.body.append(node);
var zindex = 7;
dragWrap.querySelector(".submit").onclick=function(){
    alert('tij');
}
const confgDrag = new Drag({
    target:document.body,
    componentsWrap:document.body,
    editorWrap:document.body,
    cavasEl:document.body,
    eventItem:'.dragWrap',
    cavasWidth:document.documentElement.clientWidth,
    cavasHeigth:document.documentElement.clientHeight,
    ischangeZindex:false,
    drag:function(obj){
        console.log(obj);
    }
});
/*引入功能*/
const drag = new DragWidget({
    target:document.getElementById('Wrap'),
    editorWrap:document.getElementById('editorWrap'),
    componentsWrap:document.getElementById('componentsWrap'), //组件父亲容器
    eventItem:'.item',  //组件所拖拽的dom
    cavasEl:document.getElementById('canvas'),
    cavasWidth:1000,
    cavasHeigth:1000,
    spacing:20,//线间距
    adsorptionNum:10,//组件之间吸附的间距
    isAdsorption:true, //是否吸附
    linecolor:'#0088ff',
    isShowTips:true,// 是否展示坐标框
    ischangeZindex:true,//是否提高zindex
    resize:function(obj){
        console.log("resize",obj);
    },
    drag:function(obj){
        console.log(obj);
    },
    calipers:{
        cavasEl:document.getElementById('calipers'),
    }
})


adBtn.onclick = function(){
    zindex++;
    let $componentsWrap = node.querySelector('#componentsWrap');
    let itmeNode = document.createElement("div");
    itmeNode.setAttribute('data-id',zindex);
    itmeNode.setAttribute('z-index',zindex);
    itmeNode.classList.add('item');
    itmeNode.style.top = '400px';
    itmeNode.style.left = '100px';
    itmeNode.style.zIndex = zindex;
    $componentsWrap.append(itmeNode);
    for(var i=0;i<100;i++){
        drag.update({
            cavasWidth:1000,
            cavasHeigth:1000,
        })
    }
    
    
}