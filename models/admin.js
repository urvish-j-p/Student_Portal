const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:true
        },
        pic:{
         type:String,
         default:"https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png"
        }
    }
)
const Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;