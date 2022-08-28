import User from "../models/User.js";
import jwtGenerator from "../helpers/JWTGenerator.js";
import tokenGenerator from "../helpers/tokenGenerator.js";
import { recoverPasswordEmail, signupEmail } from "../helpers/smtp.js";

const signup = async (req, res) => {
  // security | avoid duplicate records
  const { email } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    const error = new Error("User is allready registered");
    return res.status(400).json({ message: error.message });
  }

  // try & catch | save user
  try {
    // set post data in new User OBject
    const user = new User(req.body);
    user.token = await tokenGenerator();

    // save user
    await user.save();

    // send confirmation email
    signupEmail({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      token: user.token,
    });

    res.json({
      message: "Registered complete, check your email to confirm your account",
    });
  } catch (error) {
    console.log(error);
  }
};

const signin = async (req, res) => {
  // variables
  const { email, password } = req.body;

  // security | User exist
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error("The email or password is not valid");
    return res.status(404).json({ message: error.message });
  }

  // security | User confirmed
  if (!user.confirmed) {
    const error = new Error("The account is not confirmed");
    return res.status(403).json({ message: error.message });
  }

  // security | User check password

  if (!(await user.checkPassword(password))) {
    const error = new Error("The email or password is not valid");
    return res.status(404).json({ message: error.message });
  }

  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      lastname: user.lastname,
      phone: user.phone,
      jwtoken: jwtGenerator(user._id),
    });
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;

  // find user
  const newUser = await User.findOne({ token: token });

  // validation
  if (!newUser) {
    const error = new Error("Invalid token");
    return res.status(403).json({ message: error.message });
  }

  try {
    newUser.confirmed = true;
    newUser.token = "";
    await newUser.save();

    res.json({ message: "user confirmed successfully" });
  } catch (error) {
    console.log(error);
  }
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;

  // security | User exist
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error("This user doesn't exist");
    return res.status(404).json({ message: error.message });
  }

  try {
    user.token = tokenGenerator();
    console.log(user);

    // save user token
    await user.save();

    // send email
    recoverPasswordEmail({
      name: user.name,
      email: user.email,
      token: user.token,
    });

    res.json({
      message: "We have sent an email with the instructions, check your inbox",
    });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await User.findOne({ token: token });

  if (validToken) {
    res.json({ message: "Token valido" });
  } else {
    const error = new Error("Invalid Token");
    return res.status(404).json({ message: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // token validation
  const user = await User.findOne({ token: token });

  if (user) {
    try {
      user.password = password;
      user.token = "";
      await user.save();
      res.json({ message: "New Password saved successfully" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Invalid Token");
    return res.status(404).json({ message: error.message });
  }
};

const profile = async (req, res) => {
  const { user } = req;

  res.json(user);
};

export {
  signup,
  signin,
  confirm,
  recoverPassword,
  checkToken,
  newPassword,
  profile,
};
