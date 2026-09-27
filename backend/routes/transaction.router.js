import express from "express";

import {
  createTransactionController,
  deleteTransactionController,
  getTransactionController,
  updateTransactionController,
} from "../controller/transactionC.controller.js";
import { protectAuth } from "../middleware/protectAuth.js";
const transactionRouter = express.Router();

transactionRouter.post(
  "/addTransaction",
  protectAuth,
  createTransactionController,
);
transactionRouter.get(
  "/getTransaction",
  protectAuth,
  getTransactionController,
);
transactionRouter.patch(
  "/updateTransaction/:transactionId",
  protectAuth,
  updateTransactionController,
);
transactionRouter.delete(
  "/deleteTransaction/:transactionId",
  protectAuth,
  deleteTransactionController,
);

export default transactionRouter;
