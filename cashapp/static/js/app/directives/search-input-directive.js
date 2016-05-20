(function (angular) {
    /**
     * @returns {{link: Function}}
     */
    function SeatchInpu ($timeout) {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                inputName: '='
            },
            template: '<input class="form-control" ng-model="ngModel" ng-model-options="{ debounce: 1000 }" required name="inputName" autocomplete="off" />',
            link: function (scope, element, attrs, controller, transcludeFn) {
            }
        }
    }

    SeatchInpu.inject = ['$timeout'];

    angular
        .module('CashApp.Service')
        .directive('searchInput', SeatchInpu);

})(angular);


