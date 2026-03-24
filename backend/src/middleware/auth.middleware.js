import config from "../config/config.js";
import Blacklist from "../models/blacklist.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access,token is missing" });
  }

  const isBlacklisted = await Blacklist.findOne({ token });

  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access,token is blacklisted" });
  }

  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    // console.log(decodedToken);

    if (!decodedToken?.id) {
      return res.status(401).json({
        message: "Unauthorized Access, token is invalid via verification",
      });
    }

    const user = await User.findById(decodedToken?.id);
    req.user = user;

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access,token is invalid" });
  }
};

export { authMiddleware };
