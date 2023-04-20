const mongoose = require('mongoose');

const groupSchema = mongoose.Schema(
  {
    creator_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: true
    },
    members: [
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
);

module.exports = mongoose.model('Community', groupSchema);