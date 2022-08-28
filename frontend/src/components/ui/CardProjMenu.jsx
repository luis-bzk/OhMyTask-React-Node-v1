import { useNavigate } from "react-router-dom";

export const CardProjectMenu = () => {
  const navigte = useNavigate();

  const unaFuncion = async () => {
    navigte("edit");
    // openCardMenu();
  };

  return (
    <div className="card-menu-opt">
      <div className="menu">
        <p onClick={unaFuncion} className="menu-option">
          Edit
        </p>
        <p onClick={unaFuncion} className="menu-option">
          delete
        </p>
        <p onClick={unaFuncion} className="menu-option">
          Add Collabs
        </p>

        <p onClick={unaFuncion} className="menu-option">
          Colors
        </p>
      </div>
    </div>
  );
};
