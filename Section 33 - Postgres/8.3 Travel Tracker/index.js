import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "1234",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let countries = [];

app.get("/", async (req, res) => {
  db.query("SELECT country_code FROM visited_countries", (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      result.rows.forEach((country) => {
        countries.push(country.country_code);
      });
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
      });
    }
  });
});

app.post("/add", (req, res) => {
  const country = req.body.country;

  db.query(
    `SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'`,
    [country.toLowerCase()],
    (err, result) => {
      if (err) {
        return console.log(err.stack);
      }

      if (result.rows.length === 0) {
        return res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          error: "Country name does not exists, please try again.",
        });
      }

      if (result.rows.length > 1) {
        return res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          error: "Multiple countries exists, please try again.",
        });
      }

      const [{ country_code: countryCode }] = result.rows;

      db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode],
        (err, result) => {
          if (err) {
            return res.render("index.ejs", {
              countries: countries,
              total: countries.length,
              error: "Country has already added, please try again.",
            });
          }
          res.redirect("/");
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
