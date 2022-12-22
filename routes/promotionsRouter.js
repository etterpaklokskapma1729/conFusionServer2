const express = require('express');
const bodyParser = require('body-parser');

const Promotions = require('../models/promotions');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
.get((req, res, next)=>{
        Promotions.find({})
        .then((promotions)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotions)
        }, (err)=> next(err))
        .catch((err)=> next(err));
})
.post((req, res, next) => {
    Promotions.create(req.body)
    .then((dish)=>{
        console.log('Dish Created', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err)=> next(err))
    .catch((err)=> next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    Promotions.deleteOne({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err)=> next(err))
    .catch((err) => next(err));
});

promotionsRouter.route('/:promotionsId')
.get((req, res, next)=>{
        Promotions.findById(req.params.dishId)
        .then((promotions)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotions)
            res.send(mongoose.Types.ObjectId.isValid('iudbc32fb2ou3rb32'));
        }, (err)=> next(err))
        .catch((err)=> next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/' + req.params.dishId);
})
.put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.dishId, {
        $set : req.body
    }, { new : true})
    .then((promotions)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions)
    }, (err)=> next(err))
    .catch((err)=> next(err));
})
.delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.dishId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp)
    }, (err)=> next(err))
    .catch((err)=> next(err));
});

module.exports = promotionsRouter;