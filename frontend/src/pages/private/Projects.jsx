import { useLocation, Link } from "react-router-dom";
import { useAuth, useProjects } from "../../hooks";
import { PreviewProject } from "../../components/ui";

let socket;

export const Projects = () => {
  const { setPagePath } = useAuth();
  const { projects } = useProjects();

  // set path
  const path = useLocation();
  setPagePath(path.pathname);

  return (
    <>
      <h1>Projects</h1>

      <div>
        {projects.length ? (
          <div className="projects">
            {projects.map((project) => {
              return <PreviewProject key={project._id} project={project} />;
            })}
          </div>
        ) : (
          <div className="no-projects">
            <p>You don't have any project</p>
            <Link to={"/dashboard/projects/create-project"}>Create one?</Link>
          </div>
        )}
      </div>
    </>
  );
};
