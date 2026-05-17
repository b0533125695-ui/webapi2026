const mysql=require('mysql2');
const connection=mysql.createConnection({
    host:'localhost',
    user:'motyb',
    password:'mb1470',
    port:3306,
    database:'webapi'
})
module.exports=connection;
// const sql='SELECT * FROM T_Product';
// connection.query(sql,(error,results,fields)=>{
//     if (error==null){
//         console.log('do not found');
//     }
//     else{
//         console.log(results);
//         console.log(fields);
//     }
// })