const router=require('express').Router();
const orderController=require('../controllers/order');
router.get('/',orderController.getAll);   
router.get('/:id',orderController.getById);
router.delete('/:id',orderController.delete);
router.post('/',orderController.add);
router.put('/:id',orderController.update);

module.exports=router;