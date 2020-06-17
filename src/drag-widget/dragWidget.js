/*
*拖拽 装置容器
* 
*/
import Drag from './drag';
import Grid from './grid';
import Resize from './resize';
import Utils from './utils';
var DragWidget = function(option){
    this.option = option;
    this.utils = new Utils(this.option);
    this.bgCarvas = null;
    this.componentsArr = null;
    this.drag = null;
    this.init();
};

DragWidget.prototype.init = function(){
    var _this = this;
    this.bgCarvas = new Grid(this.option);
    this.componentsArr  = this.utils.getComponentsData();
    this.drag = new Drag(Object.assign({},this.option));
    this.resize = new Resize(Object.assign({},this.option,{componentData :this.componentsArr}));
    window.onresize = function(){
        console.log('resize');
       _this.update({});
    }
}
DragWidget.prototype.update = function(option){
    var opts = Object.assign({},this.option,option);
    this.bgCarvas = null;
    this.bgCarvas = new Grid(opts);
    this.componentsArr  = this.utils.getComponentsData();
    this.drag.update(Object.assign({},opts));
    this.resize.update(Object.assign({},opts,{componentData :this.componentsArr})); 
};

export default DragWidget;