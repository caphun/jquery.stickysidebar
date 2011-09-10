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

      var $sidebar = $(this).data('prevScrollTop', -1), topPadding = options.top;

      $(window).bind('scroll', function() {
        var scrollTop = $(window).scrollTop(),
            containerTop = $sidebar.offset().top,
            containerHeight = $sidebar.height(),
            parentTop = $sidebar.parent().offset().top,
            parentHeight = $sidebar.parent().height(),
            down = (scrollTop > $sidebar.data('prevScrollTop')),
            top = parentTop + parentHeight <= containerTop + containerHeight ? parentHeight - containerHeight : 0,
            sticky = scrollTop > parentTop - topPadding
                && ( (down && (parentTop + parentHeight > containerTop + containerHeight)) || (!down && scrollTop <= containerTop) )
                ? { position: 'fixed', top: 0 }
                : { position: 'absolute', top: top-topPadding, marginTop: topPadding };

        // here's the magic!
        $sidebar
          .css( sticky )
          .data('prevScrollTop', scrollTop);

      });

    });
  };

})(jQuery);
