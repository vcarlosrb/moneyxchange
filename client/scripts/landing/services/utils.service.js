'use strict';
var servicename = 'utils';

module.exports = function(app) {

    var dependencies = [];

    function service() {
        this.formatNumber = function(number) {
            let firstPart = '';
            let secondPart = '';
            let newFirstNumber = '';
            let flag = false;
            let contThreeChar = 0;
            let invertFirstNumber = '';
            let resultNumber = '';
            for (let i = 0; i < number.length; i++) {
                if (number.charCodeAt(i) != 46) {
                    if (!flag) {
                        firstPart += number.charAt(i);
                    } else {
                        secondPart += number.charAt(i);
                    }
                } else {
                    flag = true;
                }
            }
            if (firstPart.length > 3) {
                for (let j = firstPart.length - 1; j >= 0; j--) {
                    invertFirstNumber += firstPart.charAt(j);
                    contThreeChar = parseInt(contThreeChar) + parseInt(1);
                    if (j != 0) {
                        if (contThreeChar == 3) {
                            invertFirstNumber += ',';
                            contThreeChar = 0;
                        }
                    }
                }
                for (let k = invertFirstNumber.length - 1; k >= 0; k--) {
                    newFirstNumber += invertFirstNumber.charAt(k);
                }
                if (flag) {
                    resultNumber = newFirstNumber + '.' + secondPart;
                } else {
                    resultNumber = newFirstNumber;
                }
            } else {
                resultNumber = number;
            }
            return resultNumber;
        };

        this.cleanNumber = function(number) {
            let newNumber = '';
            for (let i = 0; i < number.length; i++) {
                if (number.charCodeAt(i) != 44) {
                    newNumber += number.charAt(i);
                }
            }
            return newNumber;
        };
    }
    service.$inject = dependencies;
    app.service(app.name + '.' + servicename, service);
};
