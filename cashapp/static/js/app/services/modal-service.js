(function (angular) {
    function ModalSrv ($uibModal) {
        var baseUrl = '/uitempl/modal/';
        return {
            /**
             * Open modal
             * @param templateName
             * @param controllerName
             * @param resolve
             * @returns {*|Window}
             */
            open: function (templateName, controllerName, resolve) {
                return $uibModal.open({
                    templateUrl: baseUrl + templateName + '/',
                    controller: controllerName || function () {},
                    resolve: resolve || {}
                })
            }
        }
    }

    ModalSrv.$inject = ['$uibModal'];

    angular
        .module('CashApp.Service')
        .factory('$ModalService', ModalSrv)

})(angular);
