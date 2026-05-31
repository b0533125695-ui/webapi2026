const bcrypt = require('bcrypt');
const pass = 'mb1470';
const roundSalt = 10;

bcrypt.hash(pass, roundSalt).then((hashPass)=>{
    console.log(hashPass);
}).catch((err)=>{
    console.log(err);
})

let hashPass="";
bcrypt.compare(pass, hashPass).then((status)=>{
    if(status)
        console.log('good')
    else
        console.log('not good');
})