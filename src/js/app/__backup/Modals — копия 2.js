import Component from './Component';


class Modal extends Component {
    
    constructor(modalName, modalWrapName, options) {
        
        super();
		
		this.modalWrap = document.querySelector(modalWrapName || '.modals__wrap');
		this.modal = this.modalWrap.querySelector(modalName);

        this.hasOptions = Object.keys(arguments[2]).length > 0 ? true : false;
 
        this.modalName = modalName;

        if(this.hasOptions) {
            this.modalLogo = this.modalWrap.querySelector( options.logo );
            this.modalCloseBtn = this.modalWrap.querySelector( options.closeBtn );
            this.modalInfoIcon = this.modalWrap.querySelector( options.modalInfoIcon );
        }

    }

    // ----------------------------------------------------------------------------------

    open() {

    	if(this.modal === null) {
            console.log('Modal is not found')
            return
        };

        let [self, modalBGClass] = [ this, this.getModalBGName() ];

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
                if(this.modalInfoIcon) this.modalInfoIcon.classList.add('on')
            }
    	}
    	else {
    		this.modalWrap.addEventListener(whichAnimationEvent(), openHandler.call(this));
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

        function openHandler() {

            let self = this;
            self.modal.classList.add('on','zoomIn');
            this.modalWrap.classList.remove('fadeIn');
            if(self.hasOptions) {
                setTimeout(function(){
                    self.modalLogo.classList.add('on');
                    self.modalCloseBtn.classList.add('on');
                    if(self.modalInfoIcon) self.modalInfoIcon.classList.add('on')

                }, 300)
            }
            
        }

    }

    // ----------------------------------------------------------------------------------

    close() {

    	let [self, modalBGClass] = [ this, this.getModalBGName() ];

        // this.modalWrap.addEventListener(whichAnimationEvent(), closeHandler)
        // this.modalWrap.classList.add('fadeOut')
        
        function closeHandler() {
            self.modalWrap.classList.remove('on',  'fadeOut', modalBGClass);
            self.modal.classList.remove('on', 'zoomIn');

            if(self.hasOptions) {
                self.modalLogo.classList.remove('on');
                self.modalCloseBtn.classList.remove('on');
                if(self.modalInfoIcon) self.modalInfoIcon.classList.remove('on');
            }
            // self.modalWrap.removeEventListener(whichAnimationEvent(), closeHandler)
        }
        closeHandler()
    }

    // ----------------------------------------------------------------------------------

    getCurrentModalName() {
    	return this.modalName;
    }

    // ----------------------------------------------------------------------------------

    getModalBGName() {
    	return `modals__bg--${this.getCurrentModalName().replace('.modal--', '')}`
    }
}


init('.js--modal--menu', '.modal--menu');
init('.js--modal--login', '.modal--login');
init('.js--modal-city-list', '.modal--cities');
init('.js--modal-sign-up', '.modal--sign-up', '.modal--login');






function init(eventElementName, modalName, closeModalName) {
    let options = {
        logo: '.logo',
        closeBtn: '.btn--modal-close',
        modalInfoIcon: '.modals__info-bg-icon'
    }
	let modal = new Modal(modalName, null, options);
	let target = document.querySelectorAll(eventElementName);

	for(let i = 0; i < target.length; i++) {
		target[i].addEventListener('click', function(e) {
    		e.preventDefault();
            if(closeModalName) {
                new Modal(closeModalName, null, options).close();
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