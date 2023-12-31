const router = require('express').Router();

//**Services Router*/
const servicesRoute = require('./services');
router.use('/', servicesRoute);

//**Parties routes */
const partyRouter = require('./parties');
router.use('/', partyRouter);

module.exports = router;
