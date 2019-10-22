export default class Component {
    
    constructor() {
    	
    }

    addClass(target, classList) {
        target.classList.add(classList)
    }

    removeClass(target, classList) {
        target.classList.remove(classList)
    }

    hasClass(elem, className) {
        if(elem.classList.contains(className)) {
            return true
        } 
            
        return false
    }

    createElement(element, classList, attributes) {
    	let elem = document.createElement(element)
        
        if(classList !== null) {
            elem.classList.add(classList)
        }

        if(attributes !== null) {
            for(let key in attributes) {
                elem.setAttribute(key, attributes[key])
            }
        }
        return elem
    }


}
