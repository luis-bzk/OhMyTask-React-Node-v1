// new
import Project from "../models/Project.js";
import User from "../models/User.js";

const newProject = async (req, res) => {
  const project = new Project(req.body);
  project.creator = req.user._id;

  try {
    const storedProject = await project.save();
    res.json(storedProject);
  } catch (error) {
    console.log(error);
  }
};

const getProjects = async (req, res) => {
  const projects = await Project.find({
    $or: [
      {
        collaborators: {
          $in: req.user,
        },
      },
      {
        creator: {
          $in: req.user,
        },
      },
    ],
  }).select("-tasks");

  res.json(projects);
};

const getProject = async (req, res) => {
  const { id } = req.params;

  // security
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid Token");
    return res.status(404).json({ message: error.message });
  }

  const project = await Project.findById(id.trim())
    .populate({
      path: "tasks",
      populate: [
        { path: "taked", model: "User", select: "name" },
        { path: "completed", model: "User", select: "name" },
      ],
    })
    .populate("collaborators", "name lastname phone email");

  // security
  if (!project) {
    const error = new Error("Project not found");
    return res.status(404).json({ message: error.message });
  }

  // security
  if (
    project.creator.toString() !== req.user._id.toString() &&
    !project.collaborators.some(
      (collab) => collab._id.toString() === req.user._id.toString()
    )
  ) {
    const error = new Error("Invalid action");
    return res.status(403).json({ message: error.message });
  }

  // get tasks project

  res.json(project);
};

const editProject = async (req, res) => {
  const { id } = req.params;

  // security
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid Token");
    return res.status(404).json({ message: error.message });
  }

  const project = await Project.findById(id.trim());

  // security
  if (!project) {
    const error = new Error("Project not found");
    return res.status(404).json({ message: error.message });
  }

  // security
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid action");
    return res.status(403).json({ message: error.message });
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.bgcolor = req.body.bgcolor || project.bgcolor;
  project.dateDelivery = req.body.dateDelivery || project.dateDelivery;
  project.client = req.body.client || project.client;

  try {
    const storedProject = await project.save();
    res.json(storedProject);
  } catch (error) {
    console.log(error);
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  // security
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const error = new Error("Invalid Token");
    return res.status(404).json({ message: error.message });
  }

  const project = await Project.findById(id.trim());

  // security
  if (!project) {
    const error = new Error("Project not found");
    return res.status(404).json({ message: error.message });
  }

  // security
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid action");
    return res.status(403).json({ message: error.message });
  }

  try {
    await project.deleteOne();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

const searchCollaborator = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select(
    "-__v -confirmed -createdAt -password -token -updatedAt "
  );

  if (!user) {
    const error = new Error("User not found");
    return res.status(404).json({ message: error.message });
  }

  try {
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const addCollaborator = async (req, res) => {
  const project = await Project.findById(req.params.id);

  // project exist
  if (!project) {
    const error = new Error("Project not found");
    return res.status(404).json({ message: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid action");
    return res.status(404).json({ message: error.message });
  }

  // user exist
  const { email } = req.body;

  const user = await User.findOne({ email }).select(
    "-__v -confirmed -createdAt -password -token -updatedAt "
  );

  if (!user) {
    const error = new Error("User not found");
    return res.status(404).json({ message: error.message });
  }

  // collaborator  != project admin
  if (project.creator.toString() === user._id.toString()) {
    const error = new Error("A project creator can't be a collaborator");
    return res.status(404).json({ message: error.message });
  }

  // collaborator is added before
  if (project.collaborators.includes(user._id)) {
    const error = new Error("This user is already a collaborator");
    return res.status(404).json({ message: error.message });
  }

  // add collab
  try {
    project.collaborators.push(user._id);
    const addedCollab = await project.save();

    if (addedCollab) {
      res.json({ message: "Collaborator added successfully" });
    } else {
      const error = new Error("We can save the collab, something went wrong");
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteCollaborator = async (req, res) => {
  const project = await Project.findById(req.params.id);

  // project exist
  if (!project) {
    const error = new Error("Project not found");
    return res.status(404).json({ message: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid action");
    return res.status(404).json({ message: error.message });
  }

  // delete collab
  try {
    project.collaborators.pull(req.body.id);
    const deletedProject = await project.save();

    if (deletedProject) {
      res.json({ message: "Collaborator deleted successfully" });
    } else {
      const error = new Error(
        "We can't delete the collab, something went wrong"
      );
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  getProjects,
  getProject,
  newProject,
  editProject,
  deleteProject,
  searchCollaborator,
  addCollaborator,
  deleteCollaborator,
};
