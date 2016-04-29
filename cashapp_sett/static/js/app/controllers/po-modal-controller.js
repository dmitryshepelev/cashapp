(function (angular) {
    function POModalCtrl ($scope, $translate, $uibModalInstance, $CurrencyService, $q, $ToastrService, $POTypesService, $stateParams, $POService) {
        $scope.currencies = [];
        $scope.types = [];
        $scope.po = {};
        console.log($uibModalInstance);
        /**
         * Init PO
         * @param response
         */
        function initPO (response) {
            $scope.po = response.data.po;
        }

        /**
         * Init $scope with default values
         */
        function initScope (data) {
            $scope.currencies = data[0].data.currencies;
            $scope.types = data[1].data.types;
            
            if ($stateParams.guid) {
                $POService
                    .getPO($stateParams.guid)
                        .then(initPO)
                        .catch(onError)
            }
        }

        /**
         * Callback to execute when error is occupied
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }

        /**
         * Load initial data
         */
        function loadInitialData() {
            $q
                .all([
                    $CurrencyService.getAll(),
                    $POTypesService.getAll()
                ])
                .then(initScope)
                .catch(onError)
        }

        loadInitialData()
    }

    POModalCtrl.$inject = ['$scope', '$translate', '$uibModalInstance', '$CurrencyService', '$q', '$ToastrService', '$POTypesService', '$stateParams', '$POService'];

    angular
        .module('CashAppSett')
        .controller('po-modal-controller', POModalCtrl)

})(angular);
