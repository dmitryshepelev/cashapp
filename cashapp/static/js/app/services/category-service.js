(function (angular) {
    function CategorySrv ($http, $CommonService) {
        var baseUrl = '/api/cmn/category/';
        return {
            /**
             * Add category
             */
            add: function (category) {
                return $http.post(baseUrl, category);
            },
            /**
             * Edit category
             */
            edit: function (category) {
                return $http.put(baseUrl, category);
            },
            /**
             * Get category
             * @param guid
             * @param params
             */
            getCategory: function (guid, params) {
                var defaultParams = {};
                if (angular.isObject(params)) {
                    angular.extend(defaultParams, params)
                }
                var paramsString = $CommonService.encodeQueryData(defaultParams);
                var categoryGuid = guid ? guid + '/' : '';
                return $http.get(baseUrl + categoryGuid + (paramsString ? '?' + paramsString : ''));
            },
            /**
             * Delete category by guid
             * @param guid
             */
            delete: function (guid) {
                return $http.delete(baseUrl + guid + '/');
            }
        }
    }

    CategorySrv.$inject = ['$http', '$CommonService'];

    angular
        .module('CashApp.Service')
        .factory('$CategoryService', CategorySrv)

})(angular);
