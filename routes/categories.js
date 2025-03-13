var express = require('express');
var router = express.Router();
let categoriesModel = require('../schemas/categories')
let {CreateErrorRes,
  CreateSuccessRes} = require('../utils/responseHandler')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let categories = await categoriesModel.find({
    isDeleted:false
  })
  CreateSuccessRes(res,categories,200);
});
router.get('/:id', async function(req, res, next) {
  try {
    let category = await categoriesModel.findOne({
      _id:req.params.id, isDeleted:false
    }
      
    )
    CreateSuccessRes(res,category,200);
  } catch (error) {
    next(error)
  }
  
});
router.post('/', async function(req, res, next) {
  try {
    let body = req.body
    let newCategory = new categoriesModel({
      name:body.name,
      description:body.description,
    })
    await newCategory.save();
    CreateSuccessRes(res,newCategory,200);
  } catch (error) {
    next(error)
  }
});
router.put('/:id', async function(req, res, next) {
  let id = req.params.id;
  try {
    let body = req.body
    let updatedInfo = {};
    if(body.name){
      updatedInfo.name = body.name;
    }
    if(body.description){
      updatedInfo.description = body.description;
    }
    let updateDescription = await categoriesModel.findByIdAndUpdate(
      id,updatedInfo,{new:true}
    )
    CreateSuccessRes(res,updateDescription,200);
  } catch (error) {
    next(error)
  }
});
router.delete('/:id', async function(req, res, next) {
  let id = req.params.id;
  try {
    let body = req.body
    let updateDescription = await categoriesModel.findByIdAndUpdate(
      id,{
        isDeleted:true
      },{new:true}
    )
    CreateSuccessRes(res,updateDescription,200);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
