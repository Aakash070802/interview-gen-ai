import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

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
      age: user?.age,
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

  /* SETTING TOKEN IN COOKIE */
  res.cookie("token", token);

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
      age: user?.age,
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

  /* SETTING TOKEN IN COOKIE */
  res.cookie("token", token);

  /* DELETE PASSWORD */
  const loggedInUser = user.toObject();
  delete loggedInUser.password;

  return res
    .status(200)
    .json({ message: "You Logged In Successfully", loggedInUser });
};

export { registerController, loginController };
