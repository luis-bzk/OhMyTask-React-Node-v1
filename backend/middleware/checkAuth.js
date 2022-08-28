import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
  let jwtoken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      jwtoken = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(jwtoken, process.env.JWT_SECRET);
      // console.log(decoded);

      req.user = await User.findById(decoded.id).select(
        "-password -confirmed -token -createdAt -updatedAt -__v"
      );

      return next();
      // console.log(req.user);
    } catch (error) {
      return res.status(404).json({ msg: "An Error has courred" });
    }
  }

  if (!jwtoken) {
    const error = new Error("Invalid Token");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
