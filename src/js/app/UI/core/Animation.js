import StringHelper from '../../core/StringHelpers.js';


 class Animation {

    // 
    getTransitionEvent() {
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
    getAnimationEvent(name) {
        let t,
            el = document.createElement("fakeelement");

        let animations = {
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
}

export default new Animation();