'use strict';

module.exports = function(app) {
    // inject:start
    require('./layout.controller')(app);
    require('./page.controller')(app);
    // inject:end
};