/**
 * Main JS file for GhosToro behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){
        // Push down the blog at the beginning.
    	var home = $('.home-template');
    	var centered = $('.v-center');
        var homeContent = $('.content');
    	var t;

    	if (home.length !== 0) {
	    	$(window).resize(function() {
	    		clearTimeout(t);
				t = setTimeout(setHeight(), 100);
			});

	    	setHeight();
	    }

	    function setHeight() {
    		var headerHeight = $('#header').height();
    		var windowHeight = $(window).height();
    		var h = windowHeight - headerHeight;
    		centered.css('height', h);
            homeContent.show();
    	}

        // Hide the "scroll down" text on scroll.
        var scrollDownText = $('.scroll-down');

        $(window).scroll(function() {
            if ($(this).scrollTop() > 10) {
                scrollDownText.fadeOut();
            } else if ($(this).scrollTop() === 0) {
                scrollDownText.fadeIn();
            }
        });

        // Add active class on navigation.
        var url = window.location.pathname;
        var navEl = $('#nav a');
        var urlRegExp = new RegExp(url.replace(/\/$/,'') + "$");

        navEl.each(function(){
            if(urlRegExp.test(this.href.replace(/\/$/,''))) {
                $(this).addClass('active');
            }
        });

        // If blog images are larger than viewport set width to 100% to be responsive.
        var contentImages = $('.content img');

        $(window).resize(function() {
            clearTimeout(t);
            t = setTimeout(setImgWidth(), 100);
        });

        setImgWidth();

        function setImgWidth() {
            var windowWidth = $(window).width();
            if (contentImages.width() > windowWidth) {
                contentImages.css('width', '100%');
            } else {
                contentImages.css('width', 'auto');
            }
        }
    });

}(jQuery));