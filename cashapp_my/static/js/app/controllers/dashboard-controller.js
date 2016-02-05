(function (angular) {

    function DashboardCtrl ($scope, $PERSService, $ToastrService, $ModalService, $WidgetService, $PORegisterService) {
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
         * Success added widget callback
         * @param widget
         */
        function onAddWidgetSuccess (widget) {
            this.widgets.unshift(widget);

            $PORegisterService.get(widget.content.guid, 'w', 'e')
                .then()
                .catch();
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
                    return widget.length !== 0 ? widget[0] : {}
                },
                /**
                 * Opens modal and add widget to array on resolve
                 */
                addWidget: function () {
                    var thus = this;
                    $ModalService
                        .open('po_modal', 'po-modal-controller', { PaymentObjects: function () {
                            return {
                                exclude: thus.widgets.map(function (item) {
                                    return item.content.guid;
                                })
                            }
                        }})
                        .result
                            .then(onAddWidgetSuccess.bind(thus))
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

    DashboardCtrl.$inject = ['$scope', '$PERSService', '$ToastrService', '$ModalService', '$WidgetService', '$PORegisterService'];

    angular
        .module('CashAppMy')
        .controller('dashboard-controller', DashboardCtrl)

})(angular);
