(function (angular) {

    function TransactionIncomeCtrl ($scope, $rootScope, $q, $CommonService, $POService, $TransactionService, $ToastrService, $stateParams, $validator, $state) {
        var poGuid = $stateParams.guid || '';

        $scope.po = {};
        $scope.transaction = {
            date: new Date()
        };

        /**
         * Callback to execute on success creation
         */
        function onCreateTransactionSuccess(response) {
            var transaction = response.data.transaction;
            $rootScope.$broadcast('Transaction.createSuccess', transaction);
            $state.go('my.po.details', { guid: $scope.po.guid });
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
             * @param po
             */
            function initPO(po) {
                $scope.po = po;
            }
            
            initPO(data[0].data.po);
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

    TransactionIncomeCtrl.$inject = [
        '$scope',
        '$rootScope',
        '$q',
        '$CommonService',
        '$POService',
        '$TransactionService',
        '$ToastrService',
        '$stateParams',
        '$validator',
        '$state'
    ];

    angular
        .module('CashAppMy')
        .controller('transaction-income-controller', TransactionIncomeCtrl)

})(angular);
