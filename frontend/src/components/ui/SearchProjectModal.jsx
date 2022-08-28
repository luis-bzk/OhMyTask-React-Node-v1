import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import { useProjects } from "../../hooks";

export const SearchProjectModal = () => {
  const [search, setSearch] = useState("");

  const { modalEffect, addModalEffect, includeModalSearchProject, projects } =
    useProjects();

  // navigate
  const navigate = useNavigate();

  // search projects
  const filteredProjects =
    search === ""
      ? []
      : projects.filter((project) =>
          project.name.toLowerCase().includes(search.toLowerCase())
        );

  const transition = useTransition(modalEffect, {
    from: {
      y: -200,
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
    },
    leave: {
      y: 200,
      opacity: 0,
    },
  });

  function closeModal() {
    addModalEffect();
    setSearch("");

    setTimeout(() => {
      includeModalSearchProject();
    }, 200);
  }

  const redirectFindProject = (id) => {
    window.location = `/dashboard/projects/${id}`;
    // navigate(`/dashboard/projects/${id}`);
    closeModal();
  };

  return (
    <>
      <div className="modal-window">
        {transition((style, item) =>
          item ? (
            <animated.div style={style} className="project-search-modal">
              <button className="close-task-modal" onClick={closeModal}>
                <img src="/closeIcon.svg" alt="close" />
              </button>

              {/* content */}

              <div className="projects-search-finder">
                <input
                  type={"text"}
                  placeholder="Search..."
                  className="input-search-project"
                  onChange={(e) => setSearch(e.target.value)}
                />

                {filteredProjects.length > 0 && (
                  <div className="filtered-projects">
                    {filteredProjects.map((project) => (
                      <p
                        key={project._id}
                        // value={project}
                        className="project-find"
                        onClick={() => redirectFindProject(project._id)}
                        // to={`/dashboard/projects/${project._id}`}

                        // /dashboard/projects/${project._id}
                      >
                        {project.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </animated.div>
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
};
