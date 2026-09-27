import { Transaction } from "../model/transaction.model.js";
import { User } from "../model/user.model.js";

export const getTransactionController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { search } = req.query;
    const filter = { user: userId };

    if (search && search.trim() !== "") {
      const trimmed = search.trim();
      const searchRegex = new RegExp(trimmed, "i");

      const orConditions = [
        { description: searchRegex },
        { category: searchRegex },
      ];
      const numericVal = Number(trimmed);
      if (!isNaN(numericVal)) {
        orConditions.push({ amount: numericVal });
      }

      filter.$or = orConditions;
    }

    const transaction = await Transaction.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      data: transaction,
      count: transaction.length,
      message: "All transactions are sent.",
    });
  } catch (error) {
    console.log("Error in getTransactionController: ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const createTransactionController = async (req, res) => {
  try {
    const {description, amount, category, date, amountType } =
      req.body;
    const userId = req.user?._id || req.body.userId || req.body.user;
    
    if (!description || !amount || !category || !date || !amountType) {
      return res.status(400).json({ error: "All feilds are required!" });
    }
    const validCategories = [
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
    ];
    if (amountType !== "income" && amountType !== "expense") {
      return res.status(400).json({ error: "Invalid amount Type!" });
    }
    if (!validCategories.includes(category.toLowerCase())) {
      return res.status(400).json({ error: "Invalid category!" });
    }
    if (description.length > 100) {
      return res.status(400).json({
        error: "Description length should not be greater than 100 letters!",
      });
    }
    if (amount < 1) {
      return res
        .status(400)
        .json({ error: "Amount should not be less than 1 rupeese!" });
    }
    const newTransaction = new Transaction({
      user:userId,
      description,
      amountType,
      amount:Number(amount),
      category: category.toLowerCase(),
      date,
    });
    await newTransaction.save();
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { transactions: newTransaction._id },
      },
      { returnDocument: "after" },
    );

    res.status(201).json({
      data: newTransaction,
      message: "Transaction added successfully!",
    });
  } catch (error) {
    console.log("Error in createTransactionController ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const updateTransactionController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { transactionId } = req.params;
    const { description, amount, category, date, amountType } = req.body;

    const validCategories = [
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
    ];

    const updatedata = {};

    // Validate and set category
    if (category !== undefined) {
      if (!validCategories.includes(category.toLowerCase())) {
        return res.status(400).json({ error: "Invalid category!" });
      }
      updatedata.category = category;
    }

    // Validate and set amountType (Fixed condition)
    if (amountType !== undefined) {
      if (amountType !== "income" && amountType !== "expense") {
        return res
          .status(400)
          .json({
            error: "Invalid amount Type! Must be 'income' or 'expense'.",
          });
      }
      updatedata.amountType = amountType;
    }

    // Validate and set description
    if (description !== undefined) {
      if (typeof description !== "string" || description.trim().length === 0) {
        return res.status(400).json({ error: "Description cannot be empty!" });
      }
      if (description.length > 100) {
        return res.status(400).json({
          error:
            "Description length should not be greater than 100 characters!",
        });
      }
      updatedata.description = description.trim();
    }

    // Validate and set amount
    if (amount !== undefined) {
      const parsedAmount = Number(amount);
      if (isNaN(parsedAmount) || parsedAmount < 1) {
        return res
          .status(400)
          .json({ error: "Amount should be a number and at least 1!" });
      }
      updatedata.amount = parsedAmount;
    }

    // Validate and set date
    if (date !== undefined && date.trim() !== "") {
      updatedata.date = date;
    }

    // Find and update scoped to authenticated user
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, user: userId },
      { $set: updatedata },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedTransaction) {
      return res
        .status(404)
        .json({ error: "Transaction not found or unauthorized!" });
    }

    res.status(200).json({
      data: updatedTransaction,
      message: "Transaction updated successfully!",
    });
  } catch (error) {
    console.log("Error in updateTransactionController: ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const deleteTransactionController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { transactionId } = req.params;
    const deleteTransaction =
      await Transaction.findByIdAndDelete(transactionId);
    await User.findByIdAndUpdate(userId, {
      $pull: { transactions: transactionId },
    });
    if (!deleteTransaction) {
      return res.status(404).json({ error: "Not found!" });
    }
    res.status(200).json({
      daletedTransaction: deleteTransaction,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteTransactionController ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};
