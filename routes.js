
const testRouter = require('express').Router();
const config = require("./utils/config")
testRouter.get('/test', async (request, response) => {

    response.json({port: config.PORT})
});

module.exports = testRouter;
