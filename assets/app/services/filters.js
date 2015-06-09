angular.module('humpback.filters'
, [
  
  ]
)

/*
 * @description
 * capitalizes first letter
 * @usage 
 * ex. {{ 'hello world' | capitalize }}
 * @return 
 * ex. 'Hello world'
*/
.filter('capitalize', function() {
  return function(input, scope) {
 	  if (input!=null && typeof input !== 'undefined'){
		  input = input.toLowerCase();
      return input.substring(0,1).toUpperCase()+input.substring(1);
    }
	}
})

/*
 * @description
 * Takes a number and converts it to a percentage before adding a precentage symbol.
 * @usage
 * ex. {{ 0.03 | percentage }}
 * @return
 * ex. 3%
*/
.filter('percentage', function ($window) {
	return function (input, decimals, suffix) {
		decimals = angular.isNumber( decimals ) ? decimals : 3;
 		suffix = suffix || '%';
 		if ( $window.isNaN( input ) ) {
 			return '';
 		}
 		return Math.round( input * Math.pow( 10, decimals + 2 ) ) / Math.pow( 10, decimals ) + suffix;
 	}
})

/*
 * @description
 * Stands for Instant IF statement, creates an if else statement
 * @usage
 * ex. {{ happy | iif: 'Happy' : 'Sad' }}
 * @return
 * ex. if happy print "Happy" else print "Sad"
*/
.filter('iif', function () {
   return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
   };
})

/*
 * @description
 * TODO write description
*/
.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])

/*
 * @description
 * Trust html to be rendered via a variable
 * @usage
 * ex. {{ '<div class="trust-me">Trust Me</div>' | sanitize }} 
 * @return
 * ex. <div class="trust-me">Trust Me</div>
*/
.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}])



.factory('focus', function($timeout, $window) {
  return function(id) {
    // timeout makes sure that it is invoked after any other event has been triggered.
    // e.g. click events that need to run before the focus or
    // inputs elements that are in a disabled state but are enabled when those events
    // are triggered.
    $timeout(function() {
      var element = $window.document.getElementById(id);
      if(element)
        element.focus();
    });
  };
})

.directive('eventFocus', function(focus) {
  return function(scope, elem, attr) {
    elem.on(attr.eventFocus, function() {
      focus(attr.eventFocusId);
    });

    // Removes bound events in the element itself
    // when the scope is destroyed
    scope.$on('$destroy', function() {
      elem.off(attr.eventFocus);
    });
  };
})
;