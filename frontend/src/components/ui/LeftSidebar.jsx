import { Link } from "react-router-dom";

import { useAuth, useProjects } from "../../hooks";

export const LeftSidebar = () => {
  const { auth, logOutAuth } = useAuth();
  const { logOutProjects } = useProjects();
  const { name, lastname } = auth;

  const hancleCloseSession = () => {
    localStorage.removeItem("jwtoken");
    localStorage.removeItem("lastPath");
    logOutProjects();
    logOutAuth();
  };

  return (
    <aside className="left-sidebar">
      <div className="profile">
        <p className="profile__name">{`${name} ${lastname}`}</p>
        <p className="profile__ocupation">Developer</p>
      </div>

      <div className="my-profile">
        <p>My profile</p>
        <Link to={"my-profile"} className="navigation__link">
          Admin profile
        </Link>
      </div>

      <div className="navigation">
        <p>Menu</p>

        <Link to={"/dashboard"} className="navigation__link">
          <img className="link-img" src="/homeIcon.svg" alt="home icon" />
          <span>Home</span>
        </Link>

        <Link to={"projects"} className="navigation__link">
          <img
            className="link-img"
            src="/collectionProjects.svg"
            alt="folder icon"
          />
          <span>Projects</span>
        </Link>

        <Link to={"projects/create-project"} className="navigation__link">
          <img
            className="link-img"
            src="/projectIcon.svg"
            alt="new project icon"
          />
          <span>New project</span>
        </Link>

        <Link to={"tasks"} className="navigation__link">
          <img className="link-img" src="/taskIcon.svg" alt="tasks icon" />
          <span>My tasks</span>
        </Link>
      </div>

      <div className="users">
        <p>Users</p>
        <Link to={"users"} className="navigation__link">
          Manage users
        </Link>
      </div>

      <div className="favorites">
        <p>Favorites</p>
        <Link to={"projects/project"} className="navigation__link">
          One Project
        </Link>
      </div>

      <button
        className="logout-button"
        type="button"
        onClick={() => hancleCloseSession()}
      >
        Log out
      </button>
    </aside>
  );
};
