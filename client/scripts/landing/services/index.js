'use strict';

module.exports = function(app) {
    // inject:start
    require('./exchange.service')(app);
    require('./exchangeServ.service')(app);
    require('./utils.service')(app);
    // inject:end
};