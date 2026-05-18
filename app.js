const express=require('express');
const app=express();
const routerProduct=require('./api/v1/routes/product');
const routerOrder=require('./api/v1/routes/order');
const routerUser=require('./api/v1/routes/user');
const routerCategory=require('./api/v1/routes/category');
const morgan=require('morgan');
const myLog=require('./api/v1/middlewares/myLog');

// const secure=require('./api/v1/middlewares/securing');
// app.use(secure);
app.use(myLog);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use('/product',routerProduct);
app.use('/order',routerOrder);
app.use('/user',routerUser);
app.use('/category',routerCategory);

module.exports=app;
