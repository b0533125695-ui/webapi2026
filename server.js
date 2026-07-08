const http=require('http');//יבוא ספריית http ליצירת שרת אינטרנט
const app=require('./app');//יבוא קובץ app.js שמכיל את הגדרת שרת האינטרנט
const port=2626;
const srv=http.createServer(app);
srv.listen(port, ()=>{
    console.log('yes, server is up');
})