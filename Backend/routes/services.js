const router = require('express').Router();

const serviceControll = require('../controllers/serviceController');

//**Funçoes */
router.route('/services').post((req, res) => serviceControll.create(req, res));

router.route('/services').get((req, res) => serviceControll.getAll(req, res));

router.route('/services/:id').get((req, res) => serviceControll.get(req, res));

router
  .route('/services/:id')
  .delete((req, res) => serviceControll.delete(req, res));

router
  .route('/services/:id')
  .put((req, res) => serviceControll.update(req, res));

module.exports = router;
