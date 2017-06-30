'use strict';

var namespace = 'main';
// fix protractor issue
if (window.location.toString().indexOf('localhost:5555') > 0) {
    window.name = 'NG_DEFER_BOOTSTRAP!NG_ENABLE_DEBUG_INFO!';
}

window.URL_BASE = 'http://api.fixer.io/';

var angular = require('angular');
require('angular-ui-router');

require('angular-ui-bootstrap');
var app = angular.module(namespace, ['ui.bootstrap',
    // inject:modules start
    require('./landing')(namespace).name
    // inject:modules end
]);

if (process.env.SENTRY_MODE === 'prod') {
    var configCompileDeps = ['$compileProvider'];
    var configCompile = function($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    };
    configCompile.$inject = configCompileDeps;
    app.config(configCompile);
}

var runDeps = [];
var run = function() {};

run.$inject = runDeps;
app.run(run);

module.exports = app;
