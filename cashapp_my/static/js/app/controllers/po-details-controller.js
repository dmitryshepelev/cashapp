(function (angular) {

    function POCtrl ($scope, $rootScope, $q, $CommonService, $POService, $CurrencyService, $ToastrService, $state, $stateParams, $TransactionService) {
        var guid = $stateParams.guid || '';

        $scope.po = {};
        $scope.transactions = [];
        $scope.register = {};

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

            data.forEach(function (item) {
                if (item.data.hasOwnProperty('po')) {
                    initPO(item.data.po);
                } else if (item.data.hasOwnProperty('register')) {
                    initRegisterFormResponse(item);
                } else if (item.data.hasOwnProperty('transactions')) {
                    initTransactions(item.data.transactions);
                }
            });

            $rootScope.$on('Transaction.createSuccess', function (event, transaction) {
                if (!Array.isArray($scope.transactions)) {
                    $scope.transactions = [];
                }
                $scope.transactions.push(transaction);
                updateRegister();
            })
        }

        function loadInitialData () {
            $q
                .all([
                    $POService.getPO(guid),
                    $POService.getLastRegisterRecord(guid),
                    $POService.getTransactions(guid, { count: 5 })
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
        '$CurrencyService',
        '$ToastrService',
        '$state',
        '$stateParams',
        '$TransactionService'
    ];

    angular
        .module('CashAppMy')
        .controller('po-details-controller', POCtrl)

})(angular);
