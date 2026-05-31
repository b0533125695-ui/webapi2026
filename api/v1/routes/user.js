const router=require('express').Router();
const userController=require('../controllers/user');
const auth=require('../middlewares/auth');
router.get('/',userController.getAll);   
router.get('/:id',userController.getById);
router.delete('/:id',auth,userController.delete);
router.post('/',auth,userController.add);
router.put('/:id',auth,userController.update);
router.post('/login',userController.login);

module.exports=router;