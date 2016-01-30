(function (angular) {
    function POSrv ($http) {
        var baseUrl = '/api/sett/po/';
        return {
            /**
             * Save PO data
             * @param data
             * @param type
             * @returns {*}
             */
            createPO: function (data, type) {
                var method = type + '/';
                return $http.post(baseUrl + method, data);
            },
            /**
             * Get PO by type
             * @param type
             */
            getPO: function (type) {
                var method = type + '/';
                return $http.get(baseUrl + method);
            }
        }
    }

    POSrv.$inject = ['$http'];

    angular
        .module('CashAppSett')
        .factory('$POService', POSrv)

})(angular);

