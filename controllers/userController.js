const models=require('../models/index').sequelize.models;
const bcrypt=require('bcryptjs');

exports.getUsers = (req, res, next) => {
    models.user.findAll().then(
        (users)=>{
            console.log(users);
            res.send(users);
        })
        .catch(
            (err)=>{
                res.send(err);
            });
};

exports.getUserById = (req, res, next) => {
    id=req.params.user_id;
    models.user.findOne({where:{id:id},include: [{model: models.post,as:'posts'}] } ).then(
        (user)=>{
            res.send(user);
        })
        .catch(
            (err)=>{
                res.send(err);
            });
};

exports.updateUser = (req, res, next) => {
    id=req.params.product_id;
    models.user.findOne({where:{id:id} } ).then(
        // db.sequelize.models.user.findByPk(id).then(
        (user)=>{
            user.password=req.body.password;
            return  user.save();
            res.send(user);
        }).then(
        ()=>{
            console.log('product updated');
        }
        ).catch(
            (err)=>{
                res.send(err);
            });
};

exports.deleteUser = (req, res, next) => {
    id=req.params.product_id;
    db.sequelize.models.user.findOne({where:{id:id} } ).then(
        // db.sequelize.models.user.findByPk(id).then(
        (user)=>{
            return user.destroy();
        }).then(
        (result)=>{
            res.send(result);
        }
    ).catch(
        (err)=>{
            res.send(err);
        });
};
