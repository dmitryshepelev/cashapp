(function (angular) {
    function ExpenseItemSrv ($http, $CommonService, $SearchService) {
        var baseUrl = '/api/cmn/expenseitem/';
        return {
            /**
             * Save PO data
             * @param expenseItem
             * @returns {*}
             */
            add: function (expenseItem) {
                return $http.post(baseUrl, expenseItem);
            },
            /**
             * Edit expense item
             */
            edit: function (expenseItem) {
                return $http.put(baseUrl, expenseItem);
            },
            /**
             * Get all
             */
            getAll: function (params) {
                var defaultParams = {};
                if (angular.isObject(params)) {
                    angular.extend(defaultParams, params)    
                }
                var paramsString = $CommonService.encodeQueryData(defaultParams);
                var url = paramsString ? '?' + paramsString : '';
                return $http.get(baseUrl + url);
            },
            /**
             * Get expense item
             * @param guid
             */
            getExpenseItem: function (guid) {
                return $http.get(baseUrl + guid + '/');
            },
            /**
             * Search expense item by query
             * @param q
             * @param params
             */
            search: function (q, params) {
                return $SearchService.search('expenseitem', q, params);
            },
            /**
             * Get last associated expense item register record
             * @param guid expense item guid
             */
            getLastRegisterRecord: function (guid) {
                var url = guid + '/register/?last=true';
                return $http.get(baseUrl + url);
            }
        }
    }

    ExpenseItemSrv.$inject = ['$http', '$CommonService', '$SearchService'];

    angular
        .module('CashApp.Service')
        .factory('$ExpenseItemService', ExpenseItemSrv)

})(angular);


