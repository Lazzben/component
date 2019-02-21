function tab($tab){
  this.$tab = $tab
  this.init($tab)
}

tab.prototype = {
  init: function($tab){
    this.$tab = $tab
    this.$btn = this.$tab.find('.btn')
    this.$content = this.$tab.find('.content')
    this.bind()
  },
  bind: function(){
    var _this = this
    this.$btn.on('click', function(){
      $(this).addClass('active').siblings().removeClass('active')
      _this.$content.eq($(this).index()).addClass('active').siblings().removeClass('active')
    })
  }
}

new tab($('.tab').eq(0))
new tab($('.tab').eq(1))