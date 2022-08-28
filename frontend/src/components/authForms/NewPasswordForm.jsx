import { useState } from "react";

import { Link } from "react-router-dom";

import { Form, Formik, Field } from "formik";

import { authApi } from "../../api";

import {
  Alert,
  ToastAlertError,
  ToastAlertSuccess,
  YupNewPassword,
} from "../elements";

export const NewPasswordForm = ({ token }) => {
  const [passwordChanged, setPasswordChanged] = useState(false);

  const newPasswordSchema = YupNewPassword;

  const handleSubmit = async (values) => {
    try {
      const { password } = values;

      const url = `/users/forgot-password/${token}`;

      const answer = await authApi.post(url, {
        password,
      });

      const { data } = answer;

      ToastAlertSuccess(data.message);

      setPasswordChanged(true);
    } catch (error) {
      const { data } = error.response;

      ToastAlertError(data.message);
    }
  };

  return (
    <Formik
      // set initial values
      initialValues={{
        password: "",
      }}
      // submit data
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(values);
        resetForm();
      }}
      // yup validation
      validationSchema={newPasswordSchema}
    >
      {({ errors, touched }) => {
        return (
          <Form className="form">
            <div className="user-data new-password">
              <div className="input-box">
                <Field
                  type={"password"}
                  required
                  className="input"
                  name="password"
                />

                <span>New password</span>

                {errors.password && touched.password ? (
                  <Alert>{errors.password}</Alert>
                ) : null}
              </div>
            </div>

            <input
              type={"submit"}
              value="Reset my password"
              className="input-form"
            />

            {passwordChanged && (
              <p>
                Let's return to your account <Link to={"/"}>Sign in</Link>
              </p>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};
