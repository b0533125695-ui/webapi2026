const router=require('express').Router();
const userController=require('../controllers/user');
router.get('/',userController.getAll);   
router.get('/:id',userController.getById);
router.delete('/:id',userController.delete);
router.post('/',userController.add);
router.put('/:id',userController.update);
router.post('/login',userController.login);

module.exports=router;