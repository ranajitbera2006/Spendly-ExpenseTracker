import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { connectDB } from "./config/connectDB.js";
import userRouter from "./routes/user.router.js";
import transactionRouter from "./routes/transaction.router.js";

const port = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      // If no origin exists (curl, Postman, server-to-server), pass true,origin mean the frontend url
      callback(null, origin || true);
    },
    credentials: true, // Sends Access-Control-Allow-Credentials: true
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is listening at http://localhost:${port}`);
});
