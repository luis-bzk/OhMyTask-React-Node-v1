import { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import { authApi } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const [jswToken, setJswToken] = useState(null);

  const lastPath = localStorage.getItem("lastPath") || "/dashboard";

  const navigate = useNavigate();

  // login
  const newUserLogin = (dataUser) => {
    setAuth(dataUser);
    setJswToken(dataUser.jwtoken);

    localStorage.setItem("jwtoken", dataUser.jwtoken);
  };

  // set path user
  const setPagePath = (path) => {
    localStorage.setItem("lastPath", path);
  };

  // session before & JWToken valid ? setSession
  useEffect(() => {
    const userAuthentication = async () => {
      const jwtoken = localStorage.getItem("jwtoken");

      if (!jwtoken) {
        setLoading(false);
        return;
      }

      setJswToken(jwtoken);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtoken}`,
        },
      };

      try {
        const url = "/users/profile";

        const answer = await authApi.get(url, config);
        const { data } = answer;

        setAuth(data);

        navigate(lastPath);
      } catch (error) {
        setAuth({});
      } finally {
        setLoading(false);
      }
    };

    userAuthentication();
  }, []);

  const logOutAuth = () => {
    setAuth({});
    setJswToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ newUserLogin, auth, loading, setPagePath, jswToken, logOutAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
