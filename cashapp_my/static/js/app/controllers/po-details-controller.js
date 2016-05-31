(function (angular) {

    function POCtrl ($scope, $rootScope, $q, $CommonService, $POService, $ToastrService, $stateParams, $ChartService) {
        var guid = $stateParams.guid || '';

        $scope.po = {};
        $scope.transactions = [];
        $scope.register = {};
        $scope.expenseTransactionsChart = {};

        /**
         * Error callback
         * @param response
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }

        /**
         * Function to init $scope
         */
        function initScope(data) {
            /**
             * Init PO model
             * @param po
             */
            function initPO(po) {
                $scope.po = po;
            }

            /**
             * Init Transactions list
             * @param transactions
             */
            function initTransactions(transactions) {
                $scope.transactions = transactions;
            }

            /**
             * Init register form http response
             * @param value
             */
            function initRegisterFormResponse(value) {
                $scope.register = value.data.register;
            }

            /**
             * Update register
             */
            function updateRegister() {
                $POService.getLastRegisterRecord(guid)
                    .then(initRegisterFormResponse)
                    .catch(onError)
            }

            initPO(data[0].data.po);
            initRegisterFormResponse(data[1]);
            initTransactions(data[2].data.transactions);

            $rootScope.$on('Transaction.createSuccess', function (event, transaction) {
                if (!Array.isArray($scope.transactions)) {
                    $scope.transactions = [];
                }
                $scope.transactions.push(transaction);
                updateRegister();
                $scope[transaction.type + 'TransactionsChart'].addValue(transaction.value, transaction.date);
            });

            $scope.expenseTransactionsChart =
                $ChartService.expenseTransactionsChart(data[3].data.transactions, {});
            
            $scope.incomeTransactionsChart =
                $ChartService.incomeTransactionsChart(data[4].data.transactions, {});
        }

        function loadInitialData() {
            $q
                .all([
                    $POService.getPO(guid),
                    $POService.getLastRegisterRecord(guid),
                    $POService.getTransactions(guid, {count: 5}),
                    $POService.getTransactions(guid, {count: 10, type: 'expense'}),
                    $POService.getTransactions(guid, {count: 10, type: 'income'})
                ])
                .then(initScope)
                .catch(onError);
        }

        loadInitialData();
    }

    POCtrl.$inject = [
        '$scope',
        '$rootScope',
        '$q',
        '$CommonService',
        '$POService',
        '$ToastrService',
        '$stateParams',
        '$ChartService'
    ];

    angular
        .module('CashAppMy')
        .controller('po-details-controller', POCtrl)

})(angular);
