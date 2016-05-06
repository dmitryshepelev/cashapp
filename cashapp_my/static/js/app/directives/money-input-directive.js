(function (angular) {
    /**
     * Payment object primarity icon
     * @returns {{link: Function}}
     */
    function MoneyInput () {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                currency: '=currency',
                name: '='
            },
            template:
                '<div class="input-group">' +
			        '<span ng-if="leftIcon" class="input-group-addon">[[ currency.dec | decUnicode ]]</span>' +
				    '<input type="text" class="form-control form-control-sm" ng-model="ngModel" ng-change="mask()" name="name" required autocomplete="off">' +
				    '<span ng-if="rightIcon" class="input-group-addon">[[ currency.dec | decUnicode ]]</span>' +
				'</div>',
            link: function (scope, element, attrs, controller, transcludeFn) {
                // TODO: store side of currency in db
                scope.$watch(function () {
                    return scope.currency;
                }, function (value) {
                    if (value) {
                        if (value.code == 'USD' || value.code == 'EUR') {
                            scope.leftIcon = true;
                        } else {
                            scope.rightIcon = true;
                        }
                    }
                });

                var oldModelValue = '';
                scope.mask = function () {
                    var re = new RegExp('[0-9]+(\.)?([0-9]{1,2})?', 'g');
                    if (scope.ngModel !== undefined) {
                        var matchArray = scope.ngModel.match(re);
                        if (matchArray != null && matchArray.length > 0) {
                            scope.ngModel = matchArray[0];
                            oldModelValue = scope.ngModel;
                        } else {
                            scope.ngModel = oldModelValue
                        }
                    }
                };
            }
        }
    }

    MoneyInput.inject = [];

    angular
        .module('CashAppMy')
        .directive('moneyInput', MoneyInput)

})(angular);

