module.exports={
    getAll:(req,res)=>{
    res.status(200).json({msg:`all Categories`});
},
    getById:(req,res)=>{
    const cid=req.params.id;
    res.status(200).json({msg:`got category id ${cid}`});
},
    add:(req,res)=>{
    //הוספת קטגוריה חדשה
    res.status(200).json({msg:`add a category`});
},
    update:(req,res)=>{
    const cid=req.params.id;//עדכון קטגוריה ע"פ הקוד קטגוריה
    res.status(200).json({msg:`update category id  ${cid}`});
},
    delete:(req,res)=>{
    const cid=req.params.id;
    res.status(200).json({msg:`delete category id  ${cid}`});
}
}