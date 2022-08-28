import { useContext } from "react";

import { ProjectsContext } from "../context";

export const useProjects = () => {
  return useContext(ProjectsContext);
};
