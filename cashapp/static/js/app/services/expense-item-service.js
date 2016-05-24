(function (angular) {
    function ExpenseItemSrv ($http) {
        var baseUrl = '/api/cmn/expenseitem/';
        return {
            /**
             * Save PO data
             * @param expenseItem
             * @returns {*}
             */
            add: function (expenseItem) {
                return $http.post(baseUrl, expenseItem);
            }
        }
    }

    ExpenseItemSrv.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$ExpenseItemService', ExpenseItemSrv)

})(angular);


