import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Spinner, SpinnerCube } from "../../components/elements";
import { FormCollab } from "../../components/ui";
import { useAuth, useProjects } from "../../hooks";

export const NewCollaborator = () => {
  const { setPagePath } = useAuth();
  const {
    getProject,
    project,
    loading,
    collaborator,
    searchingCollab,
    addCollab,
  } = useProjects();

  // set path
  const path = useLocation();
  setPagePath(path.pathname);

  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  if (loading) return <SpinnerCube />;

  return (
    <>
      <h1>Add new collaborator - {project.name}</h1>

      <div className="new-collab">
        <FormCollab />

        {searchingCollab ? (
          <Spinner />
        ) : (
          collaborator?._id && (
            <div className="results container-m ">
              <div className="user">
                <p>{collaborator.name}</p>
                <p>{collaborator.lastname}</p>
                <p>{collaborator.email}</p>

                <button
                  className="button-add-collab"
                  onClick={() => addCollab({ email: collaborator.email })}
                >
                  Add Collab
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};
