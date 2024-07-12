import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "1234",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getItems() {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");

  return result.rows;
}

async function catchFunction(callBackFunction, res) {
  try {
    await callBackFunction();
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
}

app.get("/", async (req, res) => {
  const items = await getItems();

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  await catchFunction(async () => {
    const item = req.body.newItem;

    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);

    res.redirect("/");
  }, res);
});

app.post("/edit", async (req, res) => {
  await catchFunction(async () => {
    const { updatedItemId, updatedItemTitle } = req.body;

    await db.query("UPDATE items SET title=$1 WHERE id=$2", [
      updatedItemTitle,
      updatedItemId,
    ]);

    res.redirect("/");
  }, res);
});

app.post("/delete", async (req, res) => {
  await catchFunction(async () => {
    const { deleteItemId } = req.body;

    await db.query("DELETE FROM items WHERE id=$1", [deleteItemId]);

    res.redirect("/");
  }, res);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
