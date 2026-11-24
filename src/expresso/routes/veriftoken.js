const { verifToken } = require('../middleware');

const veriftoken = (app) => {
    app.post('/api/veriftoken', verifToken, (req, res) => {
        return res.json({ valide: true });
    });
    return app;
};

module.exports = { veriftoken };