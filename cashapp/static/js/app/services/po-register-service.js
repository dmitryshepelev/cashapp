(function (angular) {
    function PORegisterSrv ($http) {
        var baseUrl = '/api/cmn/poregister/';
        return {
            /**
             * Get PO by type
             * @param poGuid
             * @param period value to fetch data - {week|month|year}
             */
            getByPO: function (poGuid, period) {
                var method = poGuid + '/' + (period ? '?p=' + period : '');
                return $http.get(baseUrl + method);
            }
        }
    }

    PORegisterSrv.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$PORegisterService', PORegisterSrv)

})(angular);

