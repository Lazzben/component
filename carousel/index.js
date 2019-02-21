function carousel($ct){
  this.$ct = $ct;
  this.init($ct);
}

carousel.prototype = {
  init: function($ct){
    this.$ct = $ct;
    this.$imgct = this.$ct.find('.img-ct');
    this.$imgs = this.$ct.find('.img-ct>li');
    this.$prebtn = this.$ct.find('.pre');
    this.$nextbtn = this.$ct.find('.next');
    this.$bullet = this.$ct.find('.bullet>li');
    this.$imgct.append(this.$imgs.first().clone());
    this.$imgct.prepend(this.$imgs.last().clone());
    this.imgwidth = this.$imgs.width();
    this.imgcount = this.$imgs.length;
    this.index = 0;
    this.isAnimate = false
    this.$imgct.width(this.imgwidth * (this.imgcount + 2));
    this.$imgct.css('left', -this.imgwidth);
    this.bind();
  },
  bind: function(){
    var _this = this
    this.$prebtn.on('click', function(){
      _this.showPre(1);
    });
    this.$nextbtn.on('click', function(){
      _this.showNext(1);
    });
    this.$bullet.on('click', function(){
      var _index = $(this).index()
      if(_index > _this.index){
        _this.showNext(_index - _this.index)
      }else{
        _this.showPre(_this.index - _index)
      }
    });
  },
  showNext: function(step){
    var _this = this
    if(this.isAnimate){
      return 0
    }
    this.isAnimate = true
    this.$imgct.animate({
      left: '-='+this.imgwidth * step
    }, function(){
      _this.index += step
      if(_this.index === _this.imgcount){
        _this.$imgct.css('left', -_this.imgwidth);
        _this.index = 0
      }
      _this.setBullet()
      _this.isAnimate = false
    })
  },
  showPre: function(step){
    var _this = this
    if(this.isAnimate){
      return 0
    }
    this.isAnimate = true
    this.$imgct.animate({
      left: '+='+this.imgwidth * step
    }, function(){
      _this.index -= step
      if(_this.index === -1){
        _this.$imgct.css('left', -_this.imgwidth * _this.imgcount);
        _this.index = _this.imgcount - 1
      }
      _this.setBullet()
      _this.isAnimate = false
    })
  },
  setBullet: function(){
   this.$bullet.eq(this.index).addClass('active').siblings().removeClass('active')
  }
};

new carousel($('.carousel').eq(0));
new carousel($('.carousel').eq(1));
new carousel($('.carousel').eq(2));