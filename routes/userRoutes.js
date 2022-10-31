const express = require('express');
const User = require('../schema/user-schema');
const userRouter = express.Router();
const ObjectId = require('mongodb').ObjectId;

userRouter.route('/user/register').post(async (req, res) => {
    var user = new User({
        _id: new ObjectId(),
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password, //hash later...
        tilesets: [],
        shared_tilesets: [],
        maps: [],
        shared_maps: [],
        likes: 0,
        dislikes: 0,
        bio: "bio",
        featured: [],
        accountCreated: Date.now()
    })
    await user.save()
        .then((user) => {res.json({user: user})})
        .catch((err) => {res.json({errorMessage: err.message})})
})

userRouter.route('/user/login').post(async (req, res) => {
    //hash password later bcrypt...
    var user = await User.findOne({userName: req.body.userName, password: req.body.password})
    if (user == null){
        res.status(400).json({errorMessage: "Username password combination not found"})
    }
    else{
        req.session._id = user._id.toString()
        res.json({user: user})
    }
})

userRouter.route('/user/logout').post(async (req, res) => {
    if (req.session._id == undefined){
        res.status(400).json({errorMessage: 'Not logged in'})
    }
    else{
        req.session.destroy()
        res.json({message: 'success'})
    }
})

userRouter.route('/user/loggedin').get(async (req, res) => {
    if (req.session._id == undefined){
        res.json({loggedIn: false})
    }
    else{
        var user = await User.findById(req.session._id)
        if (user != null){
            res.json({user: user, loggedIn: true})
        }
        else{
            req.session.destroy()
            res.status(400).json({errorMessage: 'Couldnt find user'})
        }
    }
})

module.exports = userRouter;