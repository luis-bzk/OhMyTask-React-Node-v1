import { Link } from "react-router-dom";

import { Form, Formik, Field } from "formik";

import { authApi } from "../../api";

import {
  Alert,
  YupNewUser,
  ToastAlertError,
  ToastAlertSuccess,
} from "../elements";

export const SignupForm = () => {
  const newUserSchema = YupNewUser;

  const handleSubmit = async (values) => {
    try {
      const { name, lastname, email, phone, password } = values;

      const url = "/users";

      const answer = await authApi.post(url, {
        name,
        lastname,
        email,
        phone,
        password,
      });

      const { data } = answer;

      // set toast alert
      ToastAlertSuccess(data.message);
    } catch (error) {
      const { data } = error.response;

      // set toast alert
      ToastAlertError(data.message);
    }
  };

  return (
    <Formik
      // set initial state
      initialValues={{
        name: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        repeatPassword: "",
      }}
      // submit data
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(values);

        resetForm();
      }}
      // Yup validation
      validationSchema={newUserSchema}
    >
      {({ errors, touched }) => {
        return (
          <Form className="form">
            <div className="user-data signup">
              <div className="signup__box">
                <div className="input-box">
                  <Field type={"text"} required className="input" name="name" />

                  <span>Name</span>

                  {errors.name && touched.name ? (
                    <Alert>{errors.name}</Alert>
                  ) : null}
                </div>

                <div className="input-box">
                  <Field
                    type={"text"}
                    required
                    className="input"
                    name="lastname"
                  />

                  <span>Lastname</span>

                  {errors.lastname && touched.lastname ? (
                    <Alert>{errors.lastname}</Alert>
                  ) : null}
                </div>
              </div>

              <div className="input-box">
                <Field type={"text"} required className="input" name="phone" />

                <span>Phone number</span>

                {errors.phone && touched.phone ? (
                  <Alert>{errors.phone}</Alert>
                ) : null}
              </div>

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

              <div className="input-box">
                <Field
                  type={"password"}
                  required
                  className="input"
                  name="repeatPassword"
                />

                <span>Confirm password</span>

                {errors.repeatPassword && touched.repeatPassword ? (
                  <Alert>{errors.repeatPassword}</Alert>
                ) : null}
              </div>

              <Link className="forgot-password" to={"/forgot-password"}>
                Forgot your password?
              </Link>
            </div>

            <input type={"submit"} value="Signup" className="input-form" />
          </Form>
        );
      }}
    </Formik>
  );
};
