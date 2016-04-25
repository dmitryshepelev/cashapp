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
                var params = type + '/';
                return $http.post(baseUrl + params, data);
            },
            /**
             * Get PO by type
             * @param type
             */
            getByType: function (type) {
                var params = type + '/';
                return $http.get(baseUrl + params);
            },
            /**
             * Get PO by its guid
             */
            getPO: function (guid) {
                var params = guid + '/';
                return $http.get(baseUrl + params)
            },
            /**
             * Get all PO
             * @returns {*}
             */
            getAll: function () {
                return $http.get(baseUrl)
            }
        }
    }

    POSrv.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$POService', POSrv)

})(angular);

