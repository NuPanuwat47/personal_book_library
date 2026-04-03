import express from "express";
import dotenv from "dotenv";
import {connectDatabase} from "./config/database.js";
import bookRoutes from "./book/book.route.js";
import userRoutes from "./user/user.route.js";
import authRoutes from "./middleware/auth.route.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello, World!!!');
});

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};  

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

app.use(bookRoutes);
app.use(userRoutes);
app.use(authRoutes);