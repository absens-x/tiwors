import Component from './Component';


class Modal extends Component {
    
    constructor(modalClassName, options) {
        super();
		
		this.modalWrap = document.querySelector('.modals__wrap');
		this.modal = this.modalWrap.querySelector(modalClassName);
        
		this.modalLogo = this.modalWrap.querySelector('.logo');
		this.modalCloseBtn = this.modalWrap.querySelector('.btn--modal-close');
		this.modalBGIcon = this.modalWrap.querySelector('.modals__info-bg-icon');
        
        this.modalClassName = modalClassName;
    }

    open() {
    	if(this.modal === null) return;

    	let self = this;
    	let modalBGClass =  this.getModalBGClassName();

    	this.modal.addEventListener('click', function(e){
    		e.stopPropagation();
    	});
    	
    	this.modalWrap.classList.add('on', modalBGClass, 'fadeIn');

		if( !whichAnimationEvent() ) {
    		this.modalWrap.classList.remove('fadeIn');
    		this.modal.classList.add('on');
    		this.modalLogo.classList.add('on');
    		this.modalCloseBtn.classList.add('on');

            if(this.modalBGIcon) this.modalBGIcon.classList.add('on')
    		
    	}

    	else {
    		this.modalWrap.addEventListener(whichAnimationEvent(), handler.call(this));
    	}

    	this.modalWrap.addEventListener('click', function(){
    		self.close();
    	});

    	window.addEventListener('keyup', function(e) {
    		if(this.modalWrap === null) return

			if((e.which || e.keyCode) == 27) {
                self.close();
            }
    	});

        function handler() {
            let self = this;
            self.modal.classList.add('on','zoomIn');
            
            setTimeout(function(){
                self.modalLogo.classList.add('on');
                self.modalCloseBtn.classList.add('on');
                self.modalBGIcon.classList.add('on')

            }, 400)
        }


    }

    close() {
    	let modalBGClass = this.getModalBGClassName();
   		this.modalWrap.classList.remove('on', modalBGClass);
    	this.modal.classList.remove('on', 'zoomIn');
    	this.modalLogo.classList.remove('on');
    	this.modalCloseBtn.classList.remove('on');
    	if(this.modalBGIcon) this.modalBGIcon.classList.remove('on')


    }

    


    getCurrentModalClassName() {
    	return this.modalClassName;
    }

    getModalBGClassName() {
    	return `modals__bg--${this.getCurrentModalClassName().replace('.modal--', '')}`
    }
}





init('.js--modal--menu', '.modal--menu');
init('.js--modal--login', '.modal--login');
init('.js--modal-city-list', '.modal--cities');
init('.js--modal-sign-up', '.modal--sign-up', '.modal--login');




function init(eventElementClassName, modalClassName, closeModalClassName) {
	let modal = new Modal(modalClassName);
	let target = document.querySelectorAll(eventElementClassName);
	
	for(let i = 0; i < target.length; i++) {
		target[i].addEventListener('click', function(e) {
		e.preventDefault();
		console.log(modal)
        if(closeModalClassName) {
			new Modal(closeModalClassName).close();
		}

        modal.open();
		});
	}
	
}


 












// ---------------------------------------------------------------------------------------

!function INIT__FiltersAsModal() {
    let modal = $('.modal-mb--org-filters').find('.modal-mb__wrap');
    let filters = $('.org-filters').clone().removeClass('hidden-sm hidden-xs');
    modal.append(filters)
}();

!function INIT__MenuListAsModal() {

    let modal = $('.modal-mb--menulist').find('.modal-mb__wrap');
    let filters = $('.page--org-item .menu-list').clone().removeClass('hidden-sm hidden-xs');
    modal.append(filters)
}();







// 
function whichTransitionEvent() {
  let t,
      el = document.createElement("fakeelement");

  let transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }

}




// 
function whichAnimationEvent() {
  var t,
      el = document.createElement("fakeelement");

  var animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }

  for (t in animations){
    if (el.style[t] !== undefined){
      return animations[t];
    }
  }


}