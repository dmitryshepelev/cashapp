(function (angular) {
    /**
     * Payment object primarity icon
     * @returns {{link: Function}}
     */
    function DateTimePicker ($timeout) {
        return {
            restrict: 'E',
            scope: {
                ngModel: '='
            },
            template: '<div class="input-group"><input disabled type="text" class="form-control form-control-sm" ' +
                    'datetime-picker="dd/MM/yyyy HH:mm" ' +
                    'ng-model="ngModel" ' +
                    'timepicker-options="timepickerOptions" ' +
                    'datepicker-options="datepickerOptions" ' +
                    'is-open="isOpen" ng-focus="open($event)"' +
                '/><span class="input-group-btn">' +
                    '<button type="button" class="btn btn-link btn-sm" ng-click="isOpen = true"><span class="lnr lnr-calendar-full"></span></button>' +
                '</span></div>',
            link: function (scope, element, attrs, controller, transcludeFn) {
                scope.isOpen = false;

                scope.datepickerOptions = {
                    maxDate: new Date(),
                    showWeeks: false
                };

                scope.timepickerOptions = {
                    showMeridian: false,
                    showSeconds: true
                };
            }
        }
    }

    DateTimePicker.inject = ['$timeout'];

    angular
        .module('CashApp.Service')
        .directive('datetimepicker', DateTimePicker);

})(angular);

