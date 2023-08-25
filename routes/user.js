const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')


  
router.post('/signup',(req,res)=>{
   const {firstname,lastname,stateName,email,password,pic,mobile,city,branch} = req.body 
//   console.log(req.body )
  if(!email || !password || !firstname || !mobile || !city || !branch){
     return res.status(422).json({error:"please add all the fields"})
  }
  User.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:"user already exists with that email"})
      }
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
            const user = new User({
                email,mobile,city,branch,
                password:hashedpassword,
                firstname,lastname,stateName,
                pic
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


router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    console.log(req.body)
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id, firstname,lastname,stateName,email,pic,mobile,city,branch,isAdmin} = savedUser
               res.json({token,user:{_id, firstname,lastname,stateName,email,pic,mobile,city,branch,isAdmin}})
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


// router.put('/updatepic',requireLogin,(req,res)=>{
//     User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
//         (err,result)=>{
//          if(err){
//              return res.status(422).json({error:"pic canot post"})
//          }
//          res.json(result)
//     })
// })


module.exports = router