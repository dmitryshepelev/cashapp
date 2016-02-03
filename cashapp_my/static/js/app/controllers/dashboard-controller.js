(function (angular) {

    function DashboardCtrl ($scope, $PERSService, $ToastrService, $ModalService, $WidgetService) {
        var widgets = [];

        /**
         * On Delete success callback
         * @param response
         */
        function onDeleteWidgetSuccess (response) {
            var guid = response.data.guid;

            var widget = $scope.POWidgets.getByGuid(guid);

            if (widget) {
                var index = $scope.POWidgets.widgets.indexOf(widget);
                $scope.POWidgets.widgets.splice(index, 1)
            } else {
                $ToastrService.error()
            }
        }

        /**
         * Init $scope with default values
         */
        function initScope(poWidgets) {
            $scope.POWidgets = {
                /**
                 * Array of widgets
                 */
                widgets: poWidgets || [],
                /**
                 * Get widget by guid
                 * @param guid
                 * @returns {*}
                 */
                getByGuid: function (guid) {
                    var widget = this.widgets.filter(function (item) {
                        return item.guid === guid;
                    });
                    return widget.length !== 0 ? widget : {}
                },
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
                 * Delete widget
                 */
                deleteWidget: function (widget) {
                    $WidgetService.del(widget.guid)
                        .then(onDeleteWidgetSuccess)
                        .catch(onError)
                }
            };
        }

        /**
         * Success callback
         * @param response
         */
        function onGetPERSSuccess (response) {
            widgets = response.data.widget;

            var poWidgets = widgets.filter(function (item) {
                return item.object_type === 'paymentobject';
            });

            initScope(poWidgets)
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

    DashboardCtrl.$inject = ['$scope', '$PERSService', '$ToastrService', '$ModalService', '$WidgetService'];

    angular
        .module('CashAppMy')
        .controller('dashboard-controller', DashboardCtrl)

})(angular);
