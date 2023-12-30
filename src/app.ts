import express from "express";
import path from "path";
import log from "./utils/logger";
import routes from "./routes";

if (process.env.API_BASE_URL === undefined) {
  log.error("API_BASE_URL environment hasn't been set.");
  process.exit(1);
}

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

app.listen(port, () => {
  log.info(`Server started at port ${port}`);

  routes(app);
});
