import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { authApi } from "../../api";
import { NewPasswordForm } from "../../components/authForms";
import { ToastAlertError, ToastAlertSuccess } from "../../components/elements";

export const NewPassword = () => {
  const [validToken, setValidToken] = useState(false);
  // const [passwordChanged, setPasswordChanged] = useState(false);

  const params = useParams();

  const { token } = params;

  useEffect(() => {
    const validateToken = async () => {
      try {
        const url = `/users/forgot-password/${token}`;

        const answer = await authApi.get(url);

        const { data } = answer;

        // ToastAlertSuccess(data.message);

        setValidToken(true);
      } catch (error) {
        const { data } = error.response;

        ToastAlertError(data.message);
      }
    };

    validateToken();
  }, []);

  return (
    <div className="auth-box">
      <h2>
        Create an account and manage your <span>projects</span>
      </h2>

      {validToken && <NewPasswordForm token={token} />}
    </div>
  );
};
