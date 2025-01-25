import express from "express";
import authRouter from "../routes/auth.js";
import beneficiaryRouter from "../routes/beneficiary.js";
import tokenRouter from "../routes/token.js";

const router = express.Router();

router.get("/", (req, res) =>
  res.status(200).json({
    error: false,
    message: "Welcome to the API",
  })
);
router.use("/auth", authRouter);
router.use("/beneficiary", beneficiaryRouter);
router.use("/token", tokenRouter);

export default router;
