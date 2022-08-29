import { Outlet, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../hooks";

import { Spinner } from "../components/elements";
import { Header, MenuModalAside } from "../components/ui";

export const ProtectedRouteLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) return <Spinner />;

  return (
    <>
      {auth._id ? (
        <div className="dashboard">
          <MenuModalAside />

          <div className="dashboard__content">
            <Header />

            <main className="content-main">
              <Outlet />
            </main>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};
