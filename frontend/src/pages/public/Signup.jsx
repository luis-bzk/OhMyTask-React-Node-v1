import { Link } from "react-router-dom";

import { SignupForm } from "../../components/authForms";

export const Signup = () => {
  return (
    <div className="auth-box signup">
      <h2>
        Create an account and manage your <span>projects</span>
      </h2>

      <SignupForm />

      <div className="access">
        <p>
          Already have an account? <Link to={"/"}>Sign in</Link>
        </p>

        <p>Or signup with:</p>

        <button className="input-google">
          <img src="/googleIcon.svg" alt="google icon" /> Google
        </button>
      </div>
    </div>
  );
};
