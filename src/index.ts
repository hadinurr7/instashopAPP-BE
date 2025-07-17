import express, { NextFunction, Request, Response } from "express";
import authRouter from "./routes/auth.router";
import { PORT } from "./config";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.router";
import storyRouter from "./routes/story.router";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/story", storyRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
