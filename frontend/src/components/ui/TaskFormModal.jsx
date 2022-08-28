import { useTransition, animated } from "react-spring";
import { useProjects } from "../../hooks";
import { FormTask } from "./FormTask";

export const TaskFormModal = () => {
  const { modalEffect, addModalEffect, includeModalElement, task, cleanTask } =
    useProjects();

  // useEffect(() => {
  //   console.log(task);
  // }, [])

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

    setTimeout(() => {
      includeModalElement();
      cleanTask();
    }, 300);
  }

  return (
    <>
      <div className="modal-window">
        {transition((style, item) =>
          item ? (
            <animated.div style={style} className="task-modal">
              <button className="close-task-modal" onClick={closeModal}>
                <img src="/closeIcon.svg" alt="close" />
              </button>

              {/* content */}
              <h2>{task._id ? "Edit task" : "Create new Task"}</h2>

              <FormTask closeModal={closeModal} />
            </animated.div>
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
};
