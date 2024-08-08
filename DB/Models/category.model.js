
import { Schema, Types, model } from "mongoose";



const categorySchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  parentId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  addedby:{type:Schema.Types.ObjectId,ref:'User'}
});




export default model('Category',categorySchema)

