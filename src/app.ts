import express, { RequestHandler } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import morgan from "morgan";
import { config } from "./utils/config";
import { globalLimiter } from "./utils/RateLimit";

const morganFormat = ":method :url :status :response-time ms";
const app = express();

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(globalLimiter);
app.use(morgan("dev"));
app.use(express.json({ limit: "16kb" }) as RequestHandler);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Routes defined

import userRouter from "./routes/user.routes";
import healthcheckRouter from "./routes/healthcheck.routes";
import teamRouter from "./routes/team.routes";
import resourceRouter from "./routes/resource.routes";
import postRouter from "./routes/post.routes";
import githubApiRouter from "./routes/githubapi.routes";
import genAIRouter from "./routes/genAI.routes";
import communityRouter from "./routes/communityPost.routes";
import contactRouter from "./routes/contact.routes";

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/resources", resourceRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/github", githubApiRouter);
app.use("/api/v1/genAI", genAIRouter);
app.use("/api/v1/community", communityRouter);
app.use("/api/v1/contact", contactRouter);

export { app };
