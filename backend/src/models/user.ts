import mongoose from "mongoose";
import bcrypt from "bcryptjs"
// we are defining the TypeScript Type
export type UserType={
    _id:string;
    email:string;
    password:string;
    firstName:string;
    lastName:string;
};
// specifying the structure of document in the user collection 
const userSchema=new mongoose.Schema({
    email:{type : String,required:true,unique:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},

});
// making a model which should be of type UserType 
/*
The model here User is collection in MongoDb.It wraps around the user schema and provided methods for working with user documents in the database.
*/

// here we are defining the middleware 
userSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,8)

    }
    next()
})
const User=mongoose.model<UserType>("User",userSchema)

export {User}
/*

This file contains the MongoDb Schema and Model 
*/