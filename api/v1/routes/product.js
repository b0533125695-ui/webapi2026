const router=require('express').Router();//חיבור ספריית 'אקספרס' ליצירת ראוטים
const productController=require('../controllers/product');//חיבור הקונטרולר של המוצרים
const auth=require('../middlewares/auth');//חיבור המידלוור של האותנטיקציה שמוודא שהמשתמש מחובר עם טוקן תקין
router.get('/',productController.getAll); 
router.get('/:id',productController.getById);
router.delete('/:id',productController.delete);
router.post('/',productController.add);
router.put('/:id',productController.update);

module.exports=router;