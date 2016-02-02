(function (angular) {

    function POWidgetCtrl ($scope, $POService, $ToastrService) {
        $scope.availablePO = [];
        $scope.currentPO = {};


        /**
         * Success callback
         * @param response
         */
        function onGetAllPOSuccess(response) {
            $scope.availablePO = response.data.po;

            $scope.currentPO = response.data.po[0]
        }

        /**
         * Error callback
         * @param response
         */
        function onError (response) {
            $ToastrService.messageFromResponse(response);
        }

        $POService.getAll()
            .then(onGetAllPOSuccess)
            .catch(onError)
    }

    POWidgetCtrl.$inject = ['$scope', '$POService', '$ToastrService'];

    angular
        .module('CashAppMy')
        .controller('po-widget-controller', POWidgetCtrl)

})(angular);