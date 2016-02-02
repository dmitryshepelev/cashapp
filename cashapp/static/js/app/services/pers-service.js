(function (angular) {
    function PERSSrv ($http) {
        var baseUrl = '/api/cmn/pers/';
        return {
            /**
             * Get PO by type
             * param items: array of prest items names to get
             */
            getPERS: function (items) {
                var p = '';
                if (Array.isArray(items)) {
                    p = items.join(',');
                }
                var method = p !== '' ? '?i=' + p : p;
                return $http.get(baseUrl + method);
            }
        }
    }

    PERSSrv.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$PERSService', PERSSrv)

})(angular);
