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
             * Creates copy with flat 'guid's
             * @param data
             */
            createFlatObjectCopy: function (data) {
                var _copy = {};
                angular.copy(data, _copy);
                for (var p in _copy) {
                    if (_copy.hasOwnProperty(p) && typeof _copy[p] === 'object' && _copy[p].hasOwnProperty('guid')) {
                        _copy[p] = _copy[p].guid;
                    }
                }
                return _copy;
            }
        }
    }

    CommonService.$inject = [];

    angular
        .module('CashApp.Service')
        .service('$CommonService', CommonService)

})(angular);

