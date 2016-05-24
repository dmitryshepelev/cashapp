(function (angular) {
    function MeasureSrv ($http) {
        var baseUrl = '/api/cmn/measure/';
        return {
            /**
             * Get all measures
             */
            getAll: function () {
                return $http.get(baseUrl);
            }
        }
    }

    MeasureSrv.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$MeasureService', MeasureSrv)

})(angular);
