import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookie from "cookie-parser";
import express from "express";

import userRoute from "./routes/user.route.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookie());
app.use(compression());

app.use("/api", userRoute);

export default app;
