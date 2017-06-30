'use strict';
var servicename = 'exchange';

module.exports = function(app) {

    var dependencies = ['$resource'];

    function service($resource) {
        var baseUrl = window.URL_BASE;
        var Exchange = $resource(baseUrl, {}, {
            'quote': {
                url: baseUrl + 'latest',
                method: 'GET'
            }
        });

        return Exchange;

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
