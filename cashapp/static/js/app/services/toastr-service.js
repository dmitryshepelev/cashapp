(function (angular) {

    function ToastrService(toastr, $translate) {

        var defaultText = {
            header: {
                success: 'success_header',
                error: 'error_header',
                warning: 'warning_header',
                info: 'info_header'
            },
            text: {
                success: 'success_text',
                error: 'error_text',
                warning: 'warning_text',
                info: 'info_text'
            }
        };

        /**
         * Show toast depends on type
         * @param type success error warning info
         * @param text
         * @param header
         */
        function showToast (type, text, header) {

            text = text || defaultText.text[type];
            header = header || defaultText.header[type];

            $translate([text, header])
                .then(function (result) {
                    toastr[type](result[text], result[header])
                })
        }

        return {
            /**
             * Show success toast
             * @param text
             * @param header
             */
            success: function (text, header) {
                showToast('success', text, header);
            },
            /**
             * Show error toast
             * @param header
             * @param text
             */
            error: function (text, header) {
                showToast('error', text, header);
            },
            /**
             * Show warning toast
             * @param header
             * @param text
             */
            warning: function (text, header) {
                showToast('warning', text, header);
            },
            /**
             * Show info toast
             * @param header
             * @param text
             */
            info: function (text, header) {
                showToast('info', text, header);
            }
        }
    }

    ToastrService.$inject = ['toastr', '$translate'];

    angular
        .module('CashApp.Service')
        .service('$ToastrService', ToastrService);

})(angular);


