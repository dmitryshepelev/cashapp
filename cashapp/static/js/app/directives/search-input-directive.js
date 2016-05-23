(function (angular) {
    /**
     * @returns {{link: Function}}
     */
    function SearchInput () {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                inputName: '='
            },
            template: '<input class="form-control input-icon" ng-model="ngModel" ng-model-options="{ debounce: 1000 }" name="inputName" autocomplete="off" />' +
                        '<span ng-if="clearIcon" ng-click="clear()" class="lnr lnr-cross"></span>',
            link: function (scope, element, attrs, controller, transcludeFn) {
                scope.$watch(function () {
                    return scope.ngModel;
                }, function (value) {
                    scope.clearIcon = !!value;
                });

                scope.clear = function () {
                    scope.ngModel = '';
                }
            }
        }
    }

    SearchInput.inject = [];

    angular
        .module('CashApp.Service')
        .directive('searchInput', SearchInput);

})(angular);


