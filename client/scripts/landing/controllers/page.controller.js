'use strict';
var controllername = 'page';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', 'main.landing.exchangeServ'];

    function controller($scope, ExchangeServ) {
        var vm = this;
        vm.controllername = fullname;
        $scope.Form = {};
        $scope.EuroExchange = 0;
        $scope.ForeignExchange = [];
        $scope.Valid = {
            dollar: false
        };

        $scope.Events = {
            calculate: function(form) {
                if ($scope.Validate.calculate(form)) {
                    $scope.Form.euro = (parseFloat($scope.Form.dollar) * parseFloat($scope.EuroExchange)).toFixed(2);
                    $scope.ForeignExchange.map((item) => {
                        item.total = (parseFloat($scope.Form.dollar) * parseFloat(item.value)).toFixed(2);
                    });
                }
            },
            clear: function() {

            }
        };

        $scope.Services = {
            constructor: function() {
                this.getExchange();
                this.getAllExchange();
                setInterval(() => {
                    this.getExchange();
                    this.getAllExchange();
                }, 600000);
            },
            getExchange: function() {
                let data = {
                    base: 'USD',
                    symbols: 'EUR'
                };
                ExchangeServ.quote(data).then((response) => {
                    $scope.EuroExchange = response.rates['EUR'];
                });
            },
            getAllExchange: function() {
                $scope.ForeignExchange = [];
                let data = {
                    base: 'USD'
                };
                ExchangeServ.quote(data).then((response) => {
                    for (let k in response.rates) {
                        if (response.rates.hasOwnProperty(k)) {
                            let obj = {
                                key: k,
                                value: response.rates[k],
                                total: ''
                            };
                            $scope.ForeignExchange.push(obj);
                        }
                    }
                });
            }
        };
        $scope.Services.constructor();

        $scope.Validate = {
            calculate: function(form) {
                $scope.Valid.dollar = (form.dollar == '' || form.dollar == undefined);

                return (!$scope.Valid.dollar);
            }
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
