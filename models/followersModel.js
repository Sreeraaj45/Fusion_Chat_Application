const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
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
    followers: [
        {
          name: {
            type: String,
            required: true
          },
          email: {
            type: String,
            required: true
          }
        }
      ]
},
{timestamps: true}
)

const userFollowers = mongoose.model("userFollowers",followerSchema)

module.exports = userFollowers