import { useState } from "react";
import { useProjects } from "../../hooks";

export const ProgressBar = () => {
  const [style, setStyle] = useState({});

  const { tasksCompleted } = useProjects();

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${tasksCompleted}%`,
    };

    setStyle(newStyle);
  }, 800);

  return (
    <div className="progressbar">
      <p className="progressbar-done-p">{tasksCompleted}%</p>
      <div className="progressbar-done" style={style} />
    </div>
  );
};
