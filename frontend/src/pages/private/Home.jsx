import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";

export const Home = () => {
  const { setPagePath } = useAuth();

  // set path
  const path = useLocation();
  setPagePath(path.pathname);

  return (
    <>
      <h1>Home</h1>

      <div>
        <p>Desde Home dashboard</p>
      </div>
    </>
  );
};
