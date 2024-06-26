const buttons = document.querySelectorAll("button.drum");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const buttonText = this.innerHTML;

    playMusic(buttonText);
    buttonAnimation(buttonText);
  });
});

document.addEventListener("keydown", function (event) {
  const key = event.key;

  playMusic(key);
  buttonAnimation(key);
});

const playMusic = (text) => {
  switch (text) {
    case "w":
      playSound("sounds/crash.mp3");
      break;
    case "a":
      playSound("sounds/kick-bass.mp3");
      break;
    case "s":
      playSound("sounds/snare.mp3");
      break;
    case "d":
      playSound("sounds/tom-1.mp3");
      break;
    case "j":
      playSound("sounds/tom-2.mp3");
      break;
    case "k":
      playSound("sounds/tom-3.mp3");
      break;
    case "l":
      playSound("sounds/tom-4.mp3");
      break;
  }
};

const playSound = (location) => {
  const audio = new Audio(location);

  audio.play();
};

const buttonAnimation = (currentKey) => {
  const activeButton = document.querySelector(`.${currentKey}`);

  activeButton.classList.add("pressed");

  setTimeout(() => {
    activeButton.classList.remove("pressed");
  }, 100);
};
