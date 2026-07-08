const bcrypt = require('bcrypt');//חיבור ספריית 'ביקריפט' להצפנת סיסמאות
const jwt = require('jsonwebtoken');//חיבור ספריית 'ג'ייסון ווב טוקן' ליצירת טוקן למשתמשים
const userModel = require('../models/user');//חיבור המודל של המשתמשים
module.exports={
    getAll: async (req,res)=>{
        try{
        const data=await userModel.find();//הצגת כל הלקוחות מבסיס הנתונים של מונגו די בי
        return res.status(200).json(data);//החזרת המידע למשתמש בפורמט ג'ייסון
        }
        catch(err)//אם יש שגיאה
        {
            console.log(err);//הדפסת השגיאה בקונסול
            return res.status(500).json(err);//החזרת השגיאה למשתמש בפורמט ג'ייסון
        }
},
    getById: async (req,res)=>{
    const uid=req.params.id;//שמירה לתוך uid את קוד המשתמש שהתקבל מהמשתמש
    try{
        const data=await userModel.find({uid:uid});//הצגת המשתמש ממסד הנתונים של מונגו די בי, לפי קוד המשתמש שהתקבל מהמשתמש
        return res.status(200).json(data);//החזרת המידע למשתמש בפורמט ג'ייסון
    }
    catch(err)//אם יש שגיאה
    {
        console.log(err);//הדפסת השגיאה בקונסול
        return res.status(500).json(err);//החזרת השגיאה למשתמש בפורמט ג'ייסון
    }
},
    add:async (req, res) => {
        try{
        const { uid, fullname, email, pass } = req.body;//שמירת הערכים שהתקבלו מהמשתמש לתוך משתנים נפרדים ע"פ השדות שהוגדרו בסכימה
        // Validation - בדיקה שהשדות החובה קיימים
        if (!uid || !fullname || !email || !pass) {
            return res.status(400).json({
                error: 'Missing required fields: uid, fullname, email, pass'
            });
        }
        //בדיקה שהמשתמש עדיין אינו קיים ע"פ השדה אימייל
        const existingUser = await userModel.find({ email });//חיפוש משתמש קיים ע"פ כתובת האימייל שהתקבלה מהמשתמש
        if (existingUser)//אם משתמש קיים
        {
            return res.status(400).json({ error: 'User with this email already exists' });// החזרת הודעת שגיאה למשתמש 'משתמש עם כתובת אימייל זו כבר קיים'
        }
        let userData = req.body;//שמירה לתוך userData את המידע שהתקבל מהמשתמש
        userData.pass = await bcrypt.hash(pass, 10);//הצפנת הסיסמא שהתקבלה מהמשתמש
        const newUser = await userModel.create(userData);//יצירת משתמש חדש ע"פ המידע שהתקבל מהמשתמש עם הסיסמא המוצפנת
        return res.status(201).json(newUser);//החזרת המידע למשתמש בפורמט ג'ייסון
       }//אם היה שגיאה כלשהי במהלך התהליך, היא תיתפס על ידי ה-catch ותודפס בקונסול ותוחזר למשתמש בפורמט ג'ייסון
       catch(err){
            console.log(err);
            return res.status(500).json(err);
       }
},
    update: async (req,res)=>{
    try{
        const uid = req.params.id;//שמירה לתוך Uid את קוד המשתמש שהתקבל מהמשתמש
        const data = req.body;//שמירה לתוך data את המידע שהתקבל מהמשתמש
       if (data.pass)//אם המשתמש רוצה לעדכן את הסיסמא, היא תוצפן מחדש
        {
        data.pass = hashPass = await bcrypt.hash(data.pass, 10);//הצפנת הסיסמא שהתקבלה מהמשתמש
        }
        const result=await userModel.updateOne({uid}, {$set: data});//עדכון המשתמש ע"פ המידע שהתקבל מהמשתמש
        return res.status(200).json(result);//החזרת המידע למשתמש בפורמט ג'ייסון
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
},
    delete: async (req, res) => {
        const uid = req.params.id;//שמירה לתוך uid את קוד המשתמש שהתקבל מהמשתמש
        try {
            const data = await userModel.deleteOne({ uid: uid });//מחיקת המשתמש המבוקש
            return res.status(200).json(data);//החזרת המידע למשתמש בפורמט ג'ייסון
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
},
    login: async (req, res) => {
        const data = req.body;//שמירה לתוך data את המידע שהתקבל מהמשתמש
        const user = await userModel.findOne({ email: data.email });//חיפוש המשתמש ע"פ כתובת האימייל שהתקבלה מהמשתמש
        if (!user)//אם המשתמש לא קיים
        {
            return res.status(200).json({msg:'User / password not found' });//שם משתמש או סיסמא לא נמצאו
        }
        let isMatch = await bcrypt.compare(data.pass, user.pass);//השוואת הסיסמא שהתקבלה מהמשתמש עם הסיסמא המוצפנת במסד הנתונים
        if (!isMatch)//אם הסיסמאות לא תואמות
        {
            return res.status(200).json({msg:'User / password not found' });//שם משתמש או סיסמא לא נמצאו
        }
        const token = jwt.sign({ uid: user.uid, email: user.email }, process.env.PRIVATE_KEY, { expiresIn: '1h' });//יצירת טוקן למשתמש עם פרטי המשתמש שהתקבלו מהמסד הנתונים תקף למשך שעה
        return res.status(200).json({msg:'Login successful', token: token });//החזרת הטוקן למשתמש בפורמט ג'ייסון
    }
};