const mongoose = require('mongoose');// יבוא ספריית מונגוס

const userSchema = mongoose.Schema({//הגדרת סכימה למשתמש
    // _id: mongoose.Schema.Types.ObjectId,
    uid: Number,
    fullname: String,
    email: String,
    pass: String
});

const userModel = mongoose.model('users', userSchema);//הגדרת מודל למשתמש ע"פ הסכימה שהוגדרה

module.exports = userModel;//ייצוא המודל לשימוש בקבצים אחרים