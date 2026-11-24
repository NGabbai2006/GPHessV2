//const { inscription } = require('./routes/inscription');
//const { verifToken } = require('./middleware');
const { test } = require('./routes/atest')
const { veriftoken } = require('./routes/veriftoken');

const loadApis = (app) => {
    app = test(app);
    app = veriftoken(app);
    return app;
}

module.exports = { loadApis };