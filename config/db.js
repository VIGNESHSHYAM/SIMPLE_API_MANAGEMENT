import mongoose from "mongoose"


export async function db(){
    if(mongoose.connection.readyState>=1) return;
  
   try { await mongoose.connect("YOUR_MONGODB_URL",{
  
   })   
   console.log("✅ MongoDB connected");
} catch (error) {
  console.error("❌ MongoDB connection error:", error);
  throw error;
}
}


