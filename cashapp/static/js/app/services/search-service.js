(function (angular) {
    function SearchSrv ($http, $CommonService) {
        var baseUrl = '/api/cmn/search/';
        return {
            /**
             * Get PO by type
             * @param type
             * @param q
             * @param params
             */
            search: function (type, q, params) {
                if (!q || !type) {
                    throw new Error('Required param is not defined');
                } else {
                    var queryString = '?type=' + type + '&q=' + q;
                    var defaultParams = {};
                    
                    if (angular.isObject(params)) {
                        angular.extend(defaultParams, params)
                    }
                    queryString += $CommonService.encodeQueryData(defaultParams);
                    return $http.get(baseUrl + queryString);
                }
            }
        }
    }

    SearchSrv.$inject = ['$http', '$CommonService'];

    angular
        .module('CashApp.Service')
        .factory('$SearchService', SearchSrv)

})(angular);

