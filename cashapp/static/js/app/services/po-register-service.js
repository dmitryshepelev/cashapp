(function (angular) {
    function PORegisterSrv ($http, $CommonService) {
        var baseUrl = '/api/cmn/reg/';
        return {
            /**
             * Get PO by type
             * @param poGuid
             * @param period value to fetch data - {c|w|m|y}
             * @param type value to calculate data - {current|expense|income}
             */
            get: function (poGuid, period, type) {
                var params = {
                    p: period || '',
                    t: type || ''
                };
                var urlString = $CommonService.encodeQueryData(params);
                var method = poGuid + '/' + (urlString !== '' ? '?' + urlString : '');
                return $http.get(baseUrl + method);
            }
        }
    }

    PORegisterSrv.$inject = ['$http', '$CommonService'];

    angular
        .module('CashApp.Service')
        .factory('$PORegisterService', PORegisterSrv)

})(angular);

