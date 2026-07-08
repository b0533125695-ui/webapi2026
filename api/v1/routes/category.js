const router=require('express').Router();
const categoryController=require('../controllers/category');
const auth=require('../middlewares/auth');
router.get('/',categoryController.getAll);   
router.get('/:id',categoryController.getById);
router.delete('/:id',auth,categoryController.delete);
router.post('/',auth,categoryController.add);
router.put('/:id',auth,categoryController.update);

module.exports=router;