const mysql=require('mysql2');
const connection=mysql.createConnection({
    host:process.env.MYSQLSRV,
    user:process.env.MYSQLUSER,
    password:process.env.MYSQLPASS,
    port:process.env.MYSQLPORT,
    database:process.env.MYSQLDB
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