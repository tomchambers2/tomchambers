$(window).on('load', function() {
	$('.box').each(function() {
		//width = width of image

		var width = $(this).find('img')[0].width;
		console.log('width',width)
		if (width < 1) {
			$(this).width(355);
		} else {
			$(this).width(width);
		}
	})

	var $container = $('.portfolio-container');
	$container.isotope({
		itemSelector: '.box',
		layoutMode: 'packery',
		packery: {
			gutter: 35
		}
	});
});

$(document).ready(function() {
	$('.close-button').click(function() {
		$('.box').removeClass('selected');
		$('.box-content').removeClass('selected');
		$container.isotope();
		var boxContent = $(this).parent();
		var box = boxContent.parent();		
		setTimeout(function() {
			var divHeight = box.offset().top - 40;
			$('html,body').animate({
				scrollTop: divHeight
			}, 400);
		}, 400);
	});
	$('.helper-text').click(function() {
		var boxContent = $(this).parent();
		var box = boxContent.parent();

		$('.box').removeClass('selected');
		$('.box-content').removeClass('selected');		
		box.addClass('selected');		
		boxContent.addClass('selected');
		$container.isotope();
		setTimeout(function() {
			var divHeight = box.offset().top - 40;
			$('html,body').animate({
				scrollTop: divHeight
			}, 400);
		}, 400);

	});

	$('.filter-select').on('click', function() {
		$container.isotope({ filter: $(this).attr('data-filter') });
		$('.filter-select').removeClass('selected');
		$(this).toggleClass('selected');
	});

	var $container = $('.portfolio-container');
	$container.isotope({
		itemSelector: '.box',
		masonry: {
			columnWidth: 355,
			gutter: 16
		}
	});

})