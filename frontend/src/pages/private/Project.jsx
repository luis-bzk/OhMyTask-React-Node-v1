import { useEffect } from "react";

import io from "socket.io-client";

import { useParams, useLocation, Link } from "react-router-dom";

import { useProjects, useAuth, useAdmin } from "../../hooks";
import { CardTask, Collaborator, TaskFormModal } from "../../components/ui";
import { SpinnerCube } from "../../components/elements";

let socket;

export const Project = () => {
  const { setPagePath } = useAuth();
  const {
    getProject,
    project,
    loading,
    includeModalElement,
    addModal,
    addModalEffect,
    submitTasksSocketIo,
    deleteTaskSocketIo,
    updateTaskSocketIo,
  } = useProjects();

  const admin = useAdmin();
  // console.log(project);

  // set path
  const path = useLocation();
  setPagePath(path.pathname);

  // get project data
  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  // enter room
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("open_project", params.id);
  }, []);

  // listener
  useEffect(() => {
    socket.on("task_added", (newTask) => {
      if (newTask.project === project._id) submitTasksSocketIo(newTask);
    });

    socket.on("task_deleted", (dataDeleted) => {
      const { taskId, projectId } = dataDeleted;
      if (projectId === project._id) deleteTaskSocketIo(taskId);
    });

    socket.on("task_updated", (taskUpdated) => {
      if (taskUpdated.project._id === project._id)
        updateTaskSocketIo(taskUpdated);
    });
  });

  const { _id, name, collaborators, tasks } = project;

  return loading ? (
    <SpinnerCube />
  ) : (
    <>
      <header className="project-header">
        <h1>{name}</h1>

        {admin && (
          <div className="project-header__icon edit">
            <Link to={`/dashboard/projects/edit/${_id}`}>
              <img src="/pencilIcon.svg" alt="pencil icon" />
            </Link>
          </div>
        )}
      </header>

      {tasks?.length ? (
        <div className="project-tasks">
          <div className="to-do">
            <h2>To do</h2>

            <div className="tasks">
              {tasks?.map(
                (task) =>
                  task.state === "to do" && (
                    <CardTask task={task} key={task._id} />
                  )
              )}
            </div>
          </div>

          <div className="in-progress">
            <h2>In progress</h2>

            <div className="tasks">
              {tasks?.map(
                (task) =>
                  task.state === "in progress" && (
                    <CardTask task={task} key={task._id} />
                  )
              )}
            </div>
          </div>

          <div className="done">
            <h2>Done</h2>

            <div className="tasks">
              {tasks?.map(
                (task) =>
                  task.state === "done" && (
                    <CardTask task={task} key={task._id} />
                  )
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="no-tasks">You don't have any task</p>
      )}

      {/* clolabs */}
      {admin && (
        <>
          <div className="project-header">
            <h2>Collabs</h2>

            <div className="project-header__icon">
              <Link to={`/dashboard/projects/new-collaborator/${_id}`}>
                <img src="/addTaskIcon.svg" alt="add icon" />
              </Link>
            </div>
          </div>

          <div className="collaborators">
            {collaborators?.length ? (
              collaborators?.map((collab) => (
                <Collaborator key={collab._id} collab={collab} />
              ))
            ) : (
              <p className="no-collabs">
                You don't have collaborators at this project
              </p>
            )}
          </div>
        </>
      )}

      {admin && (
        <button
          className="new-task"
          onClick={() => {
            addModalEffect();
            includeModalElement();
          }}
        >
          <img src="/addTaskIcon.svg" alt={"new task icon"} />
          <span>Add New Task</span>
        </button>
      )}
      {addModal && <TaskFormModal />}
    </>
  );
};
