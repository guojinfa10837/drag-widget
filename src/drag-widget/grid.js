
/*网格*/
var Grid = function(option){
    this.option = option;
    this.ctx = this.option.cavasEl.getContext("2d");
    this.ctx.clearRect(0,0,option.cavasWidth,option.cavasHeigth);  
    this.methods = {
        moveLine:function(opts){
            opts.ctx.beginPath();
            opts.ctx.moveTo(opts.beginX,opts.beginY);
            opts.ctx.lineWidth = opts.lineWidth ||0.5;
            opts.ctx.strokeStyle = opts.linecolor;
            opts.ctx.lineTo(opts.endX, opts.cedY);
            opts.ctx.stroke();
            opts.ctx.closePath();
        }
    }
    this.init();
    
};
//横线
Grid.prototype.across = function(){
    var opts = this.option;
    var ctx = this.ctx;
    var methods =  this.methods;
    var h = opts.cavasHeigth;
    var hLength = h/opts.spacing;
    for(var i=0;i<h;i+= opts.spacing){
        var obj = {
            ctx:ctx,
            beginX:0,
            beginY:i,
            endX:opts.cavasWidth,
            cedY:i,
            linecolor:opts.linecolor
        };
        (i%100 == 0) && (obj.lineWidth = 1);
        methods.moveLine(obj);
    }
};
//竖线
Grid.prototype.vertical  = function(){
    var opts = this.option;
    var ctx = this.ctx;
    var methods =  this.methods;
    var w = opts.cavasWidth;
    for(var i=0;i<w;i+= opts.spacing){
        var obj = {
            ctx:ctx,
            beginX:i,
            beginY:0,
            endX: i,
            cedY:opts.cavasHeigth,
            linecolor:opts.linecolor
        };
        ;
        (i%100 == 0) && (obj.lineWidth = 1);
        methods.moveLine(obj);
    }
};
Grid.prototype.init = function(){
    var opts = this.option;
    var ctx = this.ctx;
    var methods =  this.methods;
    var h = opts.cavasHeigth;
    var w = opts.cavasWidth;
    this.across();
    this.vertical();
    ctx.save();
    /* methods.moveLine({
        ctx:ctx,
        beginX:10,
        beginY:0,
        endX:10,
        cedY:500,
        linecolor:red
    });
*/
}

export default Grid