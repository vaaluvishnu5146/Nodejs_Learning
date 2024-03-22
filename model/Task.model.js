const mongoose = require("mongoose");

// Create schema
const TaskSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    completed: { type: Boolean, default: false },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;
