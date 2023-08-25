const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Admin = require("../models/admin");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/Tlogin')

router.post("/adminReg",(req,res)=>{
    console.log(req.body)
   const {name,password,email} = req.body 
//   console.log(req.body )
  if(!email || !password || !name  ){
     return res.status(422).json({error:"please add all the fields"})
  }
  Admin.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:"user already exists with that email"})
      }
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
            const user = new Admin({
               
                password:hashedpassword,name,email
                
            })
         
            user.save()
            .then(user=>{
                
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
      })
     
  })
  .catch(err=>{
    console.log(err)
  })
})
router.post("/adminSign",(req,res)=>{
    const {email,password} = req.body
  
    console.log(req.body)
   
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    Admin.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {name,email} = savedUser
               res.json({token,user:{name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
  })


module.exports = router;