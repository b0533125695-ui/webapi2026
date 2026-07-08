const productModel=require('../models/product');//חיבור המודל של המוצרים מהדאטה בייס של מונגו די בי
module.exports={
    getAll: async (req,res)=>{//בקשה להצגת כל המוצרים
        try{
        const data=await productModel.find();//הצגת כל המוצרים מבסיס הנתונים של מונגו די בי
        return res.status(200).json(data);//החזרת המידע למשתמש בפורמט ג'ייסון
        }
        catch(err)//אם יש שגיאה
        {
            console.log(err);//הדפסת השגיאה בקונסול
            return res.status(500).json(err);//החזרת השגיאה למשתמש בפורמט ג'ייסון
        }
},
    getById: async (req,res)=>{//בקשה להצגת מוצר לפי קוד המוצר
    const pid=req.params.id;//שמירה לתוך 'pid' את קוד המוצר שהתקבלה בבקשה
    try{
        const data=await productModel.find({pid});//הצגת המוצר על פי קוד המוצר שלו
        return res.status(200).json(data);//החזרת המידע למשתמש בפורמט ג'ייסון
    }
    catch(err)//אם היתה שגיאה בחיבור
    {
        console.log(err);//הדפסת השגיאה בקונסול
        return res.status(500).json(err);//החזרת השגיאה למשתמש בפורמט ג'ייסון
    }
},
    add: async (req,res)=>{//בקשה להוספת מוצר חדש
    try{
        const { pid, pname, price, cid } = req.body;//יצירת אוביקט עם שדות החובה לצורך בדיקת ולידציה

        // Validation - בדיקה שהשדות החובה קיימים
        if (pid == null || pname == null || price == null || cid == null) {//אם אחד משדות החובה חסר
            return res.status(400).json({
                error: 'Missing required fields: pid, pname, price, cid'//מחזיר הודעת שגיאה
            });
        }
        const newProduct = await productModel.create(req.body);//יצירת מוצר חדש ע"פ המידע שנשלח בבקשה
        return res.status(200).json(newProduct);//מחזיר את המוצר בפורמט ג'ייסון
    }
    catch(err){//לכידת שגיאות אפשריות
        console.log(err);
        return res.status(500).json(err);
    }
},
    update: async (req,res)=>{//בקשה לעדכון נתונים במוצר קיים
    const pid=req.params.id;//שמירה לתוך 'pid' את קוד המוצר שהתקבלה בבקשה
    const Data=req.body;//שמירה לתוך Data את התוכן לעדכון שנשלח בבקשה
    try{
        const result=await productModel.updateOne({pid:pid}, {$set:Data});//עדכון המוצר עם המידע שהתקבל מהמשתמש ע"פ הקוד מוצר
        return res.status(200).json(result);//החזרת המידע למשתמש בפורמט ג'ייסון
    }
    catch(err){//אם היתה שגיאה בחיבור
        console.log(err);
        return res.status(500).json(err);//החזרת השגיאה
    }
},
    delete: async (req,res)=>{//בקשה למחיקת מוצר ע"פ קוד המוצר
    const pid=req.params.id;//שמירה לתוך 'pid' את קוד המוצר שהתקבלה בבקשה
    try{
        const data=await productModel.deleteOne({pid:pid});//מחיקת המוצר המבוקש
        return res.status(200).json(data);//החזרת המידע למשתמש בפורמט ג'ייסון
    }
    catch(err){//לכידת שגיאות אפשריות
        console.log(err);
        return res.status(500).json(err);
    }
}
}
