(function (angular) {

    function POCtrl ($scope, $rootScope, $q, $CommonService, $POService, $CurrencyService, $ToastrService, $state, $stateParams, $TransactionService) {
        var guid = $stateParams.guid || '';

        $scope.po = {};

        $scope.incomeTransactionModal = function () {
            $state.go('my.po.details.transact', { type: 'income' })
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
             * Init PO model
             * @param po
             */
            function initPO(po) {
                $scope.po = po;
            }

            data.forEach(function (item) {
                if (item.data.hasOwnProperty('po')) {
                    initPO(item.data.po)
                }
            });
        }

        function loadInitialData () {
            $q
                .all([
                    $POService.getPO(guid),
                    $POService.getTransactions(guid, '', 5)
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
