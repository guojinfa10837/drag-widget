//辅助线
var Guide = function(option){
    var _this = this;
    this.option = option;
    this.ctx = this.option.calipers.cavasEl.getContext("2d");
    this.editorWrapL =_this.option.editorWrap.offsetLeft; 
    this.editorWrapT =_this.option.editorWrap.offsetTop; 
    //console.log(this.option.calipers.cavasEl.width,_this.option.calipers.cavasEl.height);
    this.state = {
        cavasH:_this.option.calipers.cavasEl.height,
        cavasW:_this.option.calipers.cavasEl.width,
        lineArrary:[]
    }
    this.methods = {
        moveLine:function(opts){
            opts.ctx.beginPath();
            opts.ctx.moveTo(opts.beginX || 0,opts.beginY || 0);
            opts.ctx.lineWidth = opts.lineWidth || 1,
            opts.ctx.strokeStyle = opts.linecolor || "red",
            opts.ctx.lineTo(opts.endX || 0, opts.cedY || 0);
            opts.ctx.stroke();
            opts.ctx.closePath();
        },
        clearLineY(opts){
            _this.ctx.clearRect((opts.left-1), 0, 2, _this.state.cavasH);
        },
        clearLineX(opts){
            _this.ctx.clearRect(0, (opts.top-1),  _this.state.cavasW,2);
        }
    }
}
Guide.prototype.playGuidX = function(option){
    var methods = this.methods;
    var opts = option;
    methods.moveLine({
        ctx :this.ctx,
        beginX:0,
        beginY:option.top,
        cedY:option.top,
        endX:this.state.cavasW
    }); 
}
Guide.prototype.playGuidY = function(option){
    var methods = this.methods;
    var opts = option;
    methods.moveLine({
        ctx :this.ctx,
        beginX:option.left,
        beginY:0,
        cedY:this.state.cavasH,
        endX:option.left
    }); 
}
Guide.prototype.playGuid = function(option){
    var methods = this.methods;
    var opts = option;
    this.state.lineArrary.push(opts);
    if(opts.type == 'X'){
        this.playGuidX(opts);
    }else{
        this.playGuidY(opts);
    }
}
Guide.prototype.playGuids = function(array){
    this.clearGuid();
    for(var i=0;i<array.length;i++){
        this.playGuid({
            type:array[i].type,
            left:((array[i].left || array[i].LAndW) + this.editorWrapL) || '',
            top:(array[i].top || array[i].TAndH ) + this.editorWrapT,
        })
    }
}
Guide.prototype.clearGuid = function(option){
        var lineArray = this.state.lineArrary;
        var methods = this.methods;
        for(var i=0;i<lineArray.length;i++){
            methods['clearLine'+lineArray[i].type](lineArray[i])
        }
        this.state.lineArrary = [];
}

export default Guide;