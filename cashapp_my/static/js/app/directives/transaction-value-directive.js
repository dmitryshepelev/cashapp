(function (angular) {
    /**
     * Transaction value
     * @returns {{link: Function}}
     */
    function TransactionValue () {
        return {
            restrict: 'E',
            scope: {
                value: '=',
                type: '='
            },
            template: '<strong class="[[ textClass ]]">[[ value ]]</strong>',
            link: function (scope, element, attrs, controller, transcludeFn) {
                function getTextClass(type) {
                    var className = 'text-';
                    if (type == 'income') {
                        return className + 'success';
                    } else if (type == 'expense') {
                        return className + 'danger';
                    } else {
                        return '';
                    }
                }

                scope.textClass = getTextClass(scope.type);
            }
        }
    }

    TransactionValue.inject = [];

    angular
        .module('CashAppMy')
        .directive('transactionValue', TransactionValue)

})(angular);

