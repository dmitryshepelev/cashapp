(function (angular) {
    function POSrv ($http, $CommonService) {
        var baseUrl = '/api/cmn/po/';
        return {
            /**
             * Save PO data
             * @param po
             * @returns {*}
             */
            add: function (po) {
                return $http.post(baseUrl, po);
            },
            /**
             * Edit po
             * @param po
             */
            edit: function (po) {
                return $http.put(baseUrl, po);
            },
            /**
             * Get PO by its guid
             */
            getPO: function (guid) {
                var params = guid + '/';
                return $http.get(baseUrl + params);
            },
            /**
             * Get all PO
             * @returns {*}
             */
            getAll: function () {
                return $http.get(baseUrl);
            },
            /**
             * Get associated transactions
             * @param guid
             * @param type
             * @param count
             */
            getTransactions: function (guid, type, count) {
                var params = $CommonService.encodeQueryData({ type: type, count: count });
                var url = guid + '/transactions/';
                return $http.get(baseUrl + url + (params ? '?' + params : ''));
            }
        }
    }

    POSrv.$inject = ['$http', '$CommonService'];

    angular
        .module('CashApp.Service')
        .factory('$POService', POSrv)

})(angular);

