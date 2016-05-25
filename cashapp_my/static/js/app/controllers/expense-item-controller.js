(function (angular) {

    function ExpenseItemCtrl ($scope, $rootScope, $q, $ToastrService, $ModalService, $ExpenseItemService, $CommonService) {
        $scope.recentExpenseItems = [];
        $scope.expenseItemQuery = '';
        $scope.expenseItems = null;
        
        /**
         * Error callback
         * @param response
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }
        
        /**
         * Init $scope with default values
         */
        function initScope(response) {

            /**
             * Init recent expense items
             * @param expenseItems
             */
            function initRecentExpenseItems(expenseItems) {
                $scope.recentExpenseItems = expenseItems || [];
            }

            initRecentExpenseItems(response[0].data.expense_items);
            
            $rootScope.$on('ExpenseItem.addSuccess', function (event, expenseItem) {
                $scope.recentExpenseItems.push(expenseItem);
            });

            $rootScope.$on('ExpenseItem.editSuccess', function (event, expenseItem) {
                var index = $CommonService.getIndexByField($scope.recentExpenseItems, expenseItem.guid);
                
                if (index >= 0) {
                    $scope.recentExpenseItems[index] = expenseItem
                }
            });
            
            /**
             * Callback to execute on search success
             */
            function onSearchSuccess(response) {
                $scope.expenseItems = response.data.instances || [];
            }

            $scope.$watch(function () {
                return $scope.expenseItemQuery;
            }, function (value) {
                if (value) {
                    $ExpenseItemService
                        .search(value, {})
                            .then(onSearchSuccess)
                            .catch(onError);
                } else {
                    $scope.expenseItems = null
                }
            })
        }

        /**
         * Loads initial data values
         */
        function loadInitialData() {
            $q
                .all([
                    $ExpenseItemService.getAll({ count: 5 })
                ])
                .then(initScope)
                .catch(onError)
        }

        loadInitialData();
    }

    ExpenseItemCtrl.$inject = ['$scope', '$rootScope', '$q', '$ToastrService', '$ModalService', '$ExpenseItemService', '$CommonService'];

    angular
        .module('CashAppMy')
        .controller('expense-item-controller', ExpenseItemCtrl)

})(angular);
