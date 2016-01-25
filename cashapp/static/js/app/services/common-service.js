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
            }
        }
    }

    CommonService.$inject = [];

    angular
        .module('CashApp.Service')
        .service('$CommonService', CommonService)

})(angular);

