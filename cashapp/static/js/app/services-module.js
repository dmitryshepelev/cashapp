(function (angular) {

    function _config(toastrConfig, $uibTooltipProvider) {
        /**
         * Config toastr
         */
        angular.extend(toastrConfig, {
            maxOpened: 3,
            timeOut: 10000,
            allowHtml: true
        });

        $uibTooltipProvider.options({})
    }


    angular
        .module('CashApp.Service', [
            'LocalStorageModule',
            'ngAnimate',
            'toastr',
            'angular-loading-bar',
            'ui.bootstrap',
            'ui.bootstrap.datetimepicker'
        ]);

    angular
        .module('CashApp.Service')
        .config(['toastrConfig', '$uibTooltipProvider', _config]);

    angular.module('ui.bootstrap.datetimepicker').run(['$templateCache', function($templateCache) {
        $templateCache.put('template/date-picker.html',
            "<ul class=\"dropdown-menu dropdown-menu-left datetime-picker-dropdown\" ng-if=\"isOpen && showPicker == 'date'\" ng-style=dropdownStyle style=left:inherit ng-keydown=keydown($event) ng-click=$event.stopPropagation()><li style=\"padding:0 5px 5px 5px\" class=date-picker-menu><div ng-transclude></div></li><li style=padding:5px ng-if=buttonBar.show><span class=\"btn-group pull-md-left\" style=margin-right:10px ng-if=\"doShow('today') || doShow('clear')\"><button uib-tooltip=\"[[ 'today' | translate ]]\" type=button class=\"btn btn-sm btn-link\" ng-if=\"doShow('today')\" ng-click=\"select('today')\" ng-disabled=\"isDisabled('today')\"><span class=\"lnr lnr-sun\"></span></button></span> <span class=\"btn-group pull-md-right\" ng-if=\"(doShow('time') && enableTime) || doShow('close')\"><button type=button class=\"btn btn-sm btn-link\" ng-if=\"doShow('time') && enableTime\" ng-click=\"open('time', $event)\"><span class=\"lnr lnr-clock\"></span></button> <button uib-tooltip=\"[[ 'close' | translate ]]\" type=button class=\"btn btn-sm btn-link\" ng-if=\"doShow('close')\" ng-click=close(true)><span class=\"lnr lnr-cross\"></span></button></span> <span class=clearfix></span></li></ul>"
        );

        $templateCache.put('template/time-picker.html',
            "<ul class=\"dropdown-menu dropdown-menu-left datetime-picker-dropdown\" ng-if=\"isOpen && showPicker == 'time'\" ng-style=dropdownStyle style=left:inherit ng-keydown=keydown($event) ng-click=$event.stopPropagation()><li style=\"padding:0 5px 5px 5px\" class=time-picker-menu><div ng-transclude></div></li><li style=padding:5px ng-if=buttonBar.show><span class=\"btn-group pull-md-left\" style=margin-right:10px ng-if=\"doShow('now') || doShow('clear')\"><button uib-tooltip=\"[[ 'today' | translate ]]\" type=button class=\"btn btn-sm btn-link\" ng-if=\"doShow('now')\" ng-click=\"select('now')\" ng-disabled=\"isDisabled('now')\"><span class=\"lnr lnr-sun\"></span></button></span> <span class=\"btn-group pull-md-right\" ng-if=\"(doShow('date') && enableDate) || doShow('close')\"><button type=button class=\"btn btn-sm btn-link\" ng-if=\"doShow('date') && enableDate\" ng-click=\"open('date', $event)\"><span class=\"lnr lnr-calendar-full\"></span></button> <button uib-tooltip=\"[[ 'close' | translate ]]\" type=button class=\"btn btn-sm btn-link\" ng-if=\"doShow('close')\" ng-click=close(true)><span class=\"lnr lnr-cross\"></span></button></span> <span class=clearfix></span></li></ul>"
        );
    }]);
})(angular);