import express from "express";

import {
  createExpenseController,
  deleteExpenseController,
  getAllExpenseController,
  updateExpenseController,
} from "../controller/expense.controller.js";

const expenseRouter = express.Router();

expenseRouter.post("/addExpense", createExpenseController);
expenseRouter.get("/getAllExpense", getAllExpenseController);
expenseRouter.patch("/updateExpense/:expenseId", updateExpenseController);
expenseRouter.delete("/deleteExpense/:expenseId", deleteExpenseController);

export default expenseRouter;
