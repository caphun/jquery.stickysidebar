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
  gutter: 0 // defines the space to leave above the sidebar when it's sticky - default 0
}

// plugin prototypes
$.stickySidebar.prototype = {

  init: function() {

    // define self
    var self = this;

    self.element

      // cache previous scrollTop value
      .data(stickyPrevScrollTop, -1)

      // force display inline to leave the element in it's 
      // position when switched to fixed|absolute
      .css('display', 'inline');

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
        // if reached the element minus some gutter space we're entering sticky territory.
        scrollTop > pTop - this.options.gutter
        // if scrolling down check if reached the bottom of the parent container
        && ( (down && (pTop + pHeight > elemTop + elemHeight)) 
          // if scrolling up check if scrollTop is less than the element top position
          || (!down && scrollTop <= elemTop) )

        // sticky
        ? { 
            position: 'fixed', 
            top: 0 
          }

        // not sticky
        : { 
            position: 'absolute', 
            top: (pTop + pHeight <= elemTop + elemHeight ? pHeight - elemHeight : 0) - this.options.gutter, 
            marginTop: this.options.gutter 
          }
        );
  }

}

})(jQuery);
