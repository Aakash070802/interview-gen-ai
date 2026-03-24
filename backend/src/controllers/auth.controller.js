import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import Blacklist from "../models/blacklist.model.js";

/**
 * @name registerController
 * @description Register a new user, expects username, age, email, and password
 * @access Public
 */
const registerController = async (req, res) => {
  const { username, age, email, password } = req.body;

  /* INPUT FIELD VALIDATION */
  if (!age || !username.trim() || !email.trim() || !password.trim()) {
    return res.status(400).json({
      message: "All fields are required!",
    });
  }

  /* EXISTED USER */
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return res.status(409).json({
      message: "Username already taken",
    });
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(409).json({
      message: "Email already registered",
    });
  }

  const user = await User.create({
    username,
    age,
    email,
    password,
  });

  /* TOKEN CREATION */
  const token = jwt.sign(
    {
      id: user?._id,
      username: user?.username,
      email: user?.email,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  if (!token) {
    return res
      .status(500)
      .json({ message: "Failed to create token while Registering user" });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("token", token, options);

  /* DELETE PASSWORD */
  const createdUser = user.toObject();
  delete createdUser.password;

  return res.status(201).json({
    message: "Your Account created Successfully",
    createdUser,
  });
};

/**
 * @name loginController
 * @description login a user, expects email and password
 * @access Public
 */
const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required!",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid Email or password!" });
  }

  /* CHECK PASSWORD */
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Credentials!" });
  }

  /* TOKEN CREATION */
  const token = jwt.sign(
    {
      id: user?._id,
      username: user?.username,
      email: user?.email,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  if (!token) {
    return res
      .status(500)
      .json({ message: "Failed to create token while Logging user" });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("token", token, options);

  /* DELETE PASSWORD */
  const loggedInUser = user.toObject();
  delete loggedInUser.password;

  return res
    .status(200)
    .json({ message: "You Logged In Successfully", loggedInUser });
};

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add token in blacklist
 * @access Private
 */
const logoutController = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token is required for logout" });
  }

  res.clearCookie("token", "", { httpOnly: true, secure: true });

  await Blacklist.create({ token });

  return res.status(200).json({ message: "User Logged out successfully" });
};
/**
 * @route GET /api/auth/get-me
 * @description fetch user details and return
 * @access Private
 */
const getUserDetails = async (req, res) => {
  const user = await User.findById(req.user);

  const userObj = user.toObject();
  delete userObj.password;

  return res
    .status(200)
    .json({ message: "User details fetched successfully", userObj });
};

export {
  registerController,
  loginController,
  logoutController,
  getUserDetails,
};
