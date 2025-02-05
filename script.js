(function () {
  let score = 0;
  let isGuessCorrect = null;
  const scoreEl = document.getElementById("score");
  const colorOptionParent = document.querySelector(".color-options");
  const newGameBtn = document.querySelector(".new-game");
  const gameStatusEl = document.getElementById("game-status");

  function generateRandomColor() {
    const color = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    return color;
  }
  function checkIsGuessCorrect(colorOptionIndex, colorBoxIndex) {
    isGuessCorrect = colorOptionIndex === colorBoxIndex;
    updateGameStatus();
  }
  function updateGameStatus() {
    if (isGuessCorrect !== null && !isGuessCorrect) {
      gameStatusEl.innerHTML = "Wrong! Try again";
      gameStatusEl.style.color = "#FF0000";
    } else {
      score++;
      gameStatusEl.innerHTML = "Correct!";
      gameStatusEl.style.color = "#00FF00";

      scoreEl.innerHTML = score;
      generateColorOptions();
    }
    gameStatusEl.classList.add("fade");
    setTimeout(() => gameStatusEl.classList.remove("fade"), 500);
  }

  function generateColorOptions() {
    const colorBox = document.querySelector(".color-box");
    const colors = Array.from({ length: 6 }, generateRandomColor);
    const colorBoxIndex = Math.floor(Math.random() * 6);
    const randomColorOption = colors[colorBoxIndex];

    colorBox.style.backgroundColor = randomColorOption;
    colorOptionParent.innerHTML = null;

    colors.forEach((color, index) => {
      const colorOption = document.createElement("span");
      colorOption.onclick = () => checkIsGuessCorrect(index, colorBoxIndex);
      colorOption.setAttribute("data-testid", "colorOption");
      colorOption.setAttribute("aria-label", `Guess color ${color}`);
      colorOption.classList.add("color-option");
      colorOption.style.backgroundColor = color;
      colorOptionParent.appendChild(colorOption);
    });
  }
  function startNewGame() {
    gameStatusEl.innerHTML = "Make a guess!";
    score = 0;
    scoreEl.innerHTML = score;
    gameStatusEl.style.color = "";

    generateColorOptions();
  }
  startNewGame();

  newGameBtn.addEventListener("click", startNewGame);
})();
