import { useParams } from "react-router-dom";

import { Form, Formik, Field } from "formik";
import { useAdmin, useProjects } from "../../hooks";

import { Alert, YupNewTask } from "../elements";

const TASK_STATE = ["to do", "in progress", "done"];
const TASK_PRIORITY = ["low", "medium", "high"];

export const FormTask = ({ closeModal }) => {
  const { submitTask, task } = useProjects();

  const admin = useAdmin();

  const params = useParams();

  const newTaskSchema = YupNewTask;

  const handleSubmit = async (values) => {
    await submitTask(values);

    closeModal();
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={
          task._id
            ? {
                name: task.name,
                description: task.description,
                state: task.state,
                dateDelivery: task.dateDelivery?.split("T")[0],
                priority: task.priority,
                project: params.id,
                taskId: task._id,
              }
            : {
                name: "",
                description: "",
                state: "to do",
                dateDelivery: "",
                priority: "low",
                project: params.id,
              }
        }
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);

          resetForm();
        }}
        validationSchema={newTaskSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="form-task">
              {admin && (
                <div className="form-field">
                  <label className="form-label" htmlFor="name">
                    Task name
                  </label>
                  <Field
                    id="name"
                    type={"text"}
                    className="form-input"
                    placeholder="Enter a name for the task"
                    name="name"
                  />
                  {errors.name && touched.name ? (
                    <Alert>{errors.name}</Alert>
                  ) : null}
                </div>
              )}

              {admin && (
                <div className="form-field">
                  <label className="form-label" htmlFor="description">
                    Task description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    className="form-input txarea"
                    placeholder="Enter the task description"
                    name="description"
                  />
                  {errors.description && touched.description ? (
                    <Alert>{errors.description}</Alert>
                  ) : null}
                </div>
              )}

              <div className="form-field">
                <label className="form-label" htmlFor="state">
                  Task state
                </label>

                <Field
                  as="select"
                  id="state"
                  className="form-input"
                  placeholder="Enter a task state"
                  name="state"
                >
                  {TASK_STATE.map((stateVal) => (
                    <option key={stateVal}>{stateVal}</option>
                  ))}
                </Field>

                {errors.state && touched.state ? (
                  <Alert>{errors.state}</Alert>
                ) : null}
              </div>

              {admin && (
                <div className="form-field">
                  <label className="form-label" htmlFor="priority">
                    Task priority
                  </label>

                  <Field
                    as="select"
                    id="priority"
                    className="form-input"
                    placeholder="priority"
                    name="priority"
                  >
                    {TASK_PRIORITY.map((priorityVal) => (
                      <option key={priorityVal}>{priorityVal}</option>
                    ))}
                  </Field>

                  {errors.priority && touched.priority ? (
                    <Alert>{errors.priority}</Alert>
                  ) : null}
                </div>
              )}

              {admin && (
                <div className="form-field">
                  <label className="form-label" htmlFor="date-delivery">
                    Task date
                  </label>

                  <Field
                    id="date-delivery"
                    type={"date"}
                    className="form-input"
                    name="dateDelivery"
                  />

                  {errors.dateDelivery && touched.dateDelivery ? (
                    <Alert>{errors.dateDelivery}</Alert>
                  ) : null}
                </div>
              )}

              {/* button */}
              <div className="input-button">
                <input
                  type={"submit"}
                  value={task._id ? "Save changes" : "Create task"}
                  className="form-input-button"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
