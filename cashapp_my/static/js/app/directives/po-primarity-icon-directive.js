(function (angular) {
    /**
     * Payment object primarity icon
     * @returns {{link: Function}}
     */
    function POPrimarity () {
        return {
            restrict: 'E',
            scope: {
                isPrimary: '=isPrimary'
            },
            template: '<span uib-tooltip="[[ \'primary\' | translate ]]" class="cursor-default" ng-class="{\'lnr lnr-checkmark-circle\': isPrimary }"></span>',
        }
    }

    POPrimarity.inject = [];

    angular
        .module('CashAppMy')
        .directive('poPrimarityIcon', POPrimarity)

})(angular);
