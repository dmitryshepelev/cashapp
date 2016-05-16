(function (angular) {
    function HotkeySrv (hotkeys) {
        /**
         * Create hotkey obj
         * @param data
         * @returns {{combo: (*|string), callback: obj.callback}}
         * @private
         */
        function _createHotKeyObj(data) {
            var obj = {
                combo: data.combo,
                callback: function ($event, hotkey) {
                    var args = [];
                    if (angular.isArray(data.args)) {
                        args = data.args;
                    }
                    if (data.passEvent) {
                        args.splice(0, 0, $event);
                    }
                    data.callback.apply(this.history || this, args);
                }
            };
            return obj
        }
        
        return {
            /**
             * Bind $scope with obj
             * @param $scope
             * @param arr
             * @returns {*}
             */
            bindScope: function ($scope, arr) {
                arr.forEach(function (item) {
                    var obj = _createHotKeyObj(item);
                    hotkeys.bindTo($scope)
                        .add(obj);
                })
            }
        }
    }

    HotkeySrv.$inject = ['hotkeys'];

    angular
        .module('CashApp.Service')
        .factory('$HotkeyService', HotkeySrv)

})(angular);
