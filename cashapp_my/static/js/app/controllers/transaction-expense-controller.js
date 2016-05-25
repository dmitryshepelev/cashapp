(function (angular) {

    function TransactionExpenseCtrl (
        $scope,
        $rootScope,
        $q,
        $CommonService,
        $POService,
        $TransactionService,
        $ToastrService,
        $stateParams,
        $validator,
        $SearchService
    ) {
        var poGuid = $stateParams.guid || '';

        $scope.isPOPredefined = poGuid ? true : false;
        $scope.pos = [];
        $scope.transaction = {
            date: new Date(),
            expense_items: []
        };

        /**
         * Callback to execute on success creation
         */
        function onCreateTransactionSuccess(response) {
            var transaction = response.data.transaction;
            $rootScope.$broadcast('Transaction.createSuccess', transaction);
            $uibModalInstance.close();
        }

        /**
         * Create transaction
         */
        $scope.createTransaction = function () {
            var result = $validator.validateForm($scope.transactionForm);
            if (result.status) {
                var transaction = $CommonService.createFlatCopy($scope.transaction);
                transaction.date = transaction.date.getTime();
                
                $TransactionService.createIncomeTransaction(transaction)
                    .then(onCreateTransactionSuccess)
                    .catch(onError)
            }
        };

        /**
         * Load Suppliers to autocomplete
         * @param value
         */
        $scope.loadSuppliers = function (value) {
            return $SearchService
                .search('supplier', value)
                    .then(function (response) {
                        return response.data.instances;
                    })
                    .catch(onError);
        };
        
        /**
         * Load Expense items to autocomplete
         * @param value
         */
        $scope.loadExpenseItems = function (value) {
            return $SearchService
                .search('expenseitem', value)
                    .then(function (response) {
                        return response.data.instances;
                    })
                    .catch(onError);
        };

        /**
         * Callback to execute on newExpenseItem typeahead is selected
         * @param $item
         * @param $model
         * @param $label
         * @param $event
         */
        $scope.onNewExpenseItemSelect = function ($item, $model, $label, $event) {
            $scope.transaction.expense_items.push($item);
        }
        
        /**
         * Error callback
         * @param response
         */
        function onError (response) {
            $ToastrService.messageFromResponse(response);
        }

        /**
         * Function to init $scope
         */
        function initScope (data) {
            /**
             * Init POs model
             * @param pos
             */
            function initPOs(pos) {
                if (Array.isArray(pos)) {
                    $scope.pos = pos;
                } else {
                    $scope.pos.push(pos)
                }
            }

            data.forEach(function (item) {
                if (item.data.hasOwnProperty('po')) {
                    initPOs(item.data.po)
                }
            });

            $scope.transaction.payment_object = $scope.pos[0];
        }

        function loadInitialData () {
            $q
                .all([
                    poGuid ? $POService.getPO(poGuid) : $POService.getAll()
                ])
                .then(initScope)
                .catch(onError);
        }

        loadInitialData();
    }

    TransactionExpenseCtrl.$inject = [
        '$scope',
        '$rootScope',
        '$q',
        '$CommonService',
        '$POService',
        '$TransactionService',
        '$ToastrService',
        '$stateParams',
        '$validator',
        '$SearchService'
    ];

    angular
        .module('CashAppMy')
        .controller('transaction-expense-controller', TransactionExpenseCtrl)

})(angular);
