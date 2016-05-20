(function (angular) {

    function SupplierModalCtrl ($scope, $rootScope, $q, $CommonService, $ToastrService, $uibModalInstance, $stateParams, $validator, $SupplierService) {
        var action = $stateParams.action;
        $scope.isEditMode = action === 'edit';
        
        $scope.supplier = {};

        /**
         * Callback to execute on manage error
         */
        function onManageSupplierError(response) {
            try {
                $validator.validateFormResponse(response);
            } catch (e) {
                $ToastrService.messageFromResponse(response)
            }
        }

        /**
         * Callback to execute on manage success
         */
        function onManageSupplierSuccess(response) {
            var supplier = response.data.supplier;
            $rootScope.$broadcast('Supplier.' + action + 'Success', supplier);
            $uibModalInstance.close();
        }

        /**
         * Manage supplier
         */
        $scope.manageSupplier = function () {
            var action = $stateParams.action;

            var validationResult = $validator.validateForm($scope.supplierForm);
            if (validationResult.status) {
                
                var supplier = $CommonService.createFlatCopy($scope.supplier);

                $SupplierService[action](supplier)
                    .then(onManageSupplierSuccess)
                    .catch(onManageSupplierError)
            }
        };

        /**
         * Error callback
         * @param response
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }

        /**
         * Init supplier
         * @param response
         */
        function initSupplier(response) {
            $scope.supplier = response.data.supplier;
        }

        /**
         * Init $scope with default values
         */
        function initScope(response) {

            if ($stateParams.guid) {
                $SupplierService
                    .getSupplier($stateParams.guid)
                        .then(initSupplier)
                        .catch(onError)
            }
        }

        /**
         * Loads initial data values
         */
        function loadInitialData() {
            $q
                .all([

                ])
                .then(initScope)
                .catch(onError)
        }
        
        loadInitialData();
    }

    SupplierModalCtrl.$inject = [
        '$scope',
        '$rootScope',
        '$q',
        '$CommonService',
        '$ToastrService',
        '$uibModalInstance',
        '$stateParams',
        '$validator',
        '$SupplierService'
    ];

    angular
        .module('CashAppMy')
        .controller('supplier-modal-controller', SupplierModalCtrl)

})(angular);
