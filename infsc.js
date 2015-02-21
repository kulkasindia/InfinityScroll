
var loadNext = function(){
	var $el = $('#infinity-scroll');
	var next_uri = $el.attr('next-uri');

	if ( typeof next_uri != 'undefined' && next_uri != '204' ){

    	$el.append( '<div class="clr infinity-scroll-clr"></div><div class="infinity-scroll-loading">Loading<span class="inf-dot"></span></div>' );
    	animateLoading(true);
		$.ajax({
			type: 'GET',
			url: next_uri,
			success: function(data, textStatus, request){
				
				// Stop loading animation
				animateLoading(false);

				switch(textStatus) {
				    case 'success':
				    	$el.find('.infinity-scroll-loading, .infinity-scroll-clr').remove();
				    	$el
				    		.append(data)
				    		.attr('next-uri', request.getResponseHeader('Next-uri'));
				    	scLoading = false;

				    	$('abbr.timeago').timeago();
				        break;

				    case 'nocontent':
				    	$el
				    		.find('.infinity-scroll-loading')
				    		.html('<div class="b-big">All results were already shown</div><p><a href="#" class="back-to-top"><i class="fa fa-long-arrow-up b-big"></i> back to top</a></p>');
				        break;

				    case 'abort':
				    	$el
				    		.find('.infinity-scroll-loading')
				    		.html('<div class="b-big">Request aborted</div><p><a href="#" class="back-to-top"><i class="fa fa-long-arrow-up b-big"></i> back to top</a></p>');
				    	break;

				    case 'timeout':
				    	$el
				    		.find('.infinity-scroll-loading')
				    		.html('<div class="b-big">Seem like you have an internet connection problem</div><p>Please try again later</p><p><a href="#" class="back-to-top"><i class="fa fa-long-arrow-up b-big"></i> back to top</a></p>');
				    	break;

				    default:
				    	$el
				    		.find('.infinity-scroll-loading')
				    		.html('<div class="b-big">Internal server error</div><p>Please try again later, if this error persist please contact our team at <a href="mailto:support@busiat.com">support@busiat.com</a></p><p><a href="#" class="back-to-top"><i class="fa fa-long-arrow-up b-big"></i> back to top</a></p>');
				        break;
				}
			},
			error: function (request, textStatus, errorThrown) {

				// Stop loading animation
				animateLoading(false);

		    	$el
		    		.find('.infinity-scroll-loading')
		    		.html('<div class="b-big">Internal server error</div><p>Please try again later, if this error persist please contact our team at <a href="mailto:support@busiat.com">support@busiat.com</a></p><p><a href="#" class="back-to-top"><i class="fa fa-long-arrow-up b-big"></i> back to top</a></p>');
			}
		});
	}
}

var animation;
var animateLoading = function( animate ){
	var dot = $('.infinity-scroll-loading .inf-dot').html();
	if (dot == '...') dot = '';
	dot += '.';
	$('.infinity-scroll-loading .inf-dot').html(dot);
	
	if (animate === true){
		animation = window.setTimeout(function(){
			animateLoading(true);
		}, 500);
	} else{
		window.clearTimeout(animation);
	}
}

var scLoading = false;
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 260) {
    	if (scLoading === false){
    		scLoading = true;
    			loadNext();
	    }
    }
});
