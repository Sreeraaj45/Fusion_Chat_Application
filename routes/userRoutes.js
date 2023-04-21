const express = require('express');

const user_route = express()

const bodyParser = require('body-parser');

const session = require('express-session');

const {SESSION_SERECT} = process.env 

user_route.use(session({secret: SESSION_SERECT}))

user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({extended: true}))

user_route.set('view engine', 'ejs')
user_route.set('views','./views')

user_route.use(express.static('public'))
user_route.use(express.static('public/images'))

user_route.use(express.static(__dirname + '../public'));

const path = require('path');
const multer = require('multer');

// Setting up multer storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,path.join(__dirname,'../public/images'))
    },
    filename: function(req, file, cb){
        const name = Date.now() + '-' + file.originalname
        cb(null,name)
    }
})

const userController = require('../controllers/userControllers')

const upload = multer({storage: storage})


// Registration of a user routes
user_route.get('/register',userController.registerLoad)
user_route.post('/register',upload.single('image'),userController.register)

//load Profile page
user_route.get('/profile',userController.loadProfile)

//Login user routes
user_route.get('/',userController.loadLogin)
user_route.post('/',userController.login)

// Logout Routes  
user_route.get('/logout',userController.logout)

// Dashboard routes
user_route.get('/home',userController.loadDashboard)

user_route.post('/save-chat',userController.saveChat)

//search users
user_route.post('/search',userController.searchUser)


// Group Chat Routes
// user_route.get('/groups',userController.loadGroups)
// user_route.post('/groups',userController.createGroups)

user_route.post('/communities', upload.single('image'), userController.createCommunity)

user_route.post('/groups/:groupId/members',userController.addMembers)

// setting up the routes for following
user_route.post('/follow/:userId',userController.followUser)

user_route.get('*',function(req, res){
    res.redirect('/')
})  


module.exports = user_route

