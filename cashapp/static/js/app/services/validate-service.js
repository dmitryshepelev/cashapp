(function (angular) {
    /**
     * Validator service
     * @returns {{validateForm: Function, showErrors: Function}}
     * @constructor
     */
    function Validator() {
        // define parent node selector
        var _parentSelector = '.form-group';
        var _errorKeys = {
            required: {
                value: 'required',
                text: 'Please fill out this field'
            },
            email: {
                value: 'email',
                text: 'Email is incorrect'
            }
        };

        /**
         * Set clearance handler on 'oninput' event
         * @param element
         * @param cssClasses
         */
        function _setClearanceHandler (element, cssClasses) {
            if (typeof element.oninput !== 'function') {
                element.on('input', function () {
                    var $el = angular.element(this);

                    // remove classes
                    _removeError($el, cssClasses);

                    // make handler to be executed once
                    $el.oninput = undefined;
                })
            }
        }

        /**
         * Show error
         * @param element
         * @param cssClasses
         * @param text
         * @private
         */
        function _showError (element, cssClasses, text) {
            element.addClass(cssClasses.errorElementClass);
            element.attr('title', text);
            element.parent(_parentSelector).addClass(cssClasses.errorParentClass);
        }

        /**
         * Remove error
         * @param element
         * @param cssClasses
         * @private
         */
        function _removeError (element, cssClasses) {
            element.parent(_parentSelector).removeClass(cssClasses.errorParentClass);
            element.removeAttr('title');
            element.removeClass(cssClasses.errorElementClass);
        }

        /**
         * Resolve css classes of invalid element
         * @param key defines error type. {required|}
         * @returns {{errorParentClass: string, errorElementClass: string}}
         * @private
         */
        function _resolveCssClasses (key) {
            var errorType = key === _errorKeys.required.value ? 'warning' : 'danger';
            return {
                errorParentClass: 'has-' + errorType,
                errorElementClass: 'form-control-' + errorType
            }
        }

        /**
         * Set focus to the element
         * @param data JQLite element or Array of elements
         * @private
         */
        function _setFocus (data) {
            var element = Array.isArray(data) ? data[0] : data;
            element[0].focus();
        }

        /**
         * Resolve text message by key
         * @param key error key
         * @private
         */
        function _resolveTextByKey (key) {
            return _errorKeys[key] ? _errorKeys[key].text : '';
        }

        return {
            /**
             * Validate form fields
             * @param form angular form
             * @returns {{status: boolean, elements: Array}}
             */
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

                        // define error class
                        var cssClasses = _resolveCssClasses(key);

                        // add styles
                        _showError($element, cssClasses, _resolveTextByKey(key));

                        // set clearance handler
                        _setClearanceHandler($element, cssClasses);
                    });
                });

                // set focus on the first error element
                if (elements.length !== 0) {
                    _setFocus(elements[0]);
                }

                return { status: status, elements: elements }
            },

            /**
             * Show errors
             * @param errors is the object where 'key' is the field name and 'value' is an Array of errors text
             */
            showErrors: function (errors) {
                var i = 0;
                angular.forEach(errors, function (value, key) {
                    var $element = angular.element(document.querySelector('[name=' + key + ']'));

                    if ($element.length > 0) {
                        var cssClasses = _resolveCssClasses();
                        // add styles
                        _showError($element, cssClasses, value[0]);
                        // set clearance handler
                        _setClearanceHandler($element, cssClasses);

                        if (i++ === 0) {
                            _setFocus($element)
                        }
                    }
                })
            }
        }
    }

    angular
        .module('CashApp.Service')
        .factory('$validator', Validator)

})(angular);