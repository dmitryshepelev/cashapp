(function (angular) {
    angular.module('CashApp')

        // Service to validate elements
        .factory('$validator', function () {
            return {
                validateForm: function (form) {
                    // define validation status
                    var status = true;
                    // define errors elements
                    var elements = [];

                    // check each group of error
                    angular.forEach(form.$error, function (value, key) {
                        // select group of errors
                        var errors = form.$error[key];

                        // validate each error in group
                        angular.forEach(errors, function (error) {
                            // change validation status
                            status = false;

                            // element name
                            var elName = error.$name;
                            // jqLite element by name
                            var $element = angular.element(document.querySelector('[name=' + elName + ']'));
                            elements.push($element);

                            // define parent node selector
                            var parentSelector = '.form-group';
                            // define error class
                            var errorType = key === 'required' ? 'warning' : 'danger';
                            var errorParentClass = 'has-' + errorType;
                            var errorElementClass = 'form-control-' + errorType;

                            // add styles
                            $element.addClass(errorElementClass);
                            $element.parent(parentSelector).addClass(errorParentClass);

                            // set clearance handler
                            if (typeof $element.oninput !== 'function') {
                                $element.on('input', function () {
                                    var $el = angular.element(this);
                                    $el.parent(parentSelector).removeClass(errorParentClass);
                                    $el.removeClass(errorElementClass);
                                    // make handler to be executed once
                                    $el.oninput = undefined;
                                })
                            }
                        });
                    });

                    // set focus on the first error element
                    if (elements.length !== 0) {
                        elements[0][0]().focus();
                    }

                    return { status: status, elements: elements }
                }
            }
        });
})(angular);