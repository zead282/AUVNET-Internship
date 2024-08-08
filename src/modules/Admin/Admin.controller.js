import userModel from "../../../DB/Models/user.model.js";
import bcrypt from 'bcryptjs';

export const deleteaccount=async(req,res,next)=>{
    const{_id}=req.authUser;
    const{adminid}=req.body
    const finduser=await userModel.findByIdAndDelete(adminid);
    

    if(!finduser) return next(new Error("account not found"));

    res.status(200).json("deleted success");
}


export const updateadmin=async(req,res,next)=>{

    const{username,email}=req.body;
    const{adminid}=req.params
   if(email){
    const isemailexist=await userModel.findOne({email});
    if(isemailexist) return next(new Error("email already exist"));
   }
   
    const updateuser=await userModel.findByIdAndUpdate(adminid,{username,email},{new:true})

    if(!updateuser) return next(new Error("wrong to update"));

    res.status(200).json("user updated succesfully");
    
}

export const addadmin=async(req,res,next)=>{

  const {
    username,
    email,
    password,
    
} = req.body

const isemailexist=await userModel.findOne({email});
if(isemailexist) return next(new Error("email already exist"));

const hashpassword=bcrypt.hashSync(password,+process.env.SALT_ROUNDS); ///salt rounds must include from env file

const newuser=await userModel.create({username,password:hashpassword,role:'admin',email});
if(!newuser) return next(new Error('Something went wrong, please try again later', { cause: 500 }));
res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newuser
})

}
////view admin
export const viewadmin=async(req,res,next)=>{

  const{_id}=req.authUser;

  const alladmins=await userModel.find({role:'admin'});

  res.status(200).json({admins:alladmins});

}
//view user
export const viewuser=async(req,res,next)=>{



  const allAdmins = await userModel.find({ role: 'user' });

  res.status(200).json({admins:allAdmins});

}

//delete user

export const deleteuser=async(req,res,next)=>{

  const{userid}=req.body;
  const iseuserexist=await userModel.findByIdAndDelete(userid);
  if(!iseuserexist) return next(new Error("user not found"))

  res.status(200).json("deleted success")  


}
  