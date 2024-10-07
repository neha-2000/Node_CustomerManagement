const asyncHandler=require("express-async-handler");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const User=require("../models/userModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const registerUser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All responses are mandetory");
    }

    const userAvailable=await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered")
    }

    const hashedPassword=await bcrypt.hash(password,10)
    console.log("hashedPassword",hashedPassword)
    
    const user=await User.create({
        username,email,password:hashedPassword
    });
   if(user){
    res.status(200).json({_id:user.id,
        email:user.email
    })
   }else{
    res.status(400);
    throw new Error("User data is not valid");
   }
    
})


//@desc login user
//@route GET /api/users
//@access public
const loginUser=asyncHandler(async(req,res)=>{

    const{email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }

    const user=await User.findOne({email});
    // compare password with hash password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },process.env.ACCESS_TOKEN_SECERT,
        {expiresIn:"1m"}
    )
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or password is invalid")
    }
    res.json({message:"loginUser the user"})
})

//@desc current user
//@route GET /api/users
//@access private
const getCurrentUser=asyncHandler(async(req,res)=>{
    console.log("req---------------------->",req.body)
    res.json(req.user)
})



module.exports={registerUser,loginUser,getCurrentUser}