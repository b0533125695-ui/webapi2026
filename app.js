require('dotenv').config();//יבוא משתני סביבה מקובץ דוט אי אן וי
const express=require('express');//יבוא ספריית אקספרס ליצירת שרת אינטרנט
const app=express();//יצירת שם מקוצר לשרת האינטרנט
const routerProduct=require('./api/v1/routes/product');//חיבור לנתיב של המוצרים
const routerOrder=require('./api/v1/routes/order');//חיבור לנתיב של ההזמנות
const routerUser=require('./api/v1/routes/user');//חיבור לנתיב של הלקוחות
const routerCategory=require('./api/v1/routes/category');//חיבור לנתיב של הקטגוריות
const morgan=require('morgan');//יבוא ספריית 'מורגן' להדפסת לוגין של בקשות הלקוח לשרת האינטרנט
const auth=require('./api/v1/middlewares/auth');
const mongoose=require('mongoose');// יבוא ספריית מונגוס
const session=require('express-session');//יבוא ספריית סשן לניהול סשנים של משתמשים
// const secure=require('./api/v1/middlewares/securing');//
const mongoStore=require('connect-mongo').default;//יבוא ספריית 'קונקט-מונגו' לניהול סשנים של משתמשים בדאטה בייס של מונגו די בי


//מחרוזת ההתחברות לשירות מסד הנתונים של מונגו די בי באמצעות משתני סביבה המוגדרים בקובץ דוט אי אן וי
const connStr=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_SRV}/ecomdb`
mongoose.connect(connStr).then((conn)=>{
    console.log('MongoDB connection successful');//הדפס הודעה על הצלחת החיבור למסד הנתונים
});//חיבור למסד הנתונים באמצעות מחרוזת ההתחברות

// app.use(secure);
app.use(session({//הגדרת סשן לניהול סשנים של משתמשים
    secret:process.env.PRIVATE_KEY,//הגדרת מפתח סודי להצפנת הקוקי
    resave:false,//לא לשמור סשן אם לא היה שינוי
    saveUninitialized:true,//ליצור עוגיה גם אם המשתמש לא התחבר
    store: mongoStore.create({mongoUrl: connStr}),//הגדרת אחסון הסשן באמצעות מונגו די בי ולא בזיכרון של השרת המקומי 
    cookie:{
        path:'/',//הגדרת הנתיב של הקוקי, (כל נתיב)
        secure:false,//הגדרת הקוקי להיות מאובטח
        maxAge:1000*60*20//הגדרת זמן חיי הקוקי ל-20 דקות
    },
}));
app.use(morgan('dev'));//הגדרת ספריית Morris להדפסת לוגין של בקשות הלקוח לשרת האינטרנט
app.use(express.json());//הגדרה שהשרת יקבל מהלקוח נתונים בפורמט ג'ייסון
app.use(express.urlencoded());//הגדרה שהשרת יקבל מהלקוח נתונים בפורמט של טופס
//הגדרת הנתיבים של המוצרים, ההזמנות, הלקוחות והקטגוריות
app.use('/product',routerProduct);
app.use('/order',routerOrder);
app.use('/user',routerUser);
app.use('/category',routerCategory);

module.exports=app;//ייצוא השרת שיהיה זמין לייבוא בקובץ index.js
