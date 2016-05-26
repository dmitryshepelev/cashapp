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
        $SearchService,
        $ExpenseItemService,
        $state
    ) {
        var poGuid = $stateParams.guid || '';

        $scope.newExpenseItem = '';
        $scope.po = {};
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
            $state.go('my.po.details', { guid: $scope.po.guid })
        }

        /**
         * Create transaction
         */
        $scope.createTransaction = function () {
            var result = $validator.validateForm($scope.transactionForm);
            if (result.status) {
                var transaction = $CommonService.createFlatCopy($scope.transaction);
                transaction.date = transaction.date.getTime();

                $TransactionService.createExpenseTransaction(transaction)
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

        function TransactionExpenseItem(expenseItem) {
            this.name = expenseItem.name;
            this.description = expenseItem.description;
            this.category = expenseItem.category.name;
            this.guid = expenseItem.guid;
            this.count = 1;
            this.currency = expenseItem.currency;
            this.price = 0;
            this.measure = expenseItem.measure;
        }
        
        TransactionExpenseItem.prototype = {
            constructor: TransactionExpenseItem,
            
            getSum: function () {
                return this.count * this.price;
            }
        };

        /**
         * Get transaction overall sum
         * @returns {number}
         */
        $scope.getTransactionSum = function () {
            var sum = 0;
            $scope.transaction.expense_items.forEach(function (item) {
                sum += item.getSum();
            });
            return sum || 0;
        };

        $scope.removeTransactionExpenseItem = function (guid) {
            var index = $CommonService.getIndexByField($scope.transaction.expense_items, guid);
            if (index >= 0) {
                $scope.transaction.expense_items.splice(index, 1);
            } else {
                $ToastrService.error()
            }
        };

        /**
         * Callback to execute on newExpenseItem typeahead is selected
         * @param $item
         * @param $model
         * @param $label
         * @param $event
         */
        $scope.onNewExpenseItemSelect = function ($item, $model, $label, $event) {
            var index = $CommonService.getIndexByField($scope.transaction.expense_items, $item.guid);
            if (index < 0) {
                var transactionExpenseItem = new TransactionExpenseItem($item);

                $ExpenseItemService
                    .getLastRegisterRecord(transactionExpenseItem.guid)
                        .then(function (response) {
                            transactionExpenseItem.price = response.data.register.value || 0;
                        })
                        .catch(onError);

                $scope.transaction.expense_items.push(transactionExpenseItem);
            } else {
                $ToastrService.info('item_has_been_already_added');
            }
            $scope.newExpenseItem = '';
        };
        
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

            $scope.po = data[0].data.po;
            $scope.transaction.payment_object = $scope.po;
        }

        function loadInitialData () {
            $q
                .all([
                    $POService.getPO(poGuid)
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
        '$SearchService',
        '$ExpenseItemService',
        '$state'
    ];

    angular
        .module('CashAppMy')
        .controller('transaction-expense-controller', TransactionExpenseCtrl)

})(angular);
