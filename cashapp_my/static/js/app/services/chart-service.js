(function (angular) {

    function _ChartSrv() {

        function ChartSettings(data, labels, options, colors, params) {
            this.data = [data];
            this.labels = labels;
            this.options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 0
                        }
                    }]
                }
            };
            this.colors = colors;
            this.params = {
                maxDataItems: 10
            };

            angular.merge(this.options, options);
            angular.extend(this.params, params);
        }

        ChartSettings.prototype = {
            constructor: ChartSettings,
            setMaxyAxesTick: function (value) {
                this.options.scales.yAxes[0].ticks.max = (value || Math.max.apply(this, this.data[0])) * 1.1;
            },
            addValue: function (value, label) {
                if (this.labels.length > 0 && this.labels.length >= this.params.maxDataItems) {
                    this.labels.splice(0, 1);
                }
                this.labels.push(label);

                if (this.data[0].length > 0 && this.data[0].length >= this.params.maxDataItems) {
                    this.data[0].splice(0, 1);
                }
                this.data[0].push(Number(value));
                this.setMaxyAxesTick()
            }
        };

        return {
            /**
             * Creates chart for register records
             * @param registerRecords
             * @param options
             * @param colors
             */
            registerChart: function (registerRecords, options, colors) {
                var data = [];
                var labels = [];

                var defaultOptions = {
                    // responsive: true,
                    scales: {
                        xAxes: [{
                            display: false,
                            points: false
                        }],
                        yAxes: [{
                            display: false,
                            ticks: {
                                min: 0
                            }
                        }]
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    }
                };

                var defaultColors = [{
                    backgroundColor: 'transparent',
                    borderColor: '#0275D8'
                }];

                angular.extend(defaultColors, colors);

                var chartSettings = new ChartSettings(data, labels, angular.merge(defaultOptions, options), defaultColors);

                registerRecords.reverse().forEach(function (registerRecord) {
                    chartSettings.addValue(Number(registerRecord.value), registerRecord.date);
                });

                return chartSettings;
            }
        }
    }

    _ChartSrv.$inject = [];

    angular
        .module('CashAppMy')
        .service('$ChartService', _ChartSrv)

})(angular);
