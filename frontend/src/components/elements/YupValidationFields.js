import * as Yup from "yup";

// auth

export const YupNewUser = Yup.object().shape({
  name: Yup.string()
    .min(3, "Your name is too short")
    .max(40, "Your name is too long")
    .required("User name is required"),

  lastname: Yup.string()
    .min(3, "Your lastname is too short")
    .max(40, "Your lastname is too long")
    .required("User lastname is required"),

  phone: Yup.number()
    .positive("Invalid phone number format")
    .integer("Invalid phone number format")
    .typeError("Invalid phone number format")
    .required("Phone number is required"),

  email: Yup.string()
    .email("This email is invalid")
    .required("User email is required"),

  password: Yup.string()
    .min(8, "The password must have a minimum of 8 characters")
    .max(40, "The password cannot be more than 40 characters")
    .matches(/^(?=.{8,})/, "The password must Contain 8 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "The password must Contain One Uppercase, One Lowercase"
    )
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "The password must Contain One Special Case Character"
    )
    .matches(/^(?=.{6,20}$)\D*\d/, "The password must Contain One Number")
    .required("User password is required"),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("User password is required"),
});

export const YupNewEmail = Yup.object().shape({
  email: Yup.string()
    .email("This email is invalid")
    .required("User email is required"),
});

export const YupNewPassword = Yup.object().shape({
  password: Yup.string()
    .min(8, "The password must have a minimum of 8 characters")
    .max(40, "The password cannot be more than 40 characters")
    .matches(/^(?=.{8,})/, "The password must Contain 8 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "The password must Contain One Uppercase, One Lowercase"
    )
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "The password must Contain One Special Case Character"
    )
    .matches(/^(?=.{6,20}$)\D*\d/, "The password must Contain One Number")
    .required("User password is required"),
});

export const YupNewSession = Yup.object().shape({
  email: Yup.string()
    .email("This email is invalid")
    .required("User email is required"),

  password: Yup.string()
    .min(8, "The password must have a minimum of 8 characters")
    .max(40, "The password cannot be more than 40 characters")
    .required("User password is required"),
});

// projects

export const YupNewProject = Yup.object().shape({
  name: Yup.string()
    .min(5, "The project name is too short")
    .max(40, "The project name is too long")
    .required("Project name is required"),

  description: Yup.string()
    .min(10, "The project description is too short")
    .max(220, "The project description is too long, be more specific")
    .required("Project description is required"),

  dateDelivery: Yup.date()
    .typeError("Enter a valid date")
    .required("You need to enter a project date"),
  // .min(new Date().setHours(0, 0, 0, 0), "Date cannot be in the past"),

  client: Yup.string()
    .min(4, "The client name is too short")
    .max(60, "The client name is too long")
    .required("Client name is required"),
});

// tasks

export const YupNewTask = Yup.object().shape({
  name: Yup.string()
    .min(5, "The task name is too short")
    .max(40, "The task name is too long")
    .required("Task name is required"),

  description: Yup.string()
    .min(10, "The task description is too short")
    .max(300, "The task description is too long, be more specific")
    .required("Task description is required"),

  state: Yup.string().required("You need to set an state "),

  dateDelivery: Yup.date()
    .typeError("Enter a valid date")
    .required("You need to enter a task date"),

  priority: Yup.string().required("You need to set a priority"),
});
