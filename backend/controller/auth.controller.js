import { signInSchema, signUpSchema } from "../validation/signup.validation.js";
import User  from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
  try {
    const signUpBody = signUpSchema.safeParse(req.body);

    if (!signUpBody) {
      return res.status(400).json({
        message: "Incorrect Format",
        error: signUpBody.error.errors,
        success: false,
      });
    }

    const { username, password, email } = signUpBody.data;

    const credExists = await User.findOne({ $or: [{ username }, { email }] });

    if (credExists) {
      return res
        .status(400)
        .json({ message: "Something went wrong", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    if (user) {
      return res.status(200).json({ message: "Signed Up!", success: true });
    } else {
      return res
        .status(400)
        .json({ message: "Request Failed!", success: false });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function signIn(req, res) {
  try {
    const signIn = signInSchema.safeParse(req.body);

    if (!signIn) {
      return res.status(400).json({
        message: "Incorrect Format",
        error: signUpBody.error.errors,
        success: false,
      });
    }
    const { email, password } = signIn.data;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res
        .status(404)
        .json({ message: "Something went wrong", success: false });
    }

    const comparePass = await bcrypt.compare(password, userExists.password);

    if (comparePass) {
      const token = jwt.sign({ id: userExists._id, role: userExists.role },process.env.JWT_SECRET);
      if (token) {
        return res
          .status(200)
          .json({ message: "Signed In!", success: true, token });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Something went wrong", success: false });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
