
import categoryModel from "../../../DB/Models/category.model.js";

import slugify from "slugify";


export const addcategory=async(req,res,next)=>{
    const{name,type,parentId}=req.body;
    const{_id}=req.authUser;


    const isnamesxist=await categoryModel.findOne({name});
    if(isnamesxist) return next(new Error("category name already exist"));

    

    const categorydata={
        name,
        addedby:_id,
        type,
        parentId


    }
    const categorycreated=await categoryModel.create(categorydata);
    ///rollback
    req.saveddocument={model:categoryModel,_id:categorycreated._id}
   
    res.status(200).json({message:"category created",data:categorycreated});
}

export const updatecategory=async(req,res,next)=>{
    const{name,type}=req.body;
    const{categoryid}=req.params;

    const category=await categoryModel.findById(categoryid);
    if(!category) return next(new Error("category not found"));
    
    if(name){
        const findname=await categoryModel.findOne({name});
        if(findname) return next(new Error("please enter another name"));

        category.name=name;
    }
    if(type){
       category.type=type
    }
    

     await category.save();
     res.status(200).json({message:"updated",date:category});   
}

export const gettcategorys=async(req,res,next)=>{
     
    const categories=await categoryModel.find()
    res.json({message:"categorys and sub categories",data:categories});
}

export const deletecategory=async(req,res,next)=>{
    
    //destructing data

    const{categoryid}=req.params;
    const{_id}=req.authUser;

    ///check on category 
    const categoryisexist=await categoryModel.findById(categoryid);

    if(!categoryisexist) return next(new Error("category not found"));

    const deletecategoryy=await categoryModel.findByIdAndDelete(categoryid);

    res.status(200).json({message:"category deleted"})
}

