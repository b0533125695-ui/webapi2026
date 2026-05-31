const mysqldb=require('../models/mysqldb');
module.exports={
    getAll:(req,res)=>{

        const sql='SELECT * FROM T_Product';
        mysqldb.query(sql,(error,results,fields)=>{
            if (error==null){
               console.log(results);
               return res.status(200).json(results);
            }
            else{
                console.log(error);
                return res.status(500).json(error);
            }
})
    // res.status(200).json({msg:`all products`});
},
    getById:(req,res)=>{
    const pid=req.params.id;
    const sql=`SELECT * FROM t_Product WHERE pid=${pid}`;
        mysqldb.query(sql,(error,results,fields)=>{
            if (error==null){
               console.log(results);
               return res.status(200).json(results);
            }
            else{
                console.log(error);
                return res.status(500).json(error);
            }
        });
},
    add:(req,res)=>{
    const pid=req.params.id;
    let data=req.body;
    let arr=Object.keys(data);
    let keys='';
    let values='';
    for (let i=0;i<arr.length;i++)
    {
        keys+=`${arr[i]},`;
        values+=`'${data[arr[i]]}',`;
    }
    keys=keys.substring(0,keys.length-1);
    values=values.substring(0,values.length-1);
     let sql=`INSERT INTO t_Product (${keys}) VALUES (${values})`;
    mysqldb.query(sql,(error,results,fields)=>{
        if (error==null){
           console.log(results);
            return res.status(200).json(results);
     }
        else{
            console.log(error);
            return res.status(500).json(error);
            }
        
   });
},
    update:(req,res)=>{
    const pid=req.params.id;
    let sql='UPDATE t_Product SET ';
    let data=req.body;
    let arr=Object.keys(data);
    for (let i=0;i<arr.length;i++)
    {
        sql+=`${arr[i]}='${data[arr[i]]}',`;
    }
    sql=sql.substring(0,sql.length-1);
    sql+=` WHERE pid=${pid}`;
    mysqldb.query(sql,(error,results,fields)=>{
        if (error==null){
           console.log(results);
            return res.status(200).json(results);
     }
        else{
            console.log(error);
            return res.status(500).json(error);
            }
        });
},
    delete:(req,res)=>{
    const pid=req.params.id;
    const sql=`DELETE FROM t_Product WHERE pid=${pid}`;
        mysqldb.query(sql,(error,results,fields)=>{
            if (error==null){
               console.log(results);
               return res.status(200).json(results);
            }
            else{
                console.log(error);
                return res.status(500).json(error);
            }
        });
}
}
