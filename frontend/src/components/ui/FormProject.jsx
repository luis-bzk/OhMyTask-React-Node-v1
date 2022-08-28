import { useNavigate, useParams } from "react-router-dom";

import { Form, Formik, Field } from "formik";

import { useProjects } from "../../hooks";

import { AlertAbsolute, YupNewProject } from "../elements";
import { useEffect, useState } from "react";

export const FormProject = () => {
  const [idProject, setIdProject] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const newProjectSchema = YupNewProject;

  const { submitProject, project } = useProjects();
  const { _id, name, description, dateDelivery, client } = project;

  useEffect(() => {
    if (params.id) {
      setIdProject(_id);
    }
  }, [params]);

  const handleSubmit = async (values) => {
    // pass data -> provider
    await submitProject({ ...values, idProject });

    setIdProject(null);

    setTimeout(() => {
      navigate("/dashboard/projects");
    }, 1000);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        // set initial values
        initialValues={
          idProject
            ? {
                name: name,
                description: description,
                dateDelivery: dateDelivery.split("T")[0],
                client: client,
              }
            : {
                name: "",
                description: "",
                dateDelivery: "",
                client: "",
              }
        }
        // submit data
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        // yup validation
        validationSchema={newProjectSchema}
      >
        {({ values, errors, touched }) => {
          return (
            <Form className="form-project">
              <div className="form-field">
                <label className="form-label" htmlFor="name">
                  <p>Project name</p>
                  <span>
                    This will be the name that all participants will see
                  </span>
                </label>

                <Field
                  id="name"
                  type={"text"}
                  className="form-input"
                  placeholder=" Write a name for the project"
                  name="name"
                />
                {errors.name && touched.name ? (
                  <AlertAbsolute>{errors.name}</AlertAbsolute>
                ) : null}
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="description">
                  <p>Description project</p>
                  <span>Write about what the project consists of</span>
                </label>

                <Field
                  as="textarea"
                  id="description"
                  className="form-input"
                  placeholder="Art, desig... DevOps?"
                  name="description"
                />

                {errors.description && touched.description ? (
                  <AlertAbsolute>{errors.description}</AlertAbsolute>
                ) : null}
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="date-delivery">
                  <p>Date delivery</p>
                  <span>When do you need to finish the project?</span>
                </label>

                <Field
                  id="date-delivery"
                  type={"date"}
                  className="form-input"
                  name="dateDelivery"
                />

                {errors.dateDelivery && touched.dateDelivery ? (
                  <AlertAbsolute>{errors.dateDelivery}</AlertAbsolute>
                ) : null}
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="client">
                  <p>Client name</p>
                  <span>Who is your client?</span>
                </label>

                <Field
                  id="client"
                  type={"text"}
                  className="form-input"
                  placeholder="Client name, ex: Production S.L.A"
                  name="client"
                />

                {errors.client && touched.client ? (
                  <AlertAbsolute>{errors.client}</AlertAbsolute>
                ) : null}
              </div>

              {/* button */}
              <div className="input-button">
                <input
                  type={"submit"}
                  value={idProject ? "Save changes" : "Create project"}
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
