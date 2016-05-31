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

            var chartData = data[3].data.transactions.map(function (item) {
                return Number(item.value);
            });

            $rootScope.$on('Transaction.createSuccess', function (event, transaction) {
                if (!Array.isArray($scope.transactions)) {
                    $scope.transactions = [];
                }
                $scope.transactions.push(transaction);
                updateRegister();
            })

            $scope.labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

            $scope.data = [chartData];

            $scope.options = {
                responsive: true,
                scales: {
                    xAxes: [{
                        display: false,
                        points: false
                    }],
                    yAxes: [{
                        display: false,
                        ticks: {
                            max: 55000
                        }
                    }]
                },
                elements: {point: {radius: 0}}
            };

            $scope.colors = [{
                backgroundColor: 'transparent',
                borderColor: '#0275D8'
            }];
        }

        function loadInitialData() {
            $q
                .all([
                    $POService.getPO(guid),
                    $POService.getLastRegisterRecord(guid),
                    $POService.getTransactions(guid, {count: 5}),
                    $POService.getTransactions(guid, {count: 10, type: 'expense'})
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
