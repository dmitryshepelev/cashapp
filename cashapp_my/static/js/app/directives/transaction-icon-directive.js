(function (angular) {
    /**
     * Transaction icon
     * @returns {{link: Function}}
     */
    function TransactionIcon () {
        return {
            restrict: 'E',
            scope: {
                type: '='
            },
            template: '<span uib-tooltip="[[ type | translate ]]" class="transaction-icon lnr lnr-arrow-[[ icon ]]"></span>',
            link: function (scope, element, attrs, controller, transcludeFn) {
                scope.icon = getClass(scope.type);

                function getClass(type) {
                    var iconClass = '';
                    switch (type) {
                        case 'income': {
                            iconClass = 'down';
                            break;
                        }
                        case 'expense': {
                            iconClass = 'up';
                            break;
                        }
                        case 'transfer': {
                            iconClass = 'left';
                            break;
                        }
                    }
                    return iconClass;
                }
            }
        }
    }

    TransactionIcon.inject = [];

    angular
        .module('CashAppMy')
        .directive('transactionIcon', TransactionIcon)

})(angular);
