import { Link } from "react-router-dom";

import { Form, Formik, Field } from "formik";

import { authApi } from "../../api";

import {
  Alert,
  ToastAlertError,
  ToastAlertSuccess,
  YupNewEmail,
} from "../elements";

export const ForgotPasswordForm = () => {
  const newEmailSchema = YupNewEmail;

  const handleSubmit = async (values) => {
    try {
      const { email } = values;

      const url = "/users/forgot-password";

      const answer = await authApi.post(url, { email });

      const { data } = answer;

      ToastAlertSuccess(data.message);
    } catch (error) {
      const { data } = error.response;

      ToastAlertError(data.message);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      // submit form
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(values);

        resetForm();
      }}
      validationSchema={newEmailSchema}
    >
      {({ errors, touched }) => {
        return (
          <Form className="form">
            <div className="user-data session">
              <div className="input-box">
                <Field type={"text"} required className="input" name="email" />

                <span>Email</span>

                {errors.email && touched.email ? (
                  <Alert>{errors.email}</Alert>
                ) : null}
              </div>

              <Link className="forgot-password" to={"/signup"}>
                No account yet? Sign up
              </Link>
            </div>

            <input
              type={"submit"}
              value="Send instructions"
              className="input-form"
            />
          </Form>
        );
      }}
    </Formik>
  );
};
