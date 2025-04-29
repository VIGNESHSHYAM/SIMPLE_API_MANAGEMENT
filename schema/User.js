import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 20,        // lowercase, but maxLength also works
    trim: true
  },
  email: {
    type: String,
    required: true,       // corrected
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true        // corrected
  },
  Role:[{
    type:mongoose.Schema.Types.ObjectId, ref:"Role", require:true
  }]
}, {
  timestamps: true        // adds createdAt & updatedAt
});

// Use existing model if it’s already been compiled,
// otherwise create a new one
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
