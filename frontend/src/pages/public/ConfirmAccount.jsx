import { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import { authApi } from "../../api";
import { ToastAlertError, ToastAlertSuccess } from "../../components/elements";

export const ConfirmAccount = () => {
  const [confirmedAccount, setConfirmedAccount] = useState(false);

  const params = useParams();

  const { token } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${token}`;

        const answer = await authApi.get(url);

        const { data } = answer;

        ToastAlertSuccess(data.message);

        setConfirmedAccount(true);
      } catch (error) {
        const { data } = error.response;

        ToastAlertError(data.message);
      }
    };

    confirmAccount();
  }, []);
  return (
    <div className="auth-box">
      <h2>
        Confirm your account and create new <span>projects</span>
      </h2>

      {confirmedAccount && (
        <p>
          Your account was verified, now <Link to={"/"}>Sign in</Link>
        </p>
      )}
    </div>
  );
};
