module.exports={
    getAll:(req,res)=>{
    res.status(200).json({msg:`all products`});
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