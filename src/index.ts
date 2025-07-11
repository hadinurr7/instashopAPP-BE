import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./config";
import authRouter from "./routes/auth.router";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
