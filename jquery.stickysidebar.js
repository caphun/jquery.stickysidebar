/**
 * jQuery stickySidebar
 *
 * Copyright (c) 2011 Ca-Phun Ung <caphun at yelotofu dot com>
 * Licensed under the MIT (MIT-LICENSE.txt) license.
 *
 * http://github.com/caphun/jquery.stickysidebar/
 *
 * Plugin to handle sticky sidebars.
 *
 */

(function($){

// cached values
var namespace = '.stickySidebar', 
    stickyPrevScrollTop = 'prevScrollTop'+namespace;

// define stickySidebar method
$.fn.stickySidebar = function( options ) {

  return this.each(function() {

    new $.stickySidebar( this, options );

  });

}

// plugin constructor
$.stickySidebar = function( elem, options ) {

  // deep extend
  this.options = $.extend(true, {}, $.stickySidebar.defaults, options );

  // the original element | the parent element
  this.element = $( elem );
  this.parentElem = this.element.parent();

  // run
  this.init();
}

// plugin defaults
$.stickySidebar.defaults = {
  top: 0
}

// plugin prototypes
$.stickySidebar.prototype = {

  init: function() {

    // define self
    var self = this;

    // cache previous scrollTop value
    self.element.data(stickyPrevScrollTop, -1).css('display', 'inline');

    // here comes the magic!
    $( window ).bind('scroll'+namespace, function() {
      self.stickiness().data(stickyPrevScrollTop, $(this).scrollTop());
    });

  },
  
  // actually, all the logic is here!!!
  stickiness: function() {
    var scrollTop = $( window ).scrollTop(),
        elem = this.element, elemTop = elem.offset().top, elemHeight = elem.outerHeight(),
        pTop = this.parentElem.offset().top, pHeight = this.parentElem.outerHeight(),
        down = (scrollTop > elem.data(stickyPrevScrollTop));

    return elem.css( 
        scrollTop > pTop - this.options.top
        && ( (down && (pTop + pHeight > elemTop + elemHeight)) || (!down && scrollTop <= elemTop) )

        // sticky
        ? { 
            position: 'fixed', 
            top: 0 
          }

        // not sticky
        : { 
            position: 'absolute', 
            top: (pTop + pHeight <= elemTop + elemHeight ? pHeight - elemHeight : 0) - this.options.top, 
            marginTop: this.options.top 
          }
        );
  }

}

})(jQuery);
