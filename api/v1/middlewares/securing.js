module.exports=((req,res,next)=>{
    const arrAllowList=['127.0.0.1','::1'];
    for (let i=0;i<arrAllowList.length;i++){
        if (req.ip==arrAllowList[i])
            next();}
    return res.status(401).json('אין הרשאת גישה')
});