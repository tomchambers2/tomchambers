$(document).ready(function() {
  $('.background-video').bind('play', function(e) {
    console.log('video start');
    $('.loading-video').css('display', 'none')
  });

	$('.headline').fitText(0.75);

	$('.headline').css('lineHeight',$('.headline').css('fontSize'));
	$(window).resize(function() {
			$('.headline').css('lineHeight',$('.headline').css('fontSize'));
	});

	$("button").each(function() {
		this.addEventListener('mouseup', function() {
			this.blur();
		});
	});	

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 600);
        return false;
      }
    }
  });	
});