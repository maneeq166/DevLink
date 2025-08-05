import Link from "../models/link.model.js";
import User from "../models/user.model.js";

export async function getProfile(req,res){
    const userId = req.userId;

    const user = await User.findById(userId).select(" -password");

    if(!user){
        return res.status(404).json({message:"Login first!"})
    }

    const links = await Link.findOne({user:userId})

    // if(!links){
    //     return res.status(404).json({message:"No Url Found",success:false})
    // }

    return res.json({user,links,success:true});
}

export async function updateProfile(req,res){
    const id = req.userId;

    const user= await User.findById(id).select("username email");

    if(!user){
        return res.status(400).json({message:"User not found",success:false})
    }

    const {username,email} = req.body;

    if(username){
        user.username=username;
    }

    if(email){
        user.email=email;
    }

    const updatedUser = await User.findByIdAndUpdate(id,{user});


    if(updatedUser){
        return res.status(500).json({message:"Something went wrong",success:false})
    }


    return res.status(201).json({message:"Updated your profile!",success:true});

}


export async function getOtherProfile(req,res){
    const userId = req.params.id;

    if(!userId){
        return res.status(404).json({message:"Something went wrong!",success:false})
    }

    const otherProfle = await User.findById(userId);

    if(!otherProfle){
        return res.status(404).json({message:"Could not find User!",success:false})
    }
    const links = await Link.findOne({user:userId});

    // if(!links){
    //     return res.status(404).json({message:"No Url Found",success:false})
    // }

    return res.status(200).json({message:"Founded the User!",otherProfle,links,success:true})
}