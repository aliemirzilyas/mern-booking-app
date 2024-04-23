import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import verifyToken from "../middleware/auth";
import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required!").isEmail(),
    check("password", "Password with 6 or more characters required!").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(400).json({ message: "Invalid credentials!" });

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials!" });

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).json({ message: "Signed in successfully!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
);

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "Logged out successfully!" });
});

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  return res.status(200).json({ userId: req.userId });
});

export default router;
