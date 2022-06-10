const router = require('express').Router();
const validate = require('../middlewares/validate');
const { guard } = require('../middlewares/auth');

const controller = require('../controllers/picture');
const middleware = require('../middlewares/picture');
const validation = require('../validations/picture');

router.param('id', controller.load);

router.get('/', validate(validation.index), controller.index);
router.get('/all', validate(validation.index), controller.indexAll);
router.get('/:id', controller.show);
router.post('/', guard(), middleware.upload, middleware.download, validate(validation.store), controller.store);
router.put('/:id', guard(), middleware.upload, middleware.download, validate(validation.update), controller.update);
router.delete('/:id', guard(), controller.destroy);

module.exports = router;
