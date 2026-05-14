const router=require('express').Router();
const productController=require('../controllers/product');
router.get('/',productController.getAll);   
router.get('/:id',productController.getById);
router.delete('/:id',productController.delete);
router.post('/',productController.add);
router.put('/:id',productController.update);

module.exports=router;