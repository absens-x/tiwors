import Animation from './core/Animation.js';


class Modal  {
    
    constructor(modalName, modalWrapName, options) {
        
        // super();
		
		this.modalWrap = document.querySelector(modalWrapName || '.modals__wrap');
		this.modal = this.modalWrap.querySelector(modalName);

        this.modalName = modalName;
        this.hasOptions = Object.keys(arguments[2]).length > 0 ? true : false;
 
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

        let [self, modalBGName] = [ this, this.getModalBGName() ];

    	this.modal.addEventListener('click', function(e){
             e.stopPropagation(); 
        });

    	this.modalWrap.classList.add('on', modalBGName, 'fadeIn');

		if( !Animation.getAnimationEvent() ) {
    		this.modalWrap.classList.remove('fadeIn');
    		this.modal.classList.add('on');

            if(this.hasOptions) {
                this._initOtherModalOptions('add')
            }
    	}
    	else {
    		this.modalWrap.addEventListener(Animation.getAnimationEvent(), openHandler.call(this));
    	}

    	this.modalWrap.addEventListener('click', function(){
    		self.close();
    	});

    	window.addEventListener('keyup', function(e) { 
			if(this.modalWrap !== null && ((e.which || e.keyCode) == 27)) {
                self.close();
            }
    	});

        function openHandler() {

            let self = this;
            self.modal.classList.add('on','zoomIn');
            this.modalWrap.classList.remove('fadeIn');
            if(self.hasOptions) {
                setTimeout(function(){
                   self._initOtherModalOptions.call(self, 'add')
                }, 300)
            }
            
        }

    }

     // ----------------------------------------------------------------------------------

    close() {

        let [self, modalBGName] = [ this, this.getModalBGName() ];

        function closeHandler() {
            self.modalWrap.classList.remove('on',  'fadeOut', modalBGName);
            self.modal.classList.remove('on', 'zoomIn');

            if(self.hasOptions) {
                self._initOtherModalOptions.call(self, 'remove')
            }
        }
        closeHandler()
    }

   

    // ----------------------------------------------------------------------------------

    _initOtherModalOptions(method) {
        this.modalLogo.classList[method]('on');
        this.modalCloseBtn.classList[method]('on');
        if(this.modalInfoIcon) this.modalInfoIcon.classList[method]('on')
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










export default function init(eventElementName, modalName, closeModalName) {
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



 