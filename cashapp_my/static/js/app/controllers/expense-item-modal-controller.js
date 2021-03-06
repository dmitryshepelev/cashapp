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
            $rootScope.$broadcast('ExpenseItem.' + action + 'Success', expenseItem);
            $uibModalInstance.close();
        }

        /**
         * Manage Expense Item
         */
        $scope.manageExpenseItem = function () {
            var validationResult = $validator.validateForm($scope.expenseItemForm);
            if (validationResult.status) {
                var expenseItem = $CommonService.createFlatCopy($scope.expenseItem);
                
                $ExpenseItemService[action](expenseItem)
                    .then(onManageExpenseItemSuccess)
                    .catch(onManageExpenseItemError);
            }
        };
        
        /**
         * Load Categories to autocomplete
         * @param value
         */
        $scope.loadCategories = function (value) {
            return $SearchService
                .search('category', value)
                    .then(function (response) {
                        return response.data.instances;
                    })
                    .catch(onError);
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
         * Init expense item
         * @param response
         */
        function initExpenseItem(response) {
            $scope.expenseItem = response.data.expense_item
        }

        /**
         * Init $scope with default values
         */
        function initScope(response) {
            initCurrencies(response[0].data.currencies);
            initMeasures(response[1].data.measures);
            
            if ($stateParams.guid) {
                $ExpenseItemService
                    .getExpenseItem($stateParams.guid)
                        .then(initExpenseItem)
                        .catch(onError)
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

