import { dateFormater } from "../../helpers";
import { useAdmin, useProjects } from "../../hooks/index.js";

export const CardTask = ({ task }) => {
  const admin = useAdmin();

  const { handleModalEditTask, confirmDeleteTask } = useProjects();

  const { _id, name, description, dateDelivery, priority, completed, taked } =
    task;
  return (
    <div className="card-task">
      <div className="card-header">
        <p className="card-title">{name}</p>
        <p className={`card-priority ${priority}`}>{priority}</p>
      </div>

      <div className="card-description">
        <p>{description}</p>
      </div>

      {taked?._id && (
        <div className="card-who taked">
          <p>
            <span>Taked by: </span>
            {taked.name}
          </p>
        </div>
      )}

      {completed?._id && (
        <div className="card-who completed">
          <p>
            <span>Completed by: </span>
            {completed.name}
          </p>
        </div>
      )}

      <div className="card-footer">
        <p>{dateFormater(dateDelivery)}</p>

        <div className="card-options">
          <button
            className="card-options-edit"
            onClick={() => handleModalEditTask(task)}
          >
            <img src="/pencilIcon.svg" alt="pencil icon" />
          </button>

          {admin && (
            <button
              className="card-options-delete"
              onClick={() => confirmDeleteTask(_id)}
            >
              <img src="/trashIcon.svg" alt="trash icon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
