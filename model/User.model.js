const mongoose = require("mongoose");

// Create schema
const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    // roles: {
    //   type: Object,
    //   default: {
    //     dashboardAccess: true,
    //     gpt1: true,
    //     gpt2: true,
    //     gpt3: false,
    //   }, // user, manager, team lead
    // },
    // roles: {
    //   type: Array,
    //   default: ["gpt1", "gpt2", "gpt3"], // user, manager, team lead
    // },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
