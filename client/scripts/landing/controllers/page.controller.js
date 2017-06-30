'use strict';
var controllername = 'page';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', 'main.landing.exchangeServ', 'main.landing.utils'];

    function controller($scope, ExchangeServ, Utils) {
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
                form.newDollarNumber = Utils.cleanNumber(form.dollar);
                if ($scope.Validate.calculate(form) && $scope.EuroExchange !== 0 && $scope.ForeignExchange.length > 0) {
                    $scope.Form.euro = (parseFloat(form.newDollarNumber) * parseFloat($scope.EuroExchange)).toFixed(2);
                    $scope.Form.newEuroNumber = Utils.formatNumber($scope.Form.euro);
                    $scope.ForeignExchange.map((item) => {
                        item.total = (parseFloat(form.newDollarNumber) * parseFloat(item.value)).toFixed(2);
                        item.newTotal = Utils.formatNumber(item.total);
                    });
                }
            },
            keyup: function(char, number) {
                let newNumber = '';
                let flag = false;
                let contDecimals = 0;
                for (let i = 0; i < number.length; i++) {
                    if ((number.charCodeAt(i) >= 48 && number.charCodeAt(i) <= 57) || number.charCodeAt(i) === 46) {
                        if (number.charCodeAt(i) === 46) {
                            if (!flag) {
                                newNumber += number.charAt(i);
                            }
                            flag = true;
                        } else {
                            if (flag) {
                                if (contDecimals < 4) {
                                    newNumber += number.charAt(i);
                                }
                                contDecimals = parseInt(contDecimals) + parseInt(1);
                            } else {
                                newNumber += number.charAt(i);
                            }
                        }
                    }
                }
                $scope.Form.dollar = Utils.formatNumber(newNumber);
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
                    let badge = 'EUR';
                    $scope.EuroExchange = response.rates[badge];
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
                                total: '',
                                newTotal: ''
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
                $scope.Valid.dollar = (form.dollar === '' || form.dollar === undefined);

                return (!$scope.Valid.dollar);
            }
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
