import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [100, "Description cannot exceed 100 characters"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be greater than 0"],
    },
    amountType: {
      type: String,
      required: true,
      enum: {
        values: ["income", "expense"],
        message: "{VALUE} is not a valid amount type",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: [
          "food",
          "transportation",
          "entertainment",
          "shopping",
          "bills",
          "healthcare",
          "salary",
          "freelance",
          "investments",
          "dividends",
          "rental",
          "gifts",
          "other",
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
