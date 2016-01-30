(function (angular) {
    function POSrv ($http) {
        var baseUrl = '/api/cmn/po/';
        return {
            /**
             * Save PO data
             * @param data
             * @param type
             * @returns {*}
             */
            create: function (data, type) {
                var method = type + '/';
                return $http.post(baseUrl + method, data);
            },
            /**
             * Get PO by type
             * @param type
             */
            getByType: function (type) {
                var method = type + '/';
                return $http.get(baseUrl + method);
            }
        }
    }

    POSrv.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$POService', POSrv)

})(angular);

