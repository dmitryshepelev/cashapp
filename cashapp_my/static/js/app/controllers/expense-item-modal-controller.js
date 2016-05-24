(function (angular) {

    function ExpenseItemModalCtrl (
        $scope,
        $rootScope,
        $q,
        $CommonService,
        $ToastrService,
        $uibModalInstance,
        $stateParams,
        $validator,
        $CurrencyService,
        $MeasureService,
        $SearchService,
        $ExpenseItemService
    ) {
        var action = $stateParams.action;
        $scope.isEditMode = action === 'edit';

        $scope.currencies = [];
        $scope.measures = [];
        $scope.categories = [];
        $scope.expenseItem = {};

        /**
         * Callback to execute on manage error
         */
        function onManageExpenseItemError(response) {
            try {
                $validator.validateFormResponse(response);
            } catch (e) {
                $ToastrService.messageFromResponse(response);
            }
        }

        /**
         * Callback to execute on manage success
         */
        function onManageExpenseItemSuccess(response) {
            var expenseItem = response.data.expense_item;
            $rootScope.$broadcast('ExpenesItem.' + action + 'Success', expenseItem);
            $uibModalInstance.close();
        }

        /**
         * Manage Expense Item
         */
        $scope.manageExpenseItem = function () {
            var validationResult = $validator.validateForm($scope.expenseItemForm);
            if (validationResult.status) {
                console.log($scope.expenseItem);
                var expenseItem = $CommonService.createFlatCopy($scope.expenseItem);
                
                $ExpenseItemService[action](expenseItem)
                    .then(onManageExpenseItemSuccess)
                    .catch(onManageExpenseItemError);
            }
        };

        /**
         * Load data for typeahead
         * @param type obj to to load
         * @param value
         * @returns {*}
         */
        function loadTypeaheadData(type, value) {
            return $SearchService
                .search(type, value)
                    .then(function (response) {
                        return response.data.instances;
                    })
                    .catch(onError);
        }

        /**
         * Load Suppliers to autocomplete
         * @param value
         */
        $scope.loadSuppliers = function (value) {
            return loadTypeaheadData('supplier', value);
        };
        
        /**
         * Load Categories to autocomplete
         * @param value
         */
        $scope.loadCategories = function (value) {
            return loadTypeaheadData('category', value);
        };

        /**
         * Error callback
         * @param response
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }

        /**
         * Init currencies
         * @param currencies
         */
        function initCurrencies(currencies) {
            $scope.currencies = currencies || [];
        }

        /**
         * Init measures
         * @param measures
         */
        function initMeasures(measures) {
            $scope.measures = measures || [];
        }

        /**
         * Init $scope with default values
         */
        function initScope(response) {
            initCurrencies(response[0].data.currencies);
            initMeasures(response[1].data.measures);
            
            if ($stateParams.guid) {
                // $SupplierService
                //     .getSupplier($stateParams.guid)
                //         .then(initSupplier)
                //         .catch(onError)
            } else {
                $scope.expenseItem = {
                    currency: $scope.currencies[0],
                    measure: $scope.measures[0]
                }
            }
        }

        /**
         * Loads initial data values
         */
        function loadInitialData() {
            $q
                .all([
                    $CurrencyService.getAll(),
                    $MeasureService.getAll()
                ])
                .then(initScope)
                .catch(onError)
        }

        loadInitialData();
    }

    ExpenseItemModalCtrl.$inject = [
        '$scope',
        '$rootScope',
        '$q',
        '$CommonService',
        '$ToastrService',
        '$uibModalInstance',
        '$stateParams',
        '$validator',
        '$CurrencyService',
        '$MeasureService',
        '$SearchService',
        '$ExpenseItemService'
    ];

    angular
        .module('CashAppMy')
        .controller('expense-item-modal-controller', ExpenseItemModalCtrl)

})(angular);

