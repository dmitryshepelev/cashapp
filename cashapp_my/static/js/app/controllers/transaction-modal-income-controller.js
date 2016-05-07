(function (angular) {

    function TransactModalIncomeCtrl ($scope, $rootScope, $q, $CommonService, $POService, $TransactionService, $ToastrService, $state, $stateParams, $validator) {
        var poGuid = $stateParams.guid || '';

        $scope.isPOPredefined = poGuid ? true : false;
        $scope.pos = [];
        $scope.transaction = {
            date: new Date()
        };

        /**
         * Callback to execute on success creation
         */
        function onCreateTransactionSuccess(response) {
            console.log(response);
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

    TransactModalIncomeCtrl.$inject = ['$scope', '$rootScope', '$q', '$CommonService', '$POService', '$TransactionService', '$ToastrService', '$state', '$stateParams', '$validator'];

    angular
        .module('CashAppMy')
        .controller('transaction-modal-income-controller', TransactModalIncomeCtrl)

})(angular);
