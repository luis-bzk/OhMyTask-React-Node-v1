import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";
import { FormProject } from "../../components/ui";

export const NewProject = () => {
  const { setPagePath } = useAuth();

  // set path
  const path = useLocation();
  setPagePath(path.pathname);

  return (
    <>
      <h1> Create new project</h1>

      <div className="new-project container-m">
        <FormProject />
      </div>
    </>
  );
};
