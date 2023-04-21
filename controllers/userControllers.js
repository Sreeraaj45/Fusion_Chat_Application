const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Group = require('../models/groupModel')
const user_route = require('../routes/userRoutes'); 

const registerLoad = async(req, res) => {
    try {
         
        res.render('signup',{invalid:"",signup:""})

    } catch (error) {
        console.log(error.message)
    }
}

const loadProfile = async(req, res) => {
    try {
        var users = await User.find({_id : {$eq: [req.session.user._id]}})
        res.render('profile',{users:users})

    } catch (error) {
        console.log(error.message)
    }
}

const register = async (req, res) => { 
    
    try {

        console.log(req.body)
        
        const passwordHash = await bcrypt.hash(req.body.password,10)

        const user = new User({ 
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: 'images/' + req.file.filename,
            password: passwordHash,
        })

        await user.save() 

        res.render('signup', {signup: 'Your Registration is done!!!',invalid:""})

    } catch (error) {  
        console.log(error.message)
    }

}

const loadLogin = async (req, res) => {
    try {

        res.render('login',{signup:"",invalid:""})
        
    } catch (error) {
        console.log(error.message)
    }
}

const login = async (req, res) => {
    try {

        const email = req.body.email
        const password = req.body.password

        const userData = await User.findOne({email: email})
        if(userData){

            const passwordMatch = bcrypt.compare(password,userData.password)

            if(passwordMatch){
                req.session.user = userData
                res.redirect('/home')
            }
            else{
                res.render('login',{invalid:"Incorrect Password",signup:""})
            }

        }else{
            res.render('login',{invalid:"Email ID is incorrect",signup:""})
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

const loadDashboard = async (req, res) => {
    try {

        var users = await User.find({_id : {$eq: [req.session.user._id]}})

        var friends = await User.find({_id : {$nin: [req.session.user._id]}})

        var groups = await Group.find({
            $or: [
              { creator_id: req.session.user._id },
              { 'members._id': req.session.user._id }
            ]
          });

        console.log(groups)

        res.render('home',{user: req.session.user, users: users, frnds: friends, groups: groups})
        
    } catch (error) { 
        console.log(error.message)
    } 
}

const logout = async (req, res) => {
    try {

        req.session.destroy()
        res.redirect('/')
        
    } catch (error) {
        console.log(error.message)
    }
}

const saveChat = async(req, res) => {
    try {

        var chat = new Chat({
            sender_id: req.body.sender_id,
            receiver_id: req.body.receiver_id, 
            message: req.body.message,
        })

        var newChat = await chat.save()
        res.status(200).send({success: true, msg:"Chat inserted!!",data:newChat})

        
    } catch (error) {
        res.status(400).send({success: false, msg:error.message}) 
    }
}

const searchUser = async(req, res) => {
    const searchTerm = req.query.term;
    const users = await User.find({ name: { $regex: searchTerm, $options: 'i' } }).fetch();
    res.json({ users });
}

// const loadGroups = async (req, res) => {
//     try {

//         var users = await User.find({_id : {$eq: [req.session.user._id]}})

//         var friends = await User.find({_id : {$nin: [req.session.user._id]}})

//         res.render('group',{user: req.session.user, users: users, frnds: friends})
        
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const createGroups = async (req, res) => {
//     try {

//         console.log(req.body) 
         
//     } catch (error) {
//         console.log(error.message)
//     }
// }

const createCommunity = async (req, res) => {

        try {

            //console.log(req.body)
            
            const community = new Group({
                creator_id: req.session.user._id,
                name: req.body.group_name,
                image: 'images/' + req.file.filename, 
                description: req.body.group_desc,
            });

            await community.save()

            // res.status(201).json({
            //     message: "Community created succesfully!!"
            // })

         var users = await User.find({_id : {$eq: [req.session.user._id]}})

         var friends = await User.find({_id : {$nin: [req.session.user._id]}})

         var groups = await Group.find({creator_id : {$eq: [req.session.user._id]}})
 
         res.render('home',{user: req.session.user, users: users, frnds: friends, groups: groups})

        } catch (error) {
            res.status(500).json({
                message: 'Error creating community!',
                error,
              });
        }
            
}


const addMembers = async(req, res) => {


    const groupId = req.params.groupId;
    const name = req.body.name;
    const email = req.body.email;

    // Find user by name and email
    const user = await User.findOne({name, email});

    if (!user) {
        return res.status(404).send('User not found');
    } 

    // Add member to the group in the database
    const group = await Group.findByIdAndUpdate(groupId, {$push: {members: user}}, {new: true});

    res.send('Member added to group successfully');

}

const followUser = async(req, res) => {

    const { userId } = req.params;
    const { followerId } = req.body;

    console.log(followerId)

    User.findByIdAndUpdate(userId, { $push: { followers: followerId } }, { new: true })
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.error('Failed to follow user', err);
            res.status(500).json({ message: 'Failed to follow user' });
        });

}

 

module.exports = {
    register,
    registerLoad,
    loadLogin,
    login,
    loadDashboard,
    logout,
    saveChat,
    searchUser,
    createCommunity,
    addMembers,
    loadProfile,
    followUser
}