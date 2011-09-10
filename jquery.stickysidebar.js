/**
 * Sticky Sidebar
 * Plugin to handle sticky sidebars
 * Author: Ca-Phun Ung < caphun at yelotofu dot com >
 *
 * TODO : Need to clean up code
 *
 */
(function($){

  $.fn.stickySidebar = function( options ) {

    return this.each(function() {

      var $sidebar = $(this).data('prevScrollTop', -1), o = $.extend({}, options, $.stickysidebar.defaults);

      $(window).bind('scroll', function() {
        var scrollTop = $(window).scrollTop(),
            containerTop = $sidebar.offset().top,
            containerHeight = $sidebar.outerHeight(),
            parentTop = $sidebar.parent().offset().top,
            parentHeight = $sidebar.parent().outerHeight(),
            down = (scrollTop > $sidebar.data('prevScrollTop')),
            top = parentTop + parentHeight <= containerTop + containerHeight ? parentHeight - containerHeight : 0,
            sticky = scrollTop > parentTop - o.top
                && ( (down && (parentTop + parentHeight > containerTop + containerHeight)) || (!down && scrollTop <= containerTop) )
                ? { position: 'fixed', top: 0 }
                : { position: 'absolute', top: top-o.top, marginTop: o.top };

        // here's the magic!
        $sidebar
          .css( sticky )
          .data('prevScrollTop', scrollTop);

      });

    });
  };
  
  $.stickysidebar = function() {};

  $.stickysidebar.defaults = {
    top: 20
  };

})(jQuery);
