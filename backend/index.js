import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// socket io
import { Server } from "socket.io";

// set express
const app = express();

// read json
app.use(express.json());

// enviroment variables config
dotenv.config();

// database connection
connectDB();

// cors configuration
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    // console.log(origin);

    if (whitelist.includes(origin)) {
      // allowed consult API
      callback(null, true);
    } else {
      // not allowed
      callback(new Error("Cors error"));
    }
  },
};

app.use(cors(corsOptions));

// routing
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// set port
const PORT = process.env.PORT || 4000;

// deploy
const nodeServer = app.listen(PORT, () => {
  console.log(`Set connection in port ${PORT}`);
});

// set sokect io
const socketIo = new Server(nodeServer, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

socketIo.on("connection", (socket) => {
  console.log("Connection established with Scoket io");

  // Socket Io Events
  socket.on("open_project", (project_id) => {
    socket.join(project_id);
    // console.log("DESDE PROJECT ->", project_id);
  });

  socket.on("new_task", (task) => {
    const projectId = task.project;

    socket.to(projectId).emit("task_added", task);
  });

  socket.on("delete_task", (data) => {
    const { taskId, projectId } = data;
    socket.to(projectId).emit("task_deleted", { taskId, projectId });
  });

  socket.on("edit_task", (taskUpdated) => {
    const projectId = taskUpdated.project._id;
    socket.to(projectId).emit("task_updated", taskUpdated);
  });
});
