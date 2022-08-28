// new
import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    bgcolor: {
      type: String,
      default: "#FFFFFF",
      enum: [
        "#FFFFFF",
        "#FEE2E2",
        "#FEF3C7",
        "#ECFCCB",
        "#E0F2FE",
        "#E0E7FF",
        "#F3E8FF",
        "#FFE4E6",
      ],
    },
    dateDelivery: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    client: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
