import { useTransition, animated } from "react-spring";

import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAuth, useProjects } from "../../hooks";

export const ModalMenuMobile = ({ showMenuModal, modalMenuMobile }) => {
  const { auth, logOutAuth } = useAuth();
  const { logOutProjects } = useProjects();
  const { name, lastname } = auth;

  const hancleCloseSession = () => {
    localStorage.removeItem("jwtoken");
    localStorage.removeItem("lastPath");
    logOutProjects();
    logOutAuth();
  };

  // console.log(urlLocal);
  useEffect(() => {
    showMenuModal();
  }, [useLocation()]);

  const transition = useTransition(modalMenuMobile, {
    from: {
      x: 500,
      opacity: 0,
    },
    enter: {
      x: 0,
      opacity: 1,
    },
    leave: {
      x: -500,
      opacity: 0,
    },
  });

  return transition((style, item) =>
    item ? (
      <animated.aside style={style} className="modal-menu-mobile">
        <button
          type="button"
          className="close-menu-mobile"
          onClick={() => showMenuModal()}
        >
          <img src="/closeIcon.svg" alt="close menu mobile" />
        </button>

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
          <p className="navigation__title">Menu</p>

          <Link to={"/dashboard"} className="navigation__link">
            <span>Home</span>
            <img className="link-img" src="/homeIcon.svg" alt="home icon" />
          </Link>

          <Link to={"projects"} className="navigation__link">
            <span>Projects</span>
            <img
              className="link-img"
              src="/collectionProjects.svg"
              alt="folder icon"
            />
          </Link>

          <Link to={"projects/create-project"} className="navigation__link">
            <span>New project</span>
            <img
              className="link-img"
              src="/projectIcon.svg"
              alt="new project icon"
            />
          </Link>

          <Link to={"tasks"} className="navigation__link">
            <span>My tasks</span>
            <img className="link-img" src="/taskIcon.svg" alt="tasks icon" />
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
      </animated.aside>
    ) : (
      ""
    )
  );
};
