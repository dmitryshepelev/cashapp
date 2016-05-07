(function (angular) {
    function TransactionService ($http) {
        var baseUrl = '/api/cmn/transaction/';

        /**
         * Create transaction method
         * @param type
         * @param transaction
         * @returns {*}
         */
        function _create(type, transaction) {
            return $http.post(baseUrl + type + '/', transaction);
        }
        
        return {
            /**
             * Create income transaction
             */
            createIncomeTransaction: function (transaction) {
                return _create('income', transaction);
            },
            /**
             * Get transactions of specified po
             * @param po_guid
             * @param count: the number of transactions to get
             */
            getTransactions: function (po_guid, count) {
                var paramString = 'po_guid=' + po_guid + (count ? '&count=' + count : '');
                return $http.get(baseUrl + '?' + paramString);
            }
        }
    }

    TransactionService.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$TransactionService', TransactionService)

})(angular);
