import { Link } from "react-router-dom";

import { ForgotPasswordForm } from "../../components/authForms";

export const ForgotPassword = () => {
  return (
    <div className="auth-box forgot-password">
      <h2>Regain access to your account</h2>

      <ForgotPasswordForm />

      <div className="access">
        <p>
          Already have an account? <Link to={"/"}>Sign in</Link>
        </p>

        <p>Or login with:</p>

        <button className="input-google">
          <img src="/googleIcon.svg" alt="google icon" /> Google
        </button>
      </div>
    </div>
  );
};
