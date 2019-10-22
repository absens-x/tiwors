

let carousels = {
	"main" : ".carousel--foodlist",
	"top_rest" : ".carousel--top-restaurants",
    "shares" : ".carousel--shares",
	"org_reviews" : ".carousel--org-reviews",
};
 

!function INIT__Carousels() {


	$(carousels['main']).owlCarousel({
        loop: true,
        autoplay: false,
        // nav:true,
        margin: 25,
        navText: ['&#8249;','&#8250;'],
        responsive:{
            0 :{
                items: 2,
                margin: 8,
            },
            992: {
                items: 6
            }, 
        }
    });

	$(carousels['top_rest']).owlCarousel({
        loop: true,
        autoplay: false,
        // nav:true,
        margin: 25,
        navText: ['&#8249;','&#8250;'],
        responsive:{
            0 :{
                items: 1
            },
            768 :{
                items: 2
            },
            992: {
                items: 3
            }, 
        }
    });

	// --------------------
	
	$(carousels['shares']).owlCarousel({
        loop: true,
        autoplay: false,
        // nav :true,
        dots :true,
        margin: 25,
        navText: ['&#8249;','&#8250;'],
        responsive:{
            0 :{
                items: 1
            },
            768 :{
                items: 3
            },
            992: {
                items: 4
            }, 
        }
    });

    $(carousels['shares']).next('.carousel__ctrl').find('.js--carousel-ctrl').on('click', function(e) {
        var crsl = $(this).closest('.carousel__ctrl').prev('.owl-carousel');
        e.preventDefault();
        if($(this).hasClass('prev')) {
            crsl.trigger('prev.owl.carousel');
        }
        else if($(this).hasClass('next')) {
            crsl.trigger('next.owl.carousel');
        }
    });

    // --------------------
    
    $('.js--carousel-ctrl').on('click', function(e) {
        var crsl = $(this).closest('.carousel__ctrl').next('.owl-carousel');
        e.preventDefault();
        if($(this).hasClass('prev')) {
            crsl.trigger('prev.owl.carousel');
        }
        else if($(this).hasClass('next')) {
            crsl.trigger('next.owl.carousel');
        }
    });

	// --------------------
	/*
    $(carousels['rstr_reviews']).owlCarousel({
        loop: true,
        autoplay: false,
        // nav :true,
        dots :true,
        margin: 25,
        navText: ['&#8249;','&#8250;'],
        responsive:{
            0 :{
                items: 1
            },
            768 :{
                items: 3
            },
            992: {
                items: 3
            }, 
        },
        animateIn:'slideInDown',
        animateOut: 'slideOutUp',
    });*/

    var review_carousel = $(carousels['org_reviews']);

    review_carousel.slick({
        autoplay: true,
        vertical: true,
        slidesToShow: 3,
        arrows: false,
        verticalSwiping: true,
       
    });

    $('.js--carousel-slick').on('click', function() {
  
        if($(this).hasClass('prev')) {
            review_carousel.slick("prev");
        }
        else if($(this).hasClass('next')) {
            review_carousel.slick("next");
        }
        
    });
	

}();







