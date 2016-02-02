(function (angular) {

    function DashboardCtrl ($scope, $PERSService, $ToastrService, $ModalService) {
        var widgets = [];

        $scope.POWidgets = {
            /**
             * Array of widgets
             */
            widgets: [],
            /**
             * Opens modal and add widget to array on resolve
             */
            addWidget: function () {
                var thus = this;
                $ModalService
                    .open('powidget', 'po-modal-controller')
                    .result
                        .then(function (result) {
                            thus.widgets.push(result)
                        })
                        .catch()
            },
            /**
             * Widget panel
             */
            panel: {
                /**
                 * is mouse over panel
                 */
                isMousover: false
            }
        };

        /**
         * Success callback
         * @param response
         */
        function onGetPERSSuccess (response) {
            widgets = response.data.widget;

            $scope.POWidgets.widgets = widgets.filter(function (item) {
                return item.type === 'paymentobject';
            })
        }

        /**
         * Error callback
         * @param response
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }

        $PERSService.getPERS(['widget'])
            .then(onGetPERSSuccess)
            .catch(onError)
    }

    DashboardCtrl.$inject = ['$scope', '$PERSService', '$ToastrService', '$ModalService'];

    angular
        .module('CashAppMy')
        .controller('dashboard-controller', DashboardCtrl)

})(angular);
