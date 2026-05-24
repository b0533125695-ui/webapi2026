const mysqldb=require('../models/mysqldb');
module.exports={
    getAll:(req,res)=>{

        const sql='SELECT * FROM t_category';
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
    // res.status(200).json({msg:`all Users`});
},
    getById:(req,res)=>{
    const catid=req.params.id;
    const sql=`SELECT * FROM t_category WHERE catid=${catid}`;
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
    const catid=req.params.id;
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
     let sql=`INSERT INTO t_category (${keys}) VALUES (${values})`;
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
    const catid=req.params.id;
    let sql='UPDATE t_category SET ';
    let data=req.body;
    let arr=Object.keys(data);
    for (let i=0;i<arr.length;i++)
    {
        sql+=`${arr[i]}='${data[arr[i]]}',`;
    }
    sql=sql.substring(0,sql.length-1);
    sql+=` WHERE catid=${catid}`;
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
    const catid=req.params.id;
    const sql=`DELETE FROM t_category WHERE catid=${catid}`;
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
