// מוודא שהמשתמש מחובר ומחזיר את המידע שלו
const jwt=require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        // מקבל את הטוקן מהכותרת של הבקשה
        const token=req.headers.authorization.split(' ')[1]; 
        // אם הטוקן תקין, מקבל חזרה את הנתונים שמוזנים בזמן היצירה
        const user=jwt.verify(token,process.env.PRIVATE_KEY);
        // שומר את המידע של המשתמש כדי שהקוד הבא יכול להשתמש בו
        req.user=user;

        // ממשיך למידלוור הבא או ל-controller
        next();
    } 
    catch (error) {
        // אם אין טוקן או שהוא לא תקין, מחזיר שגיאה 401
        return res.status(401).json({ status: false, data:[], msg: 'Invalid token' });
    }
};