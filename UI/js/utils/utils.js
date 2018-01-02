// Some useful functions


module.exports = {
	// Returns sibling next to elem passed in.
	next(elem) {
		do {
			elem = elem.nextSibling;
		} while (elem && elem.nodeType !== 1);
		return elem;
	},

	//Checks if the passed in element has the passed in class
	hasClass(element, cls) {
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	},

	//Checks whether the element passed in is invisible to the DOM
	isHidden(el) {
		var style = window.getComputedStyle(el);
		return (style.display === 'none')
	},

	//returns where in the parent an element is.
	getNodeIndex (element) {
	  return Array.from(element.parentNode.childNodes).indexOf(element);
	},

	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	// This is to improve performance bottlenecks on things like resize events.
	debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	},

	//simulate event of type
eventFire(el, etype){
	  if (el.fireEvent) {
	    el.fireEvent('on' + etype);
	  } else {
	    var evObj = document.createEvent('Events');
	    evObj.initEvent(etype, true, false);
	    el.dispatchEvent(evObj);
	  }
	},

	// fade out

fadeOut(el){
	  el.style.opacity = 1;

	  (function fade() {
	    if ((el.style.opacity -= .05) < 0) {
	      el.style.display = "none";
	    } else {
	      requestAnimationFrame(fade);
	    }
	  })();
	},

	// fade in

	fadeIn(el, display){
	  el.style.opacity = 0;
	  el.style.display = display || "block";

	  (function fade() {
	    var val = parseFloat(el.style.opacity);
	    if (!((val += .05) > 1)) {
	      el.style.opacity = val;
	      requestAnimationFrame(fade);
	    }
	  })();
	}
}
