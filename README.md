#  drag-widget

## 项目介绍
   drag-widget 为衍生后的drag，含盖了 网格，卡尺，拖拽寻找标尺线进行吸附，改变宽高进行寻找标尺线吸附，从而提高了拖拽元素对齐的准确性。 
    
#  源码启动
## 初始化
	npm install

## 本地服务
	npm run start

#  npm 安装
   npm i drag-widget

## 以及简单的使用 
#### html
```
<div class="Wrap"  id="Wrap">
         <div class="calipersWrap" >
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
         </div>
     </div>
```
#### CSS
```
	.Wrap,body,html{
		width:100%;
		height: 100%;

	}
	*{
		padding:0;
		margin:0;
	}
	.wrap{
		position: relative;
	}
	.calipersWrap{
		position: absolute;
		left: 0;
		top:0;
		z-index: 0;
		width:100%;
		height: 100%;
	}
	.calipers{
		background:#ccc;
		
	}
	.editorWrap{
		width:1000px;
		height: 500px;
		margin:20px  auto 0 auto;
	}
	.cavasWrap{
	position: absolute;
		z-index: 1;
	}
	.cavas{
		position: absolute;
	}
	.componentsWrap{
		width:1000px;
		height: auto;
		position: absolute;
		z-index: 2;
	}
	.componentsWrap .item{
		width:150px;
		height: 150px;
		background:yellow;
		position: absolute;
		left: 0;
		top:0;
	}
	
	.resizeWrap >span{
		position: absolute;

	}
	.resizeWrap >span.l{
		width:3px;
		background:red;
		top:0;
		left:0;
		z-index: 9;
		cursor:w-resize;
	}
	.resizeWrap >span.r{
		width:3px;
		background:red;
		top:0;
		right:0;
		z-index: 9;
		cursor:w-resize;
	}
	.resizeWrap >span.t{
		height:3px;
		background:red;
		top:0;
		right:0;
		z-index: 9;
		cursor:s-resize;
	}
	.resizeWrap >span.b{
		height:3px;
		background:red;
		bottom:0;
		right:0;
		z-index: 9;
		cursor:s-resize;
	}
	.resizeWrap >span.lt,.resizeWrap >span.lb,.resizeWrap >span.rt,.resizeWrap >span.rb{
		width:10px;
		height: 10px;
		position: absolute;
		border:1px solid red;
		z-index: 10;
	}
	.resizeWrap >span.lt{
		top:-5px;
		left:-5px;
		cursor:se-resize;
	}
	.resizeWrap >span.lb{
		bottom:-5px;
		left:-5px;
		cursor:ne-resize;
	}
	.resizeWrap >span.rt{
		top:-5px;
		right:-5px;
		cursor:ne-resize;
	}
	.resizeWrap >span.rb{
		bottom:-5px;
		right:-5px;
		cursor:se-resize;
	}
	.tipsWrap{
		position: absolute;
		bottom:-55px;
		right:-115px;
		background:rgba(0, 0,0, 0.5);
		width:100px;
		
		border-radius: 5px;
		color:#fff;
	}
	.tipsWrap > p{
		height: 25px;
		line-height: 25px;
		padding-left: 10px;
		box-sizing: border-box;
		font-size: 12px;
	}
```
#### JS
```
import {DragWidget} from 'drag-widget'
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
```
	 


