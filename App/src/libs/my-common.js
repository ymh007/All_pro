(function (window, angular) {
    'use strict';

    var $configureProvider = [function () {

        var innnerConfig = {
            common: {
            }
        },
            extend = function (to, from, isDeep) {
                for (var key in from) {
                    if (!from.hasOwnProperty(key)) {
                        continue;
                    }
                    if (!isDeep || !(angular.isArray(from[key]) || angular.isObject(from[key]))) {
                        to[key] = from[key];
                        continue;
                    }
                    if (!to[key] && angular.isArray(from[key])) {
                        to[key] = [];
                    }
                    if (!to[key] && angular.isObject(from[key])) {
                        to[key] = {};
                    }
                    extend(to[key], from[key], isDeep);
                }
                return to;
            },
            deepExtend = function (dst) {
                for (var i = 0; i < arguments.length; i++) {
                    if (i === 0)
                        continue;

                    var src = arguments[i];
                    if (src) {
                        extend(dst, src, true);
                    }
                }
                return dst;
            };

        this.configure = function (config) {
            if (angular.isString(config)) {
                config = angular.fromJson(config);
            }
            deepExtend(innnerConfig, config);
        };

        this.$get = [function () {
            var service = {};
            service.getConfig = function () {
                if (arguments.length === 0) {
                    return innnerConfig;
                }

                var dst;
                var name;

                if (arguments.length == 1) {
                    dst = {};
                    name = arguments[0];
                } else {
                    dst = arguments[0];
                    name = arguments[1];
                }

                deepExtend(dst, innnerConfig.common);
                return deepExtend(dst, innnerConfig[name]);
            };
            service.deepExtend = deepExtend;

            return service;
        }];
    }],
    angularModule = angular.module('common-config', []); 
    angularModule.provider('configure', $configureProvider); 
	 
})(window, window.angular);


(function (window, angular) {
    'use strict';  
	//loading 
	var module = angular.module('pageLoading', []);
    module.directive('Loading', function(){
		return {
            restrict: 'A',
            scope: { configs: '=', wfLoading: '=' },
            template: '<div ng-if="wfLoading" class="loading">' +
            '<div class="loading-img">' +
            '<div class="loading-img-content"></div>' +
            '<p>正在努力加载中，请稍后<span class="dotting"></span></p>' +
            '</div>' +
            '</div>',
            replace: true
        };
		
	});
	module.service('wfWaiting', function () {
        var divDom = document.createElement('div');
        divDom.setAttribute('ng-if', 'wfLoading');
        divDom.setAttribute('class', 'loading');
        divDom.innerHTML =
            '<div class="waiting-container loading-img">' +
            '     <div class="loading-img-content"></div>' +
            '     <p>正在处理，请稍候<span class="dotting"></span></p>' +
            '</div>';
        var body = document.getElementsByTagName('body').item(0);
        var waiting = false;
        this.show = function () {
            if (!waiting) {
                body.appendChild(divDom);
                waiting = true;
            }
        };
        this.hide = function () {
            if (waiting) {
                body.removeChild(divDom);
                waiting = false;
            }
        };
    });

     
})(window, window.angular);


(function(window, angular) {
    'use strict';


    $wfDigitalDirective.$inject = ['$parse'];

    function $wfDigitalDirective($parse) {
        var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
        var $defaultOpts = { min: undefined, max: undefined, precision: undefined, onblur: undefined, onfocus: undefined };
        return {
            restrict: 'A',
            template: '<input type="text" class="input-type" />',
            //scope: { opts: '=opts' },
            require: 'ngModel',
            replace: true,
            link: function(scope, element, attrs, ngModelCtrl) {
                if (attrs.opts)
                    scope.opts = scope.$eval(attrs.opts) || scope.$parent.$eval(attrs.opts);
                var $opts = angular.copy($defaultOpts);
                scope.opts = $opts = angular.extend($opts, scope.opts);
                //event.clipboardData.getData('text')
                var minVal, maxVal, precision, lastValidViewValue;
                var isDefined = angular.isDefined;
                var isUndefined = angular.isUndefined;
                var isNumber = angular.isNumber;


                function round(num) {
                    var d = Math.pow(10, precision);
                    return Math.round(num * d) / d;
                }


                function formatPrecision(value) {
                    return parseFloat(value).toFixed(precision);
                }

                function isPrecisionValid() {
                    return !isNaN(precision) && precision > -1;
                }

                function isValueValid(value) {
                    return angular.isNumber(value) && !isNaN(value);
                }

                function updateValuePrecision() {
                    var modelValue = ngModelCtrl.$modelValue;

                    if (isValueValid(modelValue) && isPrecisionValid()) {
                        ngModelCtrl.$modelValue = round(modelValue);
                        $parse(attrs.ngModel).assign(scope, ngModelCtrl.$modelValue);
                        changeViewValue(formatPrecision(modelValue));

                        // Save the rounded view value
                        lastValidViewValue = ngModelCtrl.$viewValue;
                    }
                }

                function changeViewValue(value) {
                    ngModelCtrl.$viewValue = value;
                    //ngModelCtrl.$commitViewValue();
                    ngModelCtrl.$render();
                }


                ngModelCtrl.$parsers.push(function(value) {
                    if (ngModelCtrl.$isEmpty(value)) {
                        lastValidViewValue = value;
                        return null;
                    }

                    // Handle leading decimal point, like ".5"
                    if (value.indexOf('.') === 0) {
                        value = '0' + value;
                    }

                    // Allow "-" inputs only when min < 0
                    if (value.indexOf('-') === 0) {
                        if (minVal >= 0) {
                            changeViewValue('');
                            return null;
                        } else if (value === '-' || value === '-.') {
                            return null;
                        }
                    }

                    if (precision === 0 && value.indexOf('.') > 0) {
                        changeViewValue(lastValidViewValue);
                        return lastValidViewValue;
                    }

                    if (NUMBER_REGEXP.test(value)) {
                        // Save as valid view value if it's a number
                        //if (!(maxVal && value > maxVal) && (maxVal > 10 || !(minVal && value < minVal))) {
                        if (!(maxVal && value > maxVal)) {
                            lastValidViewValue = value;

                            return parseFloat(value);
                        } else {
                            changeViewValue(lastValidViewValue);
                            return lastValidViewValue;
                        }
                    } else {
                        // Render the last valid input in the field
                        changeViewValue(lastValidViewValue);
                        return lastValidViewValue;
                    }
                });


                if ($opts.min) {
                    if (isDefined($opts.min) && !isNumber($opts.min)) {
                        val = parseFloat($opts.min, 10);
                    }
                    minVal = isNumber($opts.min) && !isNaN($opts.min) ? $opts.min : undefined;
                    //ngModelCtrl.$validate();

                } else {
                    minVal = 0;
                }


                // Max validation
                if ($opts.max) {
                    if (isDefined($opts.max) && !isNumber($opts.max)) {
                        val = parseFloat($opts.max, 10);
                    }
                    maxVal = isNumber($opts.max) && !isNaN($opts.max) ? $opts.max : undefined;
                    //ngModelCtrl.$validate();                 
                }

                // Round off (disabled by "-1")
                if ($opts.precision) {
                    precision = parseInt($opts.precision, 10);

                    updateValuePrecision();

                } else {
                    precision = 0;
                }

                ngModelCtrl.$parsers.push(function(value) {
                    if (value) {
                        // Round off value to specified precision
                        value = isPrecisionValid() ? round(value) : value;
                    }
                    return value;
                });

                ngModelCtrl.$formatters.push(function(value) {
                    if (isDefined(value)) {
                        return isPrecisionValid() && isValueValid(value) ?
                            formatPrecision(value) : value;
                    } else {
                        return '';
                    }
                });

                // Auto-format precision on blur
                element.bind('blur', function(e) {
                    //ngModelCtrl.$commitViewValue();

                    if (ngModelCtrl.$viewValue !== '' && ngModelCtrl.$viewValue < minVal)
                        changeViewValue(''); //e.target.focus(); 
                    else
                        updateValuePrecision();

                    if ($opts.onblur) {
                        var valuetoChange = $opts.onblur(ngModelCtrl.$viewValue);
                        changeViewValue(valuetoChange);
                    }
                });
                element.bind('focus', function() {
                    if ($opts.onfocus) {
                        var valuetoChange = $opts.onfocus(ngModelCtrl.$viewValue);
                        changeViewValue(valuetoChange);
                    }
                });
            }
        };
    }

    var module = angular.module('mydigital', []);
    module.directive('myDigital', $wfDigitalDirective);


})(window, window.angular);


(function (window, angular) {
    'use strict'; 
    angular.module('commonControl', [ 
        'common-config',
        'mydigital',
		'pageLoading'
    ]); 
})(window, window.angular);