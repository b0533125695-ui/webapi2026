module.exports={
    getAll:(req,res)=>{
    res.status(200).json({msg:`all orders`});
},
    getById:(req,res)=>{
    const OrdId=req.params.id;
    res.status(200).json({msg:`got order id ${OrdId}`});
},
    add:(req,res)=>{
    //הוספת הזמנה חדש
    res.status(200).json({msg:`add a order`});
},
    update:(req,res)=>{
    const OrdId=req.params.id;//עדכון הזמנה ע"פ הקוד הזמנה
    res.status(200).json({msg:`update order id  ${OrdId}`});
},
    delete:(req,res)=>{
    const OrdId=req.params.id;
    res.status(200).json({msg:`delete order id  ${OrdId}`});
}
}