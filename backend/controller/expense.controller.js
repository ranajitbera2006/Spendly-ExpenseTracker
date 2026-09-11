import { Expense } from "../model/expence.model.js";

export const getAllExpenseController = async (req, res) => {
  try {
    const expense = await Expense.find();
    res.status(200).json({
      data: expense,
      count: expense.length,
      message: "All expenses are sent.",
    });
  } catch (error) {
    console.log("Error in getAllExpenseController ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const createExpenseController = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    if (!description || !amount || !category || !date) {
      return res.status(400).json({ error: "All feilds are required!" });
    }
    const validCategories = [
      "food",
      "transportation",
      "entertainment",
      "shopping",
      "bills",
      "healthcare",
      "other",
    ];
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
    const newExpense = new Expense({ description, amount, category, date });
    await newExpense.save();
    res
      .status(201)
      .json({ data: newExpense, message: "Expense added successfully!" });
  } catch (error) {
    console.log("Error in createExpenseController ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const updateExpenseController = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    const { expenseId } = req.params;
    let updatedata = {};
    const validCategories = [
      "food",
      "transportation",
      "entertainment",
      "shopping",
      "bills",
      "healthcare",
      "other",
    ];
    if (category && !validCategories.includes(category?.toLowerCase())) {
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

    if (description && description.trim() !== "") {
      updatedata.description = description;
    }
    if (amount && amount !== 0) {
      updatedata.amount = amount;
    }
    if (description && description.trim() !== "") {
      updatedata.description = description;
    }
    if (category && category.trim() !== "") {
      updatedata.category = category;
    }
    if (date && date.trim() !== "") {
      updatedata.date = date;
    }
    const updateExpense = await Expense.findOneAndUpdate(
      { _id: expenseId },
      { $set: updatedata },
      { returnDocument: "after", runValidators: true },
    );

    res
      .status(200)
      .json({ data: updateExpense, message: "Expense updated successfully!" });
  } catch (error) {
    console.log("Error in updateExpenseController ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const deleteExpenseController = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const deleteExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deleteExpense) {
      return res.status(404).json({ error: "Not found!" });
    }
    res.status(200).json({
      daletedExpense: deleteExpense,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleteExpenseController ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};
