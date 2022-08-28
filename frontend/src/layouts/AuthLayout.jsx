import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthLayout = () => {
  return (
    <>
      <main className="container">
        <div className="auth">
          <div className="auth__title">
            <h1>Oh my Task</h1>
          </div>

          <div className="content">
            <div className="auth__img">
              <img src="/loginImg.svg" alt="login image" />
            </div>

            <div className="auth__content-child">
              <Outlet />
            </div>
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
};
