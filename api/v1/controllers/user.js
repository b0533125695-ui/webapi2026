module.exports={
    getAll:(req,res)=>{
    res.status(200).json({msg:`all users`});
},
    getById:(req,res)=>{
    const UserId=req.params.id;
    res.status(200).json({msg:`got user id ${UserId}`});
},
    add:(req,res)=>{
    //הוספת משתמש חדש
    res.status(200).json({msg:`add a user`});
},
    update:(req,res)=>{
    const UserId=req.params.id;//עדכון משתמש ע"פ הקוד משתמש
    res.status(200).json({msg:`update user id  ${UserId}`});
},
    delete:(req,res)=>{
    const UserId=req.params.id;
    res.status(200).json({msg:`delete user id  ${UserId}`});
}
}