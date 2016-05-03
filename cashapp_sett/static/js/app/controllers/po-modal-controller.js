(function (angular) {
    function POModalCtrl (
        $scope,
        $translate,
        $uibModalInstance,
        $CurrencyService,
        $q,
        $ToastrService,
        $POTypesService,
        $stateParams,
        $POService,
        $validator,
        $CommonService
    ) {
        $scope.currencies = [];
        $scope.types = [];
        $scope.po = {};
        $scope.isEditMode = false;

        /**
         * Callback to execute on create error
         * @param response
         */
        function onPOError(response) {
            if (response.data && response.data instanceof Object && !Array.isArray(response.data)) {
                $validator.showErrors(response.data);
            } else {
                $ToastrService.messageFromResponse(response)
            }
        }

        /**
         * Callback to execute on create success
         * @param response
         */
        function onPOSuccess(response) {
            $POService.tempPO(response.data.po);
            $uibModalInstance.close();
        }

        /**
         * Manage Payment object
         */
        $scope.managePO = function () {
            var result = $validator.validateForm($scope.POform);
            if (result.status) {
                var po = $CommonService.createFlatObjectCopy($scope.po);
                $POService[$stateParams.action + 'PO'](po)
                    .then(onPOSuccess)
                    .catch(onPOError)
            }
        };

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

            if ($stateParams.action == 'edit') {
                $scope.isEditMode = true;
            }

            if ($stateParams.guid) {
                $POService
                    .getPO($stateParams.guid)
                        .then(initPO)
                        .catch(onError)
            } else {
                $scope.po = {
                    currency: $scope.currencies[0],
                    type: $scope.types[0]
                }

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

    POModalCtrl.$inject = [
        '$scope',
        '$translate',
        '$uibModalInstance',
        '$CurrencyService',
        '$q',
        '$ToastrService',
        '$POTypesService',
        '$stateParams',
        '$POService',
        '$validator',
        '$CommonService',
    ];

    angular
        .module('CashAppSett')
        .controller('po-modal-controller', POModalCtrl)

})(angular);
