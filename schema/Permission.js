import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
   name: {type:String,
    require:true,
    unique:true,
    trim:true}
   
},
{
    timestamps:true
}
)
export const PermissionModel = mongoose.models.Permission || mongoose.model("Permission",PermissionSchema)