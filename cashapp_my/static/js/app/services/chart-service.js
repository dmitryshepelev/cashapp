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

        /**
         * Generic transactions chart
         * @param transactions
         * @param options
         * @param colors
         * @returns ChartSettings
         */
        function transactionsChart(transactions, options, colors) {
            var data = [];
            var labels = [];

           var defaultOptions = {
                responsive: true,
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

            var chartSettings = new ChartSettings(data, labels, angular.merge(defaultOptions, options), colors || []);

            transactions.reverse().forEach(function (transaction) {
                chartSettings.addValue(Number(transaction.value), transaction.date);
            });

            return chartSettings;
        }

        return {
            /***
             * Creates chart data for expense transaction chart
             * @param expenseTransactions
             * @param options
             * @param colors
             */
            expenseTransactionsChart: function (expenseTransactions, options, colors) {
                var defaultColors = [{
                    backgroundColor: 'transparent',
                    borderColor: '#d9534f'
                }];
                return transactionsChart(expenseTransactions, options, angular.merge(defaultColors, colors))
            },
            /***
             * Creates chart data for income transaction chart
             * @param incomeTransactions
             * @param options
             * @param colors
             */
            incomeTransactionsChart: function (incomeTransactions, options, colors) {
                var defaultColors = [{
                    backgroundColor: 'transparent',
                    borderColor: '#5cb85c'
                }];
                return transactionsChart(incomeTransactions, options, angular.merge(defaultColors, colors))
            }
        }
    }

    _ChartSrv.$inject = [];

    angular
        .module('CashAppMy')
        .service('$ChartService', _ChartSrv)

})(angular);
