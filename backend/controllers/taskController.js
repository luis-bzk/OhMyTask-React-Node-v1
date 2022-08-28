import Project from "../models/Project.js";
import Task from "../models/Task.js";

const addTask = async (req, res) => {
  const { project } = req.body;

  const projectVerify = await Project.findById(project);

  if (!projectVerify) {
    const error = new Error("Project not found");
    return res.status(404).json({ message: error.message });
  }

  if (projectVerify.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(403).json({ message: error.message });
  }

  try {
    const storedTask = await Task.create(req.body);

    // save id -> project
    projectVerify.tasks.push(storedTask._id);
    await projectVerify.save();
    res.json(storedTask);
  } catch (error) {
    console.log(error);
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;

  // security
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid Token");
    return res.status(404).json({ message: error.message });
  }

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("This task dont exist");
    return res.status(404).json({ message: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(403).json({ message: error.message });
  }

  res.json(task);
};

const updateTask = async (req, res) => {
  const { id } = req.params;

  // security
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid Token");
    return res.status(404).json({ message: error.message });
  }

  const task = await Task.findById(id).populate("project");

  // console.log(task);

  if (!task) {
    const error = new Error("This task dont exist");
    return res.status(404).json({ message: error.message });
  }

  if (
    task.project.creator.toString() !== req.user._id.toString() &&
    !task.project.collaborators.some(
      (collab) => collab._id.toString() === req.user._id.toString()
    )
  ) {
    const error = new Error("Invalid Action");
    return res.status(403).json({ message: error.message });
  }

  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  task.state = req.body.state || task.state;
  task.dateDelivery = req.body.dateDelivery || task.dateDelivery;
  task.priority = req.body.priority || task.priority;

  if (task.state === "to do") {
    task.taked = null;
    task.completed = null;
  }

  if (task.state === "in progress") {
    task.taked = req.user._id;
    task.completed = null;
  }

  if (task.state === "done") {
    task.completed = req.user._id;
  }

  try {
    await task.save();

    const storedTask = await Task.findById(id)
      .populate("project")
      .populate({ path: "taked", select: "name" })
      .populate({ path: "completed", select: "name" });

    res.json(storedTask);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  // security
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid Token");
    return res.status(404).json({ message: error.message });
  }

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("This task dont exist");
    return res.status(404).json({ message: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid Action");
    return res.status(403).json({ message: error.message });
  }

  try {
    const project = await Project.findById(task.project);
    project.tasks.pull(task._id);

    await Promise.allSettled([await project.save(), await task.deleteOne()]);

    res.json({ message: "task deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

const changeTaskState = async (req, res) => {};

export { addTask, getTask, updateTask, deleteTask, changeTaskState };
