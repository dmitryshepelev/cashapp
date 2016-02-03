(function (angular) {
    function WidgetSrv ($http) {
        var baseUrl = '/api/cmn/widget/';
        return {
            /**
             * Create widget
             * @param params obj of type and guid of the widget object
             */
            create: function (params) {
                return $http.post(baseUrl, params)
            },
            /**
             * Delete widget by guid
             * @param guid
             * @returns {*}
             */
            del: function (guid) {
                return $http.delete(baseUrl, { data: {guid: guid} })
            }
        }
    }

    WidgetSrv.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$WidgetService', WidgetSrv)

})(angular);
