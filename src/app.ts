import express from "express";
import cors from "cors";
import path from "path";

import { AppLogger } from "./utils/whispeer.logger";
import routes from "./routes";

require("dotenv").config();

let logger = new AppLogger();

const port = (process.env.PORT || 3000) as number;

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  "/",
  express.static(path.join(__dirname, "../static"), {
    maxAge: 31557600000, // 1 year,
    immutable: true,
    lastModified: false,
  })
);

// Check origin only for production
if (process.env.NODE_ENV === "production") {
  if (process.env.CORS_ORIGIN === undefined) {
    logger.error(
      "CORS_ORIGIN environment variable hasn't been set. Exiting..."
    );
    process.exit(1);
  }

  const corsOptions = {
    origin: `https://${process.env.CORS_ORIGIN}`,
  };

  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

app.listen(port, () => {
  logger.info(`Server started at port ${port}`);

  routes(app);
});
