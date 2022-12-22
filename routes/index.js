var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dishes/:dishid', function(req, res, next){
  if (!isValidObjectId(req.params.dishId)){
    res.render('error', { title : 'Non Object id is entered', message : 'error'}, (err)=>{res.send(err);});
  }
});

function isValidObjectId(id){
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

module.exports = router;
