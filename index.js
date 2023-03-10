const express=require("express");
const jwt=require('jsonwebtoken');
const secretkey="secretkey";
const app=express();

app.get('/',(req,res)=>{
    res.send("A simple application");
})
app.post('/login',(req,res)=>{
    const user={
        id:101,
        name:'aakash',
        email:'akash@getMaxListeners.com'
    }
    jwt.sign({user},secretkey,{expiresIn:'300s'},(err,token)=>{
        res.json({
            token
        })
    })
})
app.post('/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,secretkey,(err,authData)=>{
        if(err){
            res.send({result:'Invalid Token'})
        }else{
            res.json({
                message:'profile accessed',
                authData
            })
        }
    })
})
function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined')
    {
        const bearer=bearerHeader.split(" ");
        const token=bearer[1];
        req.token=token;
        next();
    }
    else{
        res.send({result:"Token is not valid"});
    }
}
app.listen(8000,()=>{
    console.log('Server is running on 8000 port');
})
