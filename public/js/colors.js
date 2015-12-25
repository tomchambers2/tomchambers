$(window).on('load', function() {
	$('.box').each(function() {
		//width = width of image

		var width = $(this).find('img')[0].width;
		console.log('width',width)
		$(this).width(width);
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



	// function randomColor(element) {
	// 	var up = [true,true,true];
	// 	setInterval(function() {
	// 		var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	// 		var current = element.css('border-bottom-color');
	// 		var colors = current.match(/[0-9]{1,3}/g);
	// 		function changeColor(index) {
	// 			if (colors[index] === '255') {
	// 				up[index] = false;
	// 			} else if (colors[index] === '0') {
	// 				up[index] = true;
	// 			}
	// 			if (up[index] === true) {
	// 				return parseInt(colors[index])+1;
	// 			} else if (up[index] === false) {
	// 				return parseInt(colors[index])-1;
	// 			}
	// 		}
	// 		r = changeColor(0);
	// 		g = changeColor(1);
	// 		b = changeColor(2);
	// 		var output = 'rgb('+r+','+g+','+b+')';
	// 		element.css('border-bottom-color', output);
	// 	},200);		
	// }

	/*randomColor($('.triangle.one'));
	randomColor($('.triangle.two'));
	randomColor($('.triangle.three'));
	randomColor($('.triangle.four'));
	randomColor($('.triangle.five')); */
})