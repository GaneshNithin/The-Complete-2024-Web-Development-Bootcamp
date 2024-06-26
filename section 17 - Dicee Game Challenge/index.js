if (!sessionStorage.getItem("visited")) {
  document.querySelector(".img1").setAttribute("src", "images/dice6.png");

  document.querySelector(".img2").setAttribute("src", "images/dice6.png");

  sessionStorage.setItem("visited", "true");
} else {
  const randomNumber1 = Math.floor(Math.random() * 6) + 1;
  const randomNumber2 = Math.floor(Math.random() * 6) + 1;
  const h1 = document.querySelector("h1");

  document
    .querySelector(".img1")
    .setAttribute("src", `images/dice${randomNumber1}.png`);

  document
    .querySelector(".img2")
    .setAttribute("src", `images/dice${randomNumber2}.png`);

  if (randomNumber1 === randomNumber2) {
    h1.textContent = "Draw!";
  } else if (randomNumber1 > randomNumber2) {
    h1.textContent = "🚩 Player 1 Wins!";
  } else {
    h1.textContent = "Player 2 Wins! 🚩";
  }
}
