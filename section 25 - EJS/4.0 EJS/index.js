import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

const app = express();

app.get("/", (req, res) => {
  const day = new Date().getDay();
  const isWeekend = day === 6 || day === 0;

  res.render(__dirname + "/views/index.ejs", { isWeekend });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
