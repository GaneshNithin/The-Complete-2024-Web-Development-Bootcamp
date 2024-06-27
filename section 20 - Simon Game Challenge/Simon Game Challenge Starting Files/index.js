const colors = ["red", "blue", "green", "yellow"];
let randomColors = [];
let pressedColors = [];

$(document).on("keydown", () => {
  if (randomColors.length) return;

  showLevel();
});

$(".btn").on("click", (event) => {
  const clickedButton = event.target.id;

  pressedColors.push(clickedButton);
  animatePressedButton(clickedButton);

  checkGameStatus();
});

const checkGameStatus = () => {
  const randomColorsString = randomColors.join("");
  const pressedColorsString = pressedColors.join("");

  if (randomColorsString === pressedColorsString) {
    pressedColors = [];

    setTimeout(() => {
      showLevel();
    }, 1000);
  } else if (!randomColorsString.startsWith(pressedColorsString)) {
    $("h1").text("Game Over, Press Any Key to Restart");

    randomColors = [];
    pressedColors = [];

    animateGameOver();
  }
};

const showLevel = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColor = colors[randomNumber];

  randomColors.push(randomColor);

  $("h1").text(`Level ${randomColors.length}`);
  $(`.${randomColor}`).fadeOut(100).fadeIn(100);
  playSound(randomColor);
};

const animateGameOver = () => {
  $("body").addClass("game-over");
  playSound("wrong");

  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
};

const animatePressedButton = (buttonClass) => {
  $(`.${buttonClass}`).addClass("pressed");
  playSound(buttonClass);

  setTimeout(() => {
    $(`.${buttonClass}`).removeClass("pressed");
  }, 100);
};

const playSound = (buttonClass) => {
  const audio = new Audio(`sounds/${buttonClass}.mp3`);

  audio.play();
};
