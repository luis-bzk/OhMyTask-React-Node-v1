import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      default: "to do",
      enum: ["to do", "in progress", "done"],
    },
    dateDelivery: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    completed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    taked: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
