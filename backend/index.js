import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./config/connectDB.js";
import expenseRouter from "./routes/expense.router.js";

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hello World!" });
// });
app.use("/api/expense",expenseRouter)

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is listening at http://localhost:${port}`);
});
