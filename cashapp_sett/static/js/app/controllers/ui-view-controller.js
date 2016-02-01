(function (angular) {
    function UiViewCtrl ($scope, $rootScope, $state, $SettService, $ToastrService) {
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

                var requestState = $state.$current.self.name;
                var toState = (requestState && requestState != 'sett.redirect') ? requestState : $scope.tabs[0].toState;

                var activeTab = $scope.tabs.filter(function (item) {
                    return item.toState == toState;
                })[0];
                activeTab.active = true;

                $state.go(toState)
            }
            /**
             * getUiTab success callback
             * @param response
             */
            function onGetUiTabsError (response) {
                $ToastrService.messageFromResponse(response);
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

    UiViewCtrl.$inject = ['$scope', '$rootScope', '$state', '$SettService', '$ToastrService'];

    angular
        .module('CashAppSett')
        .controller('$UiViewController', UiViewCtrl)

})(angular);