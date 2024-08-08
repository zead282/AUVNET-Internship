import usermodel from '../../../DB/Models/user.model.js';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';
export const signup=async(req,res,next)=>{
    const {
        username,
        email,
        password,
        role,
    } = req.body

    const isemailexist=await usermodel.findOne({email});
    if(isemailexist) return next(new Error("email already exist"));

    const hashpassword=bcrypt.hashSync(password,+process.env.SALT_ROUNDS); ///salt rounds must include from env file

    const newuser=await usermodel.create({username,password:hashpassword,role,email});
    if(!newuser) return next(new Error('Something went wrong, please try again later', { cause: 500 }));
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newuser
    })
}


export const signin=async (req, res, next) => {

    const{username,password}=req.body;

    const user=await usermodel.findOne({username});

    if(!user) return next(new Error('User not found', { cause: 404 }));

    
    const ispasswordmatch=bcrypt.compareSync(password,user.password);
    if(!ispasswordmatch) return next(new Error('Invalid password', { cause: 401 }));

    const accesstoken=jwt.sign({email:user.email,_id: user._id,role:user.role},process.env.JWT_SECRET_LOGIN , { expiresIn: '1d' });///jwt secret must include from env file

    
    await user.save()
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: accesstoken
    })
}

