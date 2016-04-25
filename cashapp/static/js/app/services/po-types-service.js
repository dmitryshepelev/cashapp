(function (angular) {
    function POTypesSrv ($http) {
        var baseUrl = '/api/cmn/po_types/';
        return {
            /**
             * Get PO types
             */
            getAll: function () {
                return $http.get(baseUrl);
            }
        }
    }

    POTypesSrv.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$POTypesService', POTypesSrv)

})(angular);
