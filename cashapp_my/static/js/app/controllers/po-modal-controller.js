(function (angular) {
    function POModalCtrl ($scope, $rootScope, $translate, $uibModalInstance, $CurrencyService, $q, $ToastrService, $POTypesService, $stateParams, $POService, $validator, $CommonService) {
        $scope.currencies = [];
        $scope.types = [];
        $scope.po = {};

        var action = $stateParams.action;
        $scope.isEditMode = action === 'edit';
        
        /**
         * Callback to execute on manage error
         */
        function onManagePOError(response) {
            try {
                $validator.validateFormResponse(response);
            } catch (e) {
                $ToastrService.messageFromResponse(response)
            }
        }

        /**
         * Callback to execute on manage success 
         */
        function onManagePOSuccess(response) {
            var po = response.data.po;
            $rootScope.$broadcast('PO.' + action + 'Success', po);
            $uibModalInstance.close();
        }

        /**
         * Manage PO
         */
        $scope.managePO = function () {
            var action = $stateParams.action;

            var validationResult = $validator.validateForm($scope.poForm);
            if (validationResult.status) {
                var po = $CommonService.createFlatCopy($scope.po);
                
                $POService[action](po)
                    .then(onManagePOSuccess)
                    .catch(onManagePOError)
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

    POModalCtrl.$inject = ['$scope', '$rootScope', '$translate', '$uibModalInstance', '$CurrencyService', '$q', '$ToastrService', '$POTypesService', '$stateParams', '$POService', '$validator', '$CommonService'];

    angular
        .module('CashAppMy')
        .controller('po-modal-controller', POModalCtrl)

})(angular);
