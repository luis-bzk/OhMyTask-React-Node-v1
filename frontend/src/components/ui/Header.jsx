import { useAuth, useProjects } from "../../hooks";
import { ProgressBar } from "../elements";
import { SearchProjectModal } from "./SearchProjectModal";

export const Header = () => {
  const { auth } = useAuth();
  const { name } = auth;

  const { includeModalSearchProject, findProjectModal, addModalEffect } =
    useProjects();

  return (
    <div className="header">
      <h2 className="header__title">
        Welcome, <span> {`${name}`}</span>
      </h2>

      <div className="header__tasks">
        <p>Tasks Completed</p>
        <ProgressBar />
      </div>

      <button
        className="input-find-project"
        onClick={() => {
          addModalEffect();
          includeModalSearchProject();
        }}
      >
        <img className="input-icon" src="/searchIcon.svg" alt="search icon" />
        <span>Search a project</span>
      </button>

      {findProjectModal && <SearchProjectModal />}
    </div>
  );
};
