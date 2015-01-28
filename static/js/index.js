// slide to target
function slideTarget (target) {
	var $target = $(target);
	$('html, body').stop().animate({
		scrollTop: $target.offset().top - 85
	}, 600);
}

// auto set active
function activeNav(num) {
	var num = num + 85;
	var $nav = $('#slideNav');
	$('div.banner').each(function() {
		var $this = $(this);
		var id = $this.attr('id');

		if (num >= $this.data('num')) {
			$('a.active', $nav).removeClass('active');
			$('a[href=#'+ id + ']', $nav).addClass('active');
			activeBanners('#' + id);
		} else {
			$('a[href=#'+ id + ']', $nav).removeClass('active');
		}
	})
}
var activeBanners = (function() {
	var $banners = $('.banner');
	return function (id) {
		$banners.removeClass('active');
		$(id).addClass('active');
	}
})();


// onload
$(function() {
	var is_click = false;
	var timeout = false;
	// save the offset().top on data-num attr for each banner
	$('div.banner').each(function() {
		$(this).data('num', $(this).offset().top);
	})
	// click the nav then slide to #
	$('#slideNav a').click(function (event) {
		slideTarget($(this).attr('href'));
		$('a.active', $('#slideNav')).removeClass('active');
		$(this).addClass('active');
		activeBanners($(this).attr('href'));
		is_click = true;
		return false;
	});
	// click the next to slide
	$('div.next').click(function (event) {
		slideTarget($(this).attr('data-next'));
	});
	// listening scroll
	$(window).on('scroll', function() {
		var $this = $(this);
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(function() {
			var num = $this.scrollTop();
			if (!is_click) {
				activeNav(num);
			}
			is_click = false;
		}, 100);
	});
	// 初始化二维码切换器
	$(".qrcodeTogger .toggle").click(function(event) {
		var target = $(this).attr('data-for');
		if (target === "android") {
			$(".qrcodeTogger").removeClass("ios");
		} else {
			$(".qrcodeTogger").addClass("ios");
		}
	})

});