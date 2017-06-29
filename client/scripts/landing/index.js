'use strict';
var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');

var modulename = 'landing';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var app = angular.module(fullname, ['ui.router']);
    // inject:folders start
    require('./controllers')(app);
    // inject:folders end
    app.namespace = app.namespace || {};

    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider'];
    var configRoutes = function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('landing', {
            url: '/',
            abstract: true,
            views: {
                '@': {
                    template: require('./views/layout.html'),
                    controller: 'main.landing.layout'
                }
            }
        }).state('landing.page', {
            url: '',
            parent: 'landing',
            views: {
                'landing-web@landing': {
                    template: require('./views/landing.page.html'),
                    controller: 'main.landing.page'
                }
            }
        });
    };
    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes);

    return app;
};
