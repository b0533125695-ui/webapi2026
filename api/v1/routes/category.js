const router=require('express').Router();
const categoryController=require('../controllers/category');
router.get('/',categoryController.getAll);   
router.get('/:id',categoryController.getById);
router.delete('/:id',categoryController.delete);
router.post('/',categoryController.add);
router.put('/:id',categoryController.update);

module.exports=router;