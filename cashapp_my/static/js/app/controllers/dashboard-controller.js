(function (angular) {

    function DashboardCtrl ($scope, $ToastrService, $ModalService, $PORegisterService) {

        /**
         * Error callback
         * @param response
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }
    }

    DashboardCtrl.$inject = ['$scope', '$ToastrService', '$ModalService', '$PORegisterService'];

    angular
        .module('CashAppMy')
        .controller('dashboard-controller', DashboardCtrl)

})(angular);
