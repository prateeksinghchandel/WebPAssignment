import {User} from "../models/user.model.js";

const regesterUser= async (req, res) => {
    try{
        const {username, email, password}=req.body;

        //basic validation

        if(!username||!email||!password){
            return res.status(400).json({message: "All fields are important!"})
        }

        //check if user exists already
        const existing= await User.findOne({email: email.toLowerCase()});
        if(existing){
            return res.status(400).json({message: "user already exists!"});
        }
        //create user
        const user=await User.create({
            username,
            email: email.toLowerCase(),
            password,
        });
        res.status(201).json({
            message: "User regestered",
            user: {id:user._id, email:user.email, username: user.username}
        });
    } catch(error){
        res.status(500).json({message: "Internal Server Error", error:error.message});
    }
};

const loginUser= async (req, res) =>{
    try{

        //checking if the user already exists
        const{email, password}= req.body;

        const user=await User.findOne({
            email: email.toLowerCase()
        });

        if (!user)return res.status(400).json({
            message: "User not found"
        });

         //coompare passwords
         const isMatch=await user.comparePassword(password);
         if(!isMatch)return res.status(400).json({
            message: "Invalid Credentials"
         })
         res.status(200).json({
            message: "User LOgged in",
            user:{
                id: user._id,
                email: user.email,
                userame: user.username
            }
         })
    } catch (error){
        res.status(500).json({
            message: "Internal Server ERROR"
        })
    }
}

const logoutuser =async(req, res) => {
    try{
        const {email}= req.body;

        const user= await User.findOne({
            email
        });
        if(!user) return res.status(404).json({
            message: "User not found"
        });
        res.status(200).json({
            message: "Logout Successful"
        });

    }catch(error){
        res.status(500).json({
            message: "Insternal Server Error"
        });
    }
}

export {
    regesterUser,
    loginUser,
    logoutuser
};