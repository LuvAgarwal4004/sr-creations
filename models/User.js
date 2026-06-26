import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    default: null
  },

  image: {
    type: String,
    default: ""
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  },
  orderInProgress: {
    type: Boolean,
    default: false
  },

  cart: [
    {
      productId: String,
      qty: Number
    }
  ]

});

export default mongoose.models.User ||
  model("User", UserSchema);