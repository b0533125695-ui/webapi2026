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
    res.status(200).json({msg:`got product id ${pid}`});
},
    add:(req,res)=>{
    //הוספת מוצר חדש
    res.status(200).json({msg:`add a product`});
},
    update:(req,res)=>{
    const pid=req.params.id;//עדכון מוצר ע"פ הקוד מוצר
    res.status(200).json({msg:`update product id  ${pid}`});
},
    delete:(req,res)=>{
    const pid=req.params.id;
    res.status(200).json({msg:`delete product id  ${pid}`});
}
}