import {Post} from "../models/post.model.js";

//create a post
const createPost=async (req,res)=>{
    try{
        const {name, description, age}=req.body;
        if(!name||!description||!age){
            return res.status(400).json({
                message: "All fields required"
            });
        }
        const post=await Post.create({name, description, age});
        res.status(201).json({
            message: "Post created Successfully"
        });
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getPosts= async (req, res) => {
    try{
        const posts= await Post.find();
        res.status(200).json(posts);
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const updatePosts= async (req, res) => {
    try{
        //basic validation
        if(Object.keys(req.body).length===0){
            return res.status(400).json({
                message: "no data provided for update"
            });

        }
        const post= await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!post) return res.status(404).json({
            message: "Post not found"
        });
        res.status(200).json({
            message: "Post Updated Successfully"
        })
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


const deletePost=async (req,res)=> {
    try{
        const deleted=await Post.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({
            message: "Post not found"
        });
        res.status(200).json({
            message: "Post Successfully Deleted!"
        });
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export { 
    createPost,
    getPosts,
    updatePosts,
    deletePost
};