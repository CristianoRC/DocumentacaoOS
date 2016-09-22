
var button 			= $('.button');
var content 		= $('.button__content');
var win 				= $(window);

var expand = function() {
  if (button.hasClass('button--active')) {
    return false;
  } else {
    var W 					= win.width();
    var xc 					= W / 2;

    var that 				= $(this);
    var thatWidth 	= that.innerWidth() / 2;
    var thatOffset 	= that.offset();
    var thatIndex		= that.index();
    var other;

    if (!that.next().is('.button')) {
      other = that.prev();
    } else {
      other = that.next();
    }

    var otherWidth		= other.innerWidth() / 2;
    var otherOffset		= other.offset();

    // content box stuff
    var thatContent = $('.button__content').eq(thatIndex);
    var thatContentW = thatContent.innerWidth();
    var thatContentH = thatContent.innerHeight();

    // transform values for button
    var thatTransX 	= xc - thatOffset.left - thatWidth;
    var otherTransX	= xc - otherOffset.left - otherWidth;
    var thatScaleX	= thatContentW / that.innerWidth();
    var thatScaleY	= thatContentH / that.innerHeight();

    that.css({
      'z-index': '2',
      'transform': 'translateX(' + thatTransX + 'px)'
    });

    other.css({
      'z-index': '0',
      'opacity': '0',
      'transition-delay': '0.05s',
      'transform': 'translateX(' + otherTransX + 'px)'
    });

    that.on('transitionend webkitTransitionEnd', function() {
      that.css({
        'transform': 'translateX(' + thatTransX + 'px) scale(' + thatScaleX +',' + thatScaleY + ')',
      });

      that.addClass('button--active');
      thatContent.addClass('button__content--active');
      thatContent.css('transition', 'all 1s 0.1s cubic-bezier(0.23, 1, 0.32, 1)');
      that.off('transitionend webkitTransitionEnd');
    });

    return false;
  }
};

var hide = function(e) {
  var target= $(e.target);
  if (target.is(content)) {
    return;
  } else {
    button.removeAttr('style').removeClass('button--active');
    content.removeClass('button__content--active').css('transition', 'all 0.2s 0 cubic-bezier(0.23, 1, 0.32, 1)');
  }
};

var bindActions = function() {
  button.on('click', expand);
  win.on('click', hide);
};

var init = function() {
  bindActions();
};

init();