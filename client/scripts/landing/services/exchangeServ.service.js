'use strict';
var servicename = 'exchangeServ';

module.exports = function(app) {

    var dependencies = ['main.landing.exchange'];

    function service(Exchange) {
        this.quote = function(data) {
            return Exchange.quote(data).$promise;
        };
    }
    service.$inject = dependencies;
    app.service(app.name + '.' + servicename, service);
};
