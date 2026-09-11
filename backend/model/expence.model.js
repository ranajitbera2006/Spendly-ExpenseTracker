import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "food",
        "transportation",
        "entertainment",
        "shopping",
        "bills",
        "healthcare",
        "other",
      ],
    },
    date: {
      type: Date,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true },
);

export const Expense = mongoose.model("Expense", expenseSchema);
