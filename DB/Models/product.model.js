
import mongoose, { Schema, model } from "mongoose";



const productschema=new Schema({
    ///strings
   title:{type:String,required:true,trim:true},
  
 

  ///numbers
   price:{type: Number, required: true },
   stock:{type:Number,min:0,default:0,required:true},
   


    // objectIds
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   
   
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
},
{timestamps:true})


export default mongoose.models.Product || model('Product',productschema);