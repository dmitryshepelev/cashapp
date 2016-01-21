(function (angular) {
    function UiViewCtrl ($scope, $rootScope, $state, $SettService) {
        /**
         * Init $scope with default values get from server
         */
        function initScope () {
            /**
             * getUiTab success callback
             * @param response
             */
            function onGetUiTabsSuccess (response) {
                $scope.tabs = response.data.tabs;
                $state.go($scope.tabs[0].toState)
            }
            /**
             * getUiTab success callback
             * @param response
             */
            function onGetUiTabsError (response) {
            }

            $SettService.getUiTabs()
                .then(onGetUiTabsSuccess)
                .catch(onGetUiTabsError)
        }

        /**
         * State change success event
         * https://github.com/angular-ui/ui-router/wiki#state-change-events
         * @param event
         * @param toState
         * @param toParams
         * @param fromState
         * @param fromParams
         */
        function onStateChangeSuccess (event, toState, toParams, fromState, fromParams) {
        }

        $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);

        initScope();
    }

    UiViewCtrl.$inject = ['$scope', '$rootScope', '$state', '$SettService'];

    angular
        .module('CashAppSett')
        .controller('$UiViewController', UiViewCtrl)

})(angular);