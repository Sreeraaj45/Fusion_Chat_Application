const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: false
    },
    email:{
        type: String,
        required: [true, "Please provide an Email"],
        unique: [true, "Email exists!!"]
    },
    phone:{
        type: Number,
        required: true,
        unique: false
    },
    password:{
        type: String,
        required: [true, "Please provide a password!!"],
        unique: false
    },
    isOnline:{
        type:String, 
        default: '0'
    },
    image:{
        type: String,
        required: true
    }
},
{timestamps: true}
)

const User = mongoose.model("details",UserSchema)

module.exports = User