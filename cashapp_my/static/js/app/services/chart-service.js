(function (angular) {

    function _ChartSrv() {

        function Chart(data, labels, options, colors, params) {
            this.data = [data];
            this.labels = labels;
            this.options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 0,
                            min: 0
                        }
                    }]
                }
            };
            angular.merge(this.options, options);
            
            this.colors = [{}];
            angular.merge(this.colors, colors);
            
            this.params = {};
            angular.extend(this.params, params);
        }

        Chart.prototype = {
            constructor: Chart,
            /**
             * Calculates max value of Y axis
             * @param value
             */
            setMaxYAxesTick: function (value) {
                this.options.scales.yAxes[0].ticks.max = (value || Math.max.apply(this, this.data[0])) * 1.1;
            },
            /**
             * Calculates min value of Y axis
             * @param value
             */
            setMinYAxesTick: function (value) {
                this.options.scales.yAxes[0].ticks.min = (value || Math.min.apply(this, this.data[0])) * 0.9;
            },
            /**
             * Add value to data
             * @param value
             * @param label
             */
            addValue: function (value, label) {
                if (this.labels.length > 0 && this.labels.length >= this.params.maxDataItems) {
                    this.labels.splice(0, 1);
                }
                if (label instanceof Date) {
                    label = [label.getDate(), label.getMonth() + 1].join('/');
                }
                this.labels.push(label);

                if (this.data[0].length > 0 && this.data[0].length >= this.params.maxDataItems) {
                    this.data[0].splice(0, 1);
                }
                this.data[0].push(Number(value));
                this.setMaxYAxesTick();
                this.setMinYAxesTick();
            }
        };

        function RegisterChart(registerRecords, options, colors) {
            var data = [];
            var labels = [];

            var defaultOptions = {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: '#f2f2f2',
                            zeroLineColor: '#f2f2f2'
                        }
                    }],
                    yAxes: [{
                        display: false
                    }]
                },
                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 7
                    }
                }
            };
            angular.merge(defaultOptions, options);

            var defaultColors = [{
                backgroundColor: 'transparent',
                borderColor: '#0275D8'
            }];
            angular.extend(defaultColors, colors);

            var chart = new Chart(data, labels, defaultOptions, defaultColors);

            registerRecords.reverse().forEach(function (registerRecord) {
                chart.addValue(Number(registerRecord.value), new Date(registerRecord.date));
            });

            return chart;
        }

        return {
            chart: Chart,
            /**
             * Creates chart for register records
             * @param registerRecords
             * @param options
             * @param colors
             */
            registerChart: RegisterChart
        }
    }

    _ChartSrv.$inject = [];

    angular
        .module('CashAppMy')
        .service('$ChartService', _ChartSrv)

})(angular);
