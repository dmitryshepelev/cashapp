(function (angular) {

    function CommonService() {
        return {
            /**
             * Extends parent
             * @param base
             * @param child
             */
            extendBase: function (base, child) {
                var F = function () {};
                F.prototype = base.prototype;
                child.prototype = new F();
                child.prototype.constructor = child;
                child.super = base.prototype;
            },
            /**
             * Build query string from object
             */
            encodeQueryData: function (data) {
                if (typeof data !== "object" || Array.isArray(data) || data === null) {
                    throw new TypeError('The parameter \'data\' is not an object')

                } else {
                    var strings = [];

                    for (var d in data) {
                        if (data.hasOwnProperty(d) && data[d] !== '') {
                            strings.push(d + '=' + data[d])
                        }
                    }

                    return strings.join('&');
                }
            },
            /**
             * Creates flat copy of object
             * @param obj
             * @returns {{}}
             */
            createFlatCopy: function (obj) {
                var copy = {};
                angular.copy(obj, copy);
                for (var prop in copy) {
                    if (copy.hasOwnProperty(prop) && typeof copy[prop] === 'object' && copy[prop].hasOwnProperty('guid')) {
                        copy[prop + '_id'] = copy[prop].guid;
                        delete copy[prop];
                    }
                }
                return copy;
            }
        }
    }

    CommonService.$inject = [];

    angular
        .module('CashApp.Service')
        .service('$CommonService', CommonService)

})(angular);

