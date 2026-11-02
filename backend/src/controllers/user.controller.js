import {User} from "../models/user.model.js";

const regesterUser= async (req, res) => {
    try{
        const {usernme, email, password}=req.body;

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
export {
    regesterUser
}