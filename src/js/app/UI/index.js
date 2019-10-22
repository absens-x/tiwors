import initModal from './Modal.js';
import initCarousel from './Carousel.js';
import initAccordion from './Accordion.js';
import initToggle from './Toggle.js';


{
    // INIT MODALS
    initModal('.js--modal--menu', '.modal--menu');
    initModal('.js--modal--login', '.modal--login');
    initModal('.js--modal-city-list', '.modal--cities');
    initModal('.js--modal-sign-up', '.modal--sign-up', '.modal--login');
    initModal('.js--modal-org-info', '.modal--org-info');
    initModal('.js--modal-org-reviews', '.modal--org-reviews');  
}



{
    // INIT CAROUSELS
    initCarousel();  
}
