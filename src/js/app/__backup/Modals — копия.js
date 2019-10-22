import Component from './Component';


class Modal extends Component {
    
    constructor(modalClassName, modalWrapClassName, options, lockModalWrap) {
        
        super();
		
		this.modalWrap = document.querySelector(modalWrapClassName || '.modals__wrap');
		this.modal = this.modalWrap.querySelector(modalClassName);

        this.hasOptions = arguments[2] ? true : false;
        this.lockModalWrap = false || lockModalWrap;
        this.modalClassName = modalClassName;

        if(this.hasOptions) {
            this.modalLogo = this.modalWrap.querySelector( options.logo );
            this.modalCloseBtn = this.modalWrap.querySelector( options.closeBtn );
            this.modalBGIcon = this.modalWrap.querySelector( options.bgIcon );
        }

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

            if(this.hasOptions) {
                this.modalLogo.classList.add('on');
                this.modalCloseBtn.classList.add('on');

                if(this.modalBGIcon) this.modalBGIcon.classList.add('on')
            }
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
            this.modalWrap.classList.remove('fadeIn');
            if(this.hasOptions) {
                setTimeout(function(){
                    self.modalLogo.classList.add('on');
                    self.modalCloseBtn.classList.add('on');
                    if(self.modalBGIcon) self.modalBGIcon.classList.add('on')

                }, 300)
            }
            
        }


    }

    close() {
    	let modalBGClass = this.getModalBGClassName();
        let self = this;

        // ПРОДОЛЖИТЬ
        if(this.lockModalWrap) {
            return
        }
        this.modalWrap.classList.add('fadeOut')

        this.modalWrap.addEventListener(whichAnimationEvent(), handler)
        
        function handler() {
            self.modalWrap.classList.remove('on',  'fadeOut', modalBGClass);
            self.modal.classList.remove('on', 'zoomIn');


            if(self.hasOptions) {
                self.modalLogo.classList.remove('on');
                self.modalCloseBtn.classList.remove('on');
                
                if(self.modalBGIcon) self.modalBGIcon.classList.remove('on');

                self.modalWrap.removeEventListener(whichAnimationEvent(), handler)
            }

        }

   		// this.modalWrap.classList.remove('on', modalBGClass);
    	// this.modal.classList.remove('on', 'zoomIn');

        /*if(this.hasOptions) {
            this.modalLogo.classList.remove('on');
            this.modalCloseBtn.classList.remove('on');
            if(this.modalBGIcon) this.modalBGIcon.classList.remove('on')
        }*/
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
    let options = {
        logo: '.logo',
        closeBtn: '.btn--modal-close',
        bgIcon: '.modals__info-bg-icon'
    }
	let modal = new Modal(modalClassName, null, options);


	let target = document.querySelectorAll(eventElementClassName);
	
	for(let i = 0; i < target.length; i++) {
		target[i].addEventListener('click', function(e) {
    		e.preventDefault();
     
            if(closeModalClassName) {
                // new Modal(closeModalClassName, '.modals__wrap', options).close();
    			new Modal(closeModalClassName, null, options, true).close();
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