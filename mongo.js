require('dotenv').config();//יבוא משתני סביבה מקובץ דוט אי אן וי
const mongoose=require('mongoose');// יבוא ספריית מונגוס

//מחרוזת ההתחברות לשירות מסד הנתונים של מונגו די בי באמצעות משתני סביבה המוגדרים בקובץ דוט אי אן וי
const connStr=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_SRV}/ecomdb`
//הגדרת סכימה למוצר
const prouductSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    pid:Number,
    pname:String,
    price:Number,
    pdesc:String,
    picName:String,
    cid:Number
});
const productModel=mongoose.model('product',prouductSchema);//הגדרת מודל למוצר ע"פ הסכימה שהוגדרה

main();//קריאה לפונקציה הראשית שמבצעת את החיבור למסד הנתונים

async function main() {
    try {
        await mongoose.connect(connStr);//חיבור למסד הנתונים באמצעות מחרוזת ההתחברות
        console.log(await productModel.find());//הדפסת כל המוצרים שנמצאים במסד הנתונים
        if (await productModel.countDocuments() == 0)//אם אין מוצרים במסד הנתונים
        {
            console.log('MongoDB connection successful');//הדפס הודעה על הצלחת החיבור למסד הנתונים
        }
    }
     catch (err) //אם יש שגיאה בחיבור למסד הנתונים
    {
        console.error('MongoDB connection error:', err);//הדפסת הודעת שגיאה ואת סיבת השגיאה
        process.exit(1);//סיום התוכנית עם קוד שגיאה 1
    } finally {
        await mongoose.disconnect();//ניתוק החיבור למסד הנתונים
    }
}
