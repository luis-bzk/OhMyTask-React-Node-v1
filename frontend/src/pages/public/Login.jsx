// imports

import { Link } from "react-router-dom";

import { LoginForm } from "../../components/authForms";

// componente
export const Login = () => {
  return (
    <div className="auth-box login">
      <h2>
        Log in and manage your <span>projects</span>
      </h2>

      <LoginForm />

      <div className="access">
        <p>
          No account yet? <Link to={"/signup"}>Sign up</Link>
        </p>

        <p>Or login with:</p>

        <button className="input-google">
          <img src="/googleIcon.svg" alt="google icon" /> Google
        </button>
      </div>
    </div>
  );
};
