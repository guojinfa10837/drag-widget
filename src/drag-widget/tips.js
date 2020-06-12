var Tips = function(){
    var _this = this;
    this.methods = {
        insetHtml:function(option){
            var node = document.createElement('div');
            node.classList.add('tipsWrap');
            var str = '<p class="X">X:'+option.left+'像素</p>'+
                      '<p class="Y">Y:'+option.top+'像素</p>'+
                      '<p class="width">宽:'+option.width+' 像素</p>'+
                      '<p class="height">高:'+option.height+' 像素</p>';
            node.innerHTML = str;  
            var $TipsWrap = option.componentEle.querySelector('.tipsWrap');        
            if($TipsWrap) {
                 _this.upDate(option);
                $TipsWrap.style.display = 'block';
            }else{
                option.componentEle.append(node); 
            } 
        }
    }
     
};
Tips.prototype.show = function(opts){
    var methods = this.methods;
    methods.insetHtml(opts);
};
Tips.prototype.upDate = function(opts){
    var $TipsWrap = opts.componentEle.querySelector('.tipsWrap');
    var $x =  $TipsWrap.querySelector('.X');
    var $y =  $TipsWrap.querySelector('.Y');
    var $width =  $TipsWrap.querySelector('.width');
    var $height=  $TipsWrap.querySelector('.height');
    $x.innerHTML = 'X:'+opts.left +'像素';
    $y.innerHTML = 'Y:'+opts.top +'像素'
    $width.innerHTML = '宽:'+opts.width +'像素';
    $height.innerHTML = '高:'+opts.height +'像素';
};
Tips.prototype.hide = function(opts){
  var $TipsWrap = opts.componentEle.querySelector('.tipsWrap');
  $TipsWrap.style.display = 'none';
}

export default Tips;