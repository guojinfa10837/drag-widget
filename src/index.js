

import '../assets/style.css';
import {DragWidget} from './drag-widget/index.js';
var node = document.createElement('div');
var str = `      <div class="calipersWrap" >
<canvas id="calipers" class="calipers" width="2000px" height="2000px"></canvas>
</div>
<div class="editorWrap" id="editorWrap">
<div class="cavasWrap">
    <canvas id="canvas" class="cavas" width="1000px" height="1000px"></canvas>
    <div class="bgWrap"></div>
 </div>
 <div class="componentsWrap" id="componentsWrap">
     <div class="">
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
    
 </div>
</div>`;
node.classList.add('Wrap');
node.setAttribute("id","Wrap");
node.innerHTML = str;
document.body.append(node);


/*引入功能*/


new DragWidget({
        target:document.getElementById('Wrap'),
        editorWrap:document.getElementById('editorWrap'),
        componentsWrap:document.getElementById('componentsWrap'),
        eventItem:'.item',
        cavasEl:document.getElementById('canvas'),
        cavasWidth:1000,
        cavasHeigth:1000,
        spacing:20,//线间距
        adsorptionNum:10,//组件之间吸附的间距
        linecolor:'#0088ff',
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
