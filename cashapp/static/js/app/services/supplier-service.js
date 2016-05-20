(function (angular) {
    function SupplierSrv ($http, $CommonService, $SearchService) {
        var baseUrl = '/api/cmn/supplier/';
        return {
            /**
             * Add supplier
             */
            add: function (category) {
                return $http.post(baseUrl, category);
            },
            /**
             * Edit supplier
             */
            edit: function (category) {
                return $http.put(baseUrl, category);
            },
            /**
             * Get supplier
             * @param guid
             */
            getSupplier: function (guid) {
                return $http.get(baseUrl + guid + '/');
            },
            /**
             * Get
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
             * Search supplier by query
             * @param q
             * @param params
             */
            search: function (q, params) {
                return $SearchService.search('supplier', q, params);
            }
        }
    }

    SupplierSrv.$inject = ['$http', '$CommonService', '$SearchService'];

    angular
        .module('CashApp.Service')
        .factory('$SupplierService', SupplierSrv)

})(angular);
