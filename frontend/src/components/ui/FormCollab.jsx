import { useState } from "react";
import { useProjects } from "../../hooks";
import { Alert } from "../elements";

export const FormCollab = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);

  const { submitCollab } = useProjects();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "") {
      setAlert(true);
      return;
    }

    setAlert(false);

    await submitCollab(email);
  };

  return (
    <form className="form-collab container-m" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="email">Collaborator email:</label>

        <input
          id="email"
          type={"email"}
          placeholder="Search a collaborator by email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {alert ? <Alert>You need to set an email</Alert> : null}

      <div className="button-ban">
        <input
          className={"button-email"}
          type={"submit"}
          value="Search collab"
        />
      </div>
    </form>
  );
};
