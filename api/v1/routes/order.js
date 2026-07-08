const router=require('express').Router();
const orderController=require('../controllers/order');
const auth=require('../middlewares/auth');
router.get('/',orderController.getAll);   
router.get('/:id',orderController.getById);
router.delete('/:id',auth,orderController.delete);
router.post('/',auth,orderController.add);
router.put('/:id',auth,orderController.update);

module.exports=router;