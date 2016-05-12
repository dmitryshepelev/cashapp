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
             * @param guid: po guid
             * @param params: {}
             */
            getTransactions: function (guid, params) {
                var defaultParams = {};
                if (angular.isObject(params)) {
                    angular.extend(defaultParams, params)    
                }
                var paramsString = $CommonService.encodeQueryData(defaultParams);
                var url = guid + '/transactions/' + (paramsString ? '?' + paramsString : '');
                return $http.get(baseUrl + url);
            },
            /**
             * Get last associated po register record
             * @param guid po guid
             */
            getLastRegisterRecord: function (guid) {
                var url = guid + '/register/?last=true';
                return $http.get(baseUrl + url);
            }
        }
    }

    POSrv.$inject = ['$http', '$CommonService'];

    angular
        .module('CashApp.Service')
        .factory('$POService', POSrv)

})(angular);

