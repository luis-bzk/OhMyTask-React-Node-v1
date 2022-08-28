import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { ToastAlertError, ToastAlertSuccess } from "../components/elements";
import { useAuth } from "../hooks";

let socket;

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  // use state
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);

  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [task, setTask] = useState({});
  const [modalEffect, setModalEffect] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [findProjectModal, setFindProjectModal] = useState(false);

  const [collaborator, setCollaborator] = useState({});
  const [searchingCollab, setSearchingCollab] = useState(false);

  const { jswToken } = useAuth();

  const navigate = useNavigate();

  // use Effect
  useEffect(() => {
    // get all projects
    const getProjects = async () => {
      try {
        const jwtoken = localStorage.getItem("jwtoken");

        if (!jwtoken) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtoken}`,
          },
        };

        const url = "/projects";
        const answer = await authApi.get(url, config);
        setProjects(answer.data);
      } catch (error) {
        const { data } = error.response;

        // set toast alert
        ToastAlertError(data.message);
      }
    };

    getProjects();
  }, [jswToken]);

  // connection with socket io
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  // functions
  // new project
  const submitProject = async (project) => {
    if (project.idProject) {
      await editProject(project);
    } else {
      await createNewProject(project);
    }
    // return;
  };

  // create new project
  const createNewProject = async (project) => {
    try {
      const jwtoken = localStorage.getItem("jwtoken");

      if (!jwtoken) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtoken}`,
        },
      };

      const url = "/projects";
      const answer = await authApi.post(url, project, config);

      // set alert
      ToastAlertSuccess("Project created successfully");

      // synchronize
      const { data } = answer;

      setProjects([...projects, data]);
    } catch (error) {
      console.log(error);
    }
  };

  // edit project
  const editProject = async (project) => {
    try {
      const jwtoken = localStorage.getItem("jwtoken");

      if (!jwtoken) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtoken}`,
        },
      };

      const url = `/projects/${project.idProject}`;
      const answer = await authApi.put(url, project, config);

      // synchronize
      const { data } = answer;

      const updatedProjects = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );

      setProjects(updatedProjects);

      // set alert
      ToastAlertSuccess("Project was updated successfully");
    } catch (error) {
      const { data } = error.response;

      // set toast alert
      ToastAlertError(data.message);
    }
  };

  const confirmDeleteProject = async (projectId) => {
    // const custom swal
    const MySwal = Swal.mixin({
      customClass: {
        confirmButton: "sweetalert btn-success",
        cancelButton: "sweetalert btn-danger",
        title: "sweetalert text",
        actions: "sweetalert actions",
      },
      buttonsStyling: false,
    });

    // ALERT
    await MySwal.fire({
      title: "Are you sure you want to delete this project?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      width: 600,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(projectId);
      }
    });
  };

  const deleteProject = async (id) => {
    try {
      const jwtoken = localStorage.getItem("jwtoken");

      if (!jwtoken) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtoken}`,
        },
      };

      const url = `/projects/${id}`;
      const answer = await authApi.delete(url, config);

      // message
      const { data } = answer;
      ToastAlertSuccess(data.message);

      // syncronize
      const projectsUpdated = projects.filter(
        (stateProject) => stateProject._id !== id
      );

      setProjects(projectsUpdated);
    } catch (error) {
      const { data } = error.response;

      // set toast alert
      ToastAlertError(data.message);
    }
  };

  // get one project
  const getProject = async (id) => {
    setLoading(true);
    try {
      const jwtoken = localStorage.getItem("jwtoken");

      if (!jwtoken) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtoken}`,
        },
      };

      const url = `/projects/${id}`;
      const answer = await authApi.get(url, config);

      setProject(answer.data);
    } catch (error) {
      navigate("/dashboard/projects");
      const { data } = error.response;

      // set toast alert
      ToastAlertError(data.message);
    } finally {
      setLoading(false);
    }
  };

  // add modal element
  const includeModalElement = () => {
    setAddModal((v) => !v);
  };
  // modal effect
  const addModalEffect = () => {
    setModalEffect((v) => !v);
  };

  // new task
  const submitTask = async (task) => {
    if (task.taskId) {
      await editTask(task);
    } else {
      await createNewTask(task);
    }
  };

  const createNewTask = async (task) => {
    try {
      const jwtoken = localStorage.getItem("jwtoken");

      if (!jwtoken) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtoken}`,
        },
      };

      const url = "/tasks";
      const answer = await authApi.post(url, task, config);
      const { data } = answer;

      ToastAlertSuccess("New task created successfully");

      // SOCKET IO & Synchronize
      socket.emit("new_task", data);
    } catch (error) {
      const { data } = error.response;

      // set toast alert
      ToastAlertError(data.message);
    }
  };

  const editTask = async (task) => {
    try {
      const jwtoken = localStorage.getItem("jwtoken");

      if (!jwtoken) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtoken}`,
        },
      };

      const url = `/tasks/${task.taskId}`;
      const answer = await authApi.put(url, task, config);
      const { data } = answer;

      // set alert
      ToastAlertSuccess("Task updated successfully");

      // SOCKET IO & Synchronize
      socket.emit("edit_task", data);
    } catch (error) {
      const { data } = error.response;
      // set toast alert
      ToastAlertError(data.message);
    }
  };

  // edit task modal

  const handleModalEditTask = (task) => {
    setTask(task);
    addModalEffect();
    includeModalElement();
  };

  const cleanTask = () => {
    setTask({});
  };

  // delete task
  // const MySwal = withReactContent(Swal);
  const confirmDeleteTask = (taskId) => {
    // const custom swal
    const MySwal = Swal.mixin({
      customClass: {
        confirmButton: "sweetalert btn-success",
        cancelButton: "sweetalert btn-danger",
        title: "sweetalert text",
        actions: "sweetalert actions",
      },
      buttonsStyling: false,
    });

    // ALERT
    MySwal.fire({
      title: "Are you sure you want to delete this Task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      width: 600,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(taskId);
      }
    });
  };

  const deleteTask = async (taskId) => {
    try {
      const jwtoken = localStorage.getItem("jwtoken");

      if (!jwtoken) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtoken}`,
        },
      };

      const url = `/tasks/${taskId}`;
      const answer = await authApi.delete(url, config);

      // message
      const { data } = answer;
      ToastAlertSuccess(data.message);

      // syncronize & Sockect io
      socket.emit("delete_task", { taskId, projectId: project._id });
    } catch (error) {
      const { data } = error.response;
      // set toast alert
      ToastAlertError(data.message);
    }
  };

  // tasks completed
  let totalTasks = project.tasks?.length;
  let totalIncomplete = project.tasks?.filter(
    (task) => task.state === "done"
  ).length;

  useEffect(() => {
    setTasksCompleted(
      Math.round(((totalIncomplete * 100) / totalTasks) * 100) / 100
    );
  }, [project]);

  // search collaborator
  const submitCollab = async (email) => {
    setSearchingCollab(true);

    try {
      const jwtoken = localStorage.getItem("jwtoken");

      if (!jwtoken) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtoken}`,
        },
      };

      const url = "/projects/collaborators";
      const answer = await authApi.post(url, { email }, config);
      const { data } = answer;

      setCollaborator(data);
    } catch (error) {
      const { data } = error.response;
      // set toast alert
      ToastAlertError(data.message);
      setCollaborator({});
    } finally {
      setSearchingCollab(false);
    }
  };

  // add colladborator
  const addCollab = async (email) => {
    try {
      const jwtoken = localStorage.getItem("jwtoken");

      if (!jwtoken) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtoken}`,
        },
      };

      const url = `/projects/collaborators/${project._id}`;
      const answer = await authApi.post(url, email, config);
      const { data } = answer;
      ToastAlertSuccess(data.message);
      setCollaborator({});
    } catch (error) {
      const { data } = error.response;
      // set toast alert
      ToastAlertError(data.message);
      setCollaborator({});
    }
  };

  // delete task
  // const MySwal = withReactContent(Swal);
  const confirmDeleteColllaborator = (collabId) => {
    // const custom swal
    const MySwal = Swal.mixin({
      customClass: {
        confirmButton: "sweetalert btn-success",
        cancelButton: "sweetalert btn-danger",
        title: "sweetalert text",
        actions: "sweetalert actions",
      },
      buttonsStyling: false,
    });

    // ALERT
    MySwal.fire({
      title: "Are you sure you want to delete this collaborator?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      width: 600,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCollaborator(collabId);
      }
    });
  };

  const deleteCollaborator = async (collabId) => {
    try {
      const jwtoken = localStorage.getItem("jwtoken");

      if (!jwtoken) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtoken}`,
        },
      };

      const url = `/projects/delete-collaborator/${project._id}`;
      const answer = await authApi.post(url, { id: collabId }, config);

      // message
      const { data } = answer;
      ToastAlertSuccess(data.message);

      // syncronize
      const updatedProject = { ...project };
      updatedProject.collaborators = updatedProject.collaborators.filter(
        (collab) => collab._id !== collabId
      );
      setProject(updatedProject);

      setCollaborator({});
    } catch (error) {
      const { data } = error.response;

      // set toast alert
      ToastAlertError(data.message);
    }
  };

  // modal find project
  const includeModalSearchProject = () => {
    setFindProjectModal((v) => !v);
  };

  // SOCKET IO functions
  const submitTasksSocketIo = (task) => {
    const updateProject = { ...project };
    updateProject.tasks = [...updateProject.tasks, task];

    setProject(updateProject);
  };

  const deleteTaskSocketIo = (taskId) => {
    const updatedProject = { ...project };
    updatedProject.tasks = updatedProject.tasks.filter(
      (taskProject) => taskProject._id !== taskId
    );

    setProject(updatedProject);
  };

  const updateTaskSocketIo = (taskUpdated) => {
    const updatedProject = { ...project };
    updatedProject.tasks = updatedProject.tasks.map((taskProject) =>
      taskProject._id === taskUpdated._id ? taskUpdated : taskProject
    );
    setProject(updatedProject);
  };

  const logOutProjects = () => {
    setProjects([]);
    setProject({});
    setTask({});
  };

  // return Element
  return (
    <ProjectsContext.Provider
      value={{
        projects,
        submitProject,
        getProject,
        confirmDeleteProject,
        deleteProject,
        project,
        loading,

        addModal,
        includeModalElement,
        modalEffect,
        addModalEffect,

        tasksCompleted,

        submitTask,
        handleModalEditTask,
        task,
        cleanTask,
        confirmDeleteTask,

        submitCollab,
        collaborator,
        searchingCollab,
        addCollab,
        confirmDeleteColllaborator,

        includeModalSearchProject,
        findProjectModal,

        submitTasksSocketIo,
        deleteTaskSocketIo,
        updateTaskSocketIo,

        logOutProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
