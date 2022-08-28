// imports
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Form, Formik, Field } from "formik";

import { useAuth } from "../../hooks";

import { authApi } from "../../api";

import { Alert, ToastAlertError, YupNewSession } from "../elements";

export const LoginForm = () => {
  const { newUserLogin, loading } = useAuth();

  const navigate = useNavigate();

  const newSessionSchema = YupNewSession;

  const handleSubmit = async (values) => {
    try {
      const { email, password } = values;

      const url = "/users/signin";

      const answer = await authApi.post(url, {
        email,
        password,
      });

      const { data } = answer;

      await newUserLogin(data);

      navigate("/dashboard");
    } catch (error) {
      const { data } = error.response;

      ToastAlertError(data.message);
    }
  };

  return (
    <Formik
      // set initial values
      initialValues={{
        email: "",
        password: "",
      }}
      // submit data
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(values);

        resetForm();
      }}
      // Yup validation
      validationSchema={newSessionSchema}
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

              <div className="input-box">
                <Field
                  type={"password"}
                  required
                  className="input"
                  name="password"
                />

                <span>Password</span>

                {errors.password && touched.password ? (
                  <Alert>{errors.password}</Alert>
                ) : null}
              </div>

              <Link className="forgot-password" to={"/forgot-password"}>
                Forgot your password?
              </Link>
            </div>

            <input type={"submit"} value="login" className="input-form" />
          </Form>
        );
      }}
    </Formik>
  );
};
