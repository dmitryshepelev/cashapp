(function (angular) {
    function WidgetSrv ($http) {
        var baseUrl = '/api/cmn/widget/';
        return {
        }
    }

    WidgetSrv.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$WidgetService', WidgetSrv)

})(angular);
