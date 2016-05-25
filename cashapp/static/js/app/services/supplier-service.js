(function (angular) {
    function SupplierSrv ($http, $CommonService, $SearchService) {
        var baseUrl = '/api/cmn/supplier/';
        return {
            /**
             * Add supplier
             */
            add: function (supplier) {
                return $http.post(baseUrl, supplier);
            },
            /**
             * Edit supplier
             */
            edit: function (supplier) {
                return $http.put(baseUrl, supplier);
            },
            /**
             * Get supplier
             * @param guid
             */
            getSupplier: function (guid) {
                return $http.get(baseUrl + guid + '/');
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
