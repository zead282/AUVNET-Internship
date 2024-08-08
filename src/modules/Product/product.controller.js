
import productmodel from '../../../DB/Models/product.model.js';
import { systemRoles } from '../../utils/system-roles.js';

import { paginationfunction } from '../../utils/pagination.js';
import {API_features} from '../../utils/api-features.js'
export const addproduct=async(req,res,next)=>{
    //destruct data

    const{title,price,stock}=req.body;
    const{categoryId}=req.query
    const{_id}=req.authUser;


   //// product
   const productt={title,price,stock,
    categoryId,addedBy:_id,
   }  

   const newproduct=await productmodel.create(productt);
   req.saveddocument={model:productmodel,_id:newproduct._id}

   res.status(201).json({ success: true, message: 'Product created successfully', data: newproduct })


}


////update api

export const updatedproduct=async(req,res,next)=>{

   ///destructing data
   const{_id}=req.authUser;
   const{productid}=req.params;
   const{title,stock,price}=req.body;

   ////check product
   
   const isproduct=await productmodel.findById(productid);
   if(!isproduct) return next({message:"product not found",cause:400});

   ///check on authorization

   console.log(isproduct.addedBy);
   console.log(_id);
   if(isproduct.addedBy.toString() !== _id.toString()) return next({message:"you are not allowed "})
   

      
   
   if(title){
      isproduct.title=title
    
   }   

  
   if(stock) isproduct.stock=stock

   if(price) isproduct.price=price

  
   await isproduct.save();

   res.status(200).json({message:"updated",product:isproduct})
}


////get all products

export const getallproducts=async(req,res,next)=>{
   const{page,size,sortby,...query}=req.query
   const features=new API_features(req.query,productmodel.find()).pagination({page,size})

   const products=await features.mongoosequery


   res.status(202).json({message:"products",products})
}

///delete product

export const deleteproduct=async(req,res,next)=>{
  
   //destructing data

   const{_id}=req.authUser;
   const{productid}=req.params;
   
   //check on product
   const isproductexist=await productmodel.findById(productid);
   if(!isproductexist) return next({message:"product not found "})

   ///product found
   if(isproductexist.addedBy != _id && req.authUser.role=='user') return next({message:"you are not allowed "})//user delete his product only

   const deleteproduct=await productmodel.findByIdAndDelete(productid)

   res.status(200).json({message:"product deleted successfully"})

}