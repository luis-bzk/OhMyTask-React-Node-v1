import { useProjects } from "../../hooks";

export const Collaborator = ({ collab }) => {
  const { _id, name, lastname, phone, email } = collab;

  const { confirmDeleteColllaborator } = useProjects();
  return (
    <div className="collaborator">
      <div className="data">
        <p className="data-user name">{name}</p>
        <p className="data-user lastname">{lastname}</p>
        <p className="data-user phone">{phone}</p>
        <p className="data-user email">{email}</p>
      </div>
      <div className="actions">
        <button
          type="button"
          className="delete-collab"
          onClick={() => confirmDeleteColllaborator(_id)}
        >
          <img src="/trashIcon.svg" alt="delete collab" />
        </button>
      </div>
    </div>
  );
};
