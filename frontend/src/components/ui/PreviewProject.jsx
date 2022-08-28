import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { CardProjectMenu } from "./CardProjMenu";

export const PreviewProject = ({ project }) => {
  const [style, setStyle] = useState({});

  const { auth } = useAuth();

  const { name, _id, bgcolor, client, creator } = project;

  useEffect(() => {
    const newStyle = {
      backgroundColor: `${bgcolor}`,
    };

    setStyle(newStyle);
  }, []);

  const navigate = useNavigate();

  const redirectProject = () => {
    navigate(`${_id}`);
  };

  return (
    <div className="preview-project" onClick={redirectProject} style={style}>
      <div className="project-head">
        <p>{name}</p>

        <div className="project-head-options">
          <img src="/dotBar.svg" alt="bar icon" className="bar-img" />
          <CardProjectMenu />
        </div>
      </div>

      <p className="preview-client">{client}</p>

      {auth._id !== creator && <p className="preview-tag-user">Collaborator</p>}
    </div>
  );
};
