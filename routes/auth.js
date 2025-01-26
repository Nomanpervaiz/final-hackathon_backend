import express from "express";
import { UserModel } from "../models/UserModel.js";
import Joi from "joi";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticateUser } from "../middleware/authenticateUser.js";

router.get("/", (req, res) => {
  res.status(200).json({
    error: false,
    message: "auth api called",
  });
});

router.get("/register", authenticateUser, async (req, res) => {
  const users = await UserModel.find();
  if (!users) {
    res.status(404).json({
      error: true,
      message: "users not found",
    });
  }

  res.status(200).json({
    error: false,
    message: "register api called",
    data: users,
  });
});

// Joi schema for user validation
const joiRegisterSchema = Joi.object({
  cnic: Joi.string().trim().required().max(13),
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).trim().required(),
});

router.post("/register", async (req, res) => {
  try {
    // Validate the incoming request data
    const { cnic,name, email, password } = req.body;
    const { error, value: validatedUser } = joiRegisterSchema.validate({
      cnic,
      name,
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        error: true,
        message: error.details[0].message,
      });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        error: true,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      cnic : validatedUser.cnic,
      name: validatedUser.name,
      email: validatedUser.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      error: false,
      message: "User created successfully",
    });

  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

// Login flow
// Joi schema for user validation
const joiLoginSchema = Joi.object({
  cnic: Joi.string().trim().required().max(13),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).trim().required(),
});
router.post("/login", async (req, res) => {
  try {
    const { cnic , email, password } = req.body;
    const { error, value: validatedUser } = joiLoginSchema.validate({
      cnic,
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        error: true,
        message: error.details[0].message,
      });
    }

    // Check if the user already exists
    const isUserExist = await UserModel.findOne({ cnic : cnic });
    if (!isUserExist) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }
    // Compare the password
    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Invalid credentials",
      });
    }
    let token = jwt.sign(
      { id: isUserExist._id, email: isUserExist.email , cnic : isUserExist.cnic },
      process?.env?.JWT_SECRET
    );
    res.status(200).json({
      error: false,
      message: "User logged in successfully.",
      data: {
        token,
        user: {
          id: isUserExist._id,
          email: isUserExist.email,
          cnic : isUserExist.cnic
        },
      },
    });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

router.get("/login", authenticateUser, async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  user.password = "";
  res.status(200).json({
    message: "User fetched successfully",
    error: false,
    data: user,
  });
});

// ye route user ko delete karne ke liye hai
router.delete("/", authenticateUser, (req, res) => {
  const deleteUser = req.body;

  const findUserAndDelete = user.find((obj) => obj.id === deleteUser.id);
  console.log("findUserAndDelete==>", findUserAndDelete);
  if (!findUserAndDelete) {
    return res.status(404).json({
      error: true,
      message: "user not exist",
      data: null,
    });
  }
  const deletableUser = user.indexOf(findUserAndDelete);
  console.log("deletableUser ==>", deletableUser);
  user.splice(deletableUser, 1);
  res.status(201).json({
    error: false,
    message: "user deleted successfully!",
    data: user,
  });
});

export default router;
