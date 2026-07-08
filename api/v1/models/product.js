const mongoose=require('mongoose');// יבוא ספריית מונגוס
mongoose.pluralize(null);//מניעת שינוי שם האוסף במסד הנתונים מיחיד לרבים

const productSchema = mongoose.Schema({//הגדרת סכימה למוצר
    pid: { type: Number, required: true },//קוד מוצר, מספרי, חובה
    pname: { type: String, required: true },//שם מוצר, מחרוזת, חובה
    price: { type: Number, required: true },//מחיר מוצר, מספרי, חובה
    pdesc: { type: String, default: '' },//תיאור מוצר, מחרוזת, לא חובה, ברירת מחדל ריקה
    picName: { type: String, default: '' },//שם קובץ תמונה, מחרוזת, לא חובה, ברירת מחדל ריקה
    cid: { type: Number, required: true }//קוד קטגוריה, מספרי, חובה
});
const productModel=mongoose.model('products',productSchema);//הגדרת מודל למוצר ע"פ הסכימה שהוגדרה

module.exports=productModel;//ייצוא המודל לשימוש בקבצים אחרים