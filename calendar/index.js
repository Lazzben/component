function calendar($target){
  this.$target = $target;
  this.init($target);
}

calendar.prototype = {
  init: function($target){
    this.aDayTime = 1000*60*60*24;
    this.$target = $target;
    this.watchDate = new Date();
    this.today = new Date();
    this.isAnimate = false
    this.render();
    this.setDate();
    this.bind();
  },

  bind: function(){
    var _this = this
    this.$calendar_render.find('.header .pre').on('click', function(){
      if(_this.isAnimate){return}
      _this.isAnimate = true
      _this.watchDate = _this.getPreMonth(_this.watchDate)
      _this.setDate()
      _this.isAnimate = false
    });
    this.$calendar_render.find('.header .next').on('click', function(){
      if(_this.isAnimate){return}
      _this.isAnimate = true
      _this.watchDate = _this.getNextMonth(_this.watchDate)
      _this.setDate()
      _this.isAnimate = false
    });
  },
  
  render: function(){
    var html = '<div class="calendar">' 
             + '<div class="header"><span class="pre"></span><span class="date"></span><span class="next"></span></div>' 
             + '<table class="panel">' 
             + '<thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>' 
             + '<tbody></tbody>' 
             + '</table>' 
             + '</div>';
    this.$calendar_render = $(html);
    this.$target.append(this.$calendar_render)
    //this.$calendar_render.insertAfter(this.$target)
    // this.$calendar_render.css({
    //                         'position': 'absolute',
    //                         'left': this.$target.offset().left,
    //                         'top': this.$target.offset().top + this.$target.height(true)
    //                       })
  },
  
  setDate: function(){
    var firstDay = this.getFirstDay(this.watchDate),
        lastDay = this.getLastDay(this.watchDate),
        dateArray = [],
        html = '';
    this.$calendar_render.find('.header .date').text(this.watchDate.getFullYear() + '年' + (this.watchDate.getMonth()+1) + '月')
    for(var i = firstDay.getDay(); i>0; i--){
      var day = new Date(firstDay.getTime() - this.aDayTime * i)
      dateArray.push({type: 'pre', date: day})
    }
    for(var j=0; j<lastDay.getDate() - firstDay.getDate() + 1; j++){
      var day = new Date(firstDay.getTime() + this.aDayTime * j)
      if(this.today.getDate() == day.getDate() && this.today.getFullYear() == day.getFullYear() && this.today.getMonth() == day.getMonth()){
        console.log('yep')
        dateArray.push({type: 'cur current-date' , date: day})
      }else{
        dateArray.push({type: 'cur', date: day})
      }
    }
    for(var k=1; k<7-lastDay.getDay(); k++){
      var day = new Date(lastDay.getTime() + this.aDayTime * k)
      dateArray.push({type: 'next', date: day})
    }
    for(var l=0; l<dateArray.length; l++){
      var type = dateArray[l].type
          date = dateArray[l].date.getDate()
      if(date < 10){
        date = '0' + date
      }else{
        date += ''
      }
      if(l%7 === 0){
        html += '<tr>'
      }
      html += '<td class="' + type + '">' + date +'</td>'
      if(l%7 === 6){
        html += '</tr>'
      }
    }
    console.log(html)
    console.log(dateArray)
    this.$calendar_render.find('tbody').html(html)
  },

  getFirstDay: function(date){
    var year = date.getFullYear(),
        month = date.getMonth(),
        newDate = new Date(year, month, 1);
    return newDate;
  },

  getLastDay: function(date){
    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        newDateNextday = new Date(year, month, 1),
        newDate = new Date(newDateNextday.getTime() - this.aDayTime);
    return newDate;
  },

  getPreMonth: function(date){
    var year = date.getFullYear(),
        month = date.getMonth() - 1;
    if(month === -1){
      month = 11;
      year -= 1; 
    }
    var newMonth = new Date(year,month)
    return newMonth
  },

  getNextMonth: function(date){
    var year = date.getFullYear(),
        month = date.getMonth() + 1;
    if(month === 12){
      month = 0;
      year += 1; 
    }
    var newMonth = new Date(year,month)
    return newMonth
  }
};

new calendar($('.calendar-ct').eq(0));
new calendar($('.calendar-ct').eq(1));