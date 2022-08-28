import { useEffect } from "react";

import { useProjects, useAuth } from "../../hooks";

import { useParams, useLocation, Link, useNavigate } from "react-router-dom";

import { SpinnerCube } from "../../components/elements";
import { FormProject } from "../../components/ui";

export const EditProject = () => {
  const { setPagePath } = useAuth();
  const { getProject, project, loading, confirmDeleteProject } = useProjects();

  const navigate = useNavigate();

  // set path
  const path = useLocation();
  setPagePath(path.pathname);

  // project data
  const params = useParams();
  useEffect(() => {
    getProject(params.id);
  }, []);

  // project
  const { _id, name } = project;

  const handleDelete = async () => {
    await confirmDeleteProject(_id);
    navigate("/dashboard/projects");
    // if (confirm("Are you sure you want to delete this project?")) {
    // } else {
    //   console.log("no :)");
    // }
  };

  if (loading) return <SpinnerCube />;

  return (
    <>
      <header className="project-header">
        <h1>
          Edit project: <span>{name}</span>
        </h1>
        <div className="project-header__icon delete">
          <button to={`/dashboard/projects/edit/${_id}`} onClick={handleDelete}>
            <img src="/trashIcon.svg" alt="trash icon" />
          </button>
        </div>
      </header>

      <div className="new-project container-m">
        <FormProject />
      </div>
    </>
  );
};
