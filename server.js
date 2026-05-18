const http=require('http');
const app=require('./app');
const port=2626;
const srv=http.createServer(app);
srv.listen(port, ()=>{
    console.log('thank you')
})