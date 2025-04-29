import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name:         { type: String, required: true, unique: true , trim:true, default:"developer"},  // eg: "admin", "developer", "consumer"
    permission:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" , require:true}],
  },
{timestamps:true}

);
  
export const RoleModel = mongoose.models.Role || mongoose.model("Role",RoleSchema);