/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([{ message: "Please provide input", name: "URL" }])
  .then((answers) => {
    const qr_png = qr.image(answers.URL, { type: "png" });
    qr_png.pipe(fs.createWriteStream("my_answer.png"));

    fs.writeFileSync("my_answer.txt", answers.URL)
      .then(() => {
        console.log("The file has been saved!");
      })
      .catch((error) => {
        console.error("Error writing file: ", error);
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
  });
