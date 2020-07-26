const models=require('../models/index').sequelize.models;
const bcrypt=require('bcryptjs');
const {validationResult}=require('express-validator/check');
const jwt=require('jsonwebtoken');
const config=require('../config/config.json');


exports.register = (req, res, next) => {
    const error=validationResult(req);
    if(!error.isEmpty()){
        console.log(error.array())
        return res.status(422).json({
            'status':false,
            'message':error.array()[0]
        });
    }
    models.user.create({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,12),
        createdAt:Date.now(),
        updatedAt:Date.now(),
    }).then(
        (user)=>{
            const token=jwt.sign({
                email:user.email,
                userId:user.id
            },config.jwt.secret,
                {expiresIn: config.jwt.tokenLife});
            res.status(201).json({'user':user,'token':token});
        })
        .catch(
            (err)=>{
                res.send(err);
            });
};

exports.login = async (req, res, next) => {
    const email=req.body.email;
    const password=req.body.password;
    try {
        const user= await models.user.findOne({where: {email: email}});
        const checkPassword=await bcrypt.compare(password,user.password);
        if(checkPassword){
            const token=jwt.sign({
                    email:user.email,
                    userId:user.id
                },config.jwt.secret,
                {expiresIn: config.jwt.tokenLife});
            res.status(201).json({'user':user,'token':token});
        }else {
            res.status(403).json({'success':false,'message':'an error occured'});
        }
    }catch (e) {
        res.status(403).json({'success':false,'message':'an error occured'});
    }

};

exports.me =async (req, res, next) => {
    id=req.userId;
    try {
        const user=await models.user.findOne
        ({where:{id:id},include: [{model: models.post,as:'posts'}] } );
        res.status(201).json({'success':true,'user':user});
    }catch (e) {
        res.status(403).json({'success':false,'message':'an error occured'});
    }



};


