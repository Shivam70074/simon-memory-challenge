let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#start-btn");

let gameOverPopup = document.querySelector("#game-over-popup");
let finalScore = document.querySelector("#final-score");
let restartBtn = document.querySelector("#restart-btn");
let overlay = document.querySelector("#overlay");
let highScore = localStorage.getItem("highScore") || 0;
let highScoreText = document.querySelector("#high-score");

highScoreText.innerText = "🏆 High Score : " + highScore;

startBtn.addEventListener("click", function () {
       if (started == false) {
       started = true;
       startBtn.innerText = "Playing...";
        startBtn.disabled = true;
       levelUp();
}
});

let btns = ["red", "yellow", "green", "blue"];

function playSound(color) {
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function levelUp() {
  userSeq = [];

    level++;
    h2.innerText = "Level " + level;

    let randomIndex = Math.floor(Math.random() * 4);
    console.log(randomIndex);

    let randomColor = btns[randomIndex];
      console.log(randomColor);

      let randomBtn = document.querySelector("#" + randomColor);
      gameSeq.push(randomColor);
       console.log(gameSeq);

      playSound(randomColor);
      gameFlash(randomBtn);
}

function gameFlash(btn) {

    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);

}

function userFlash(btn) {

    btn.classList.add("userFlash");

    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {
        console.log("Correct");

        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else { 
         playSound("wrong");
         
        if (level > highScore) {
    highScore = level;
    localStorage.setItem("highScore", highScore);
    highScoreText.innerText = "🏆 High Score : " + highScore;}

         finalScore.innerText = level;
        gameOverPopup.style.display = "block";
        gameOverPopup.style.animation = "none";
      gameOverPopup.offsetHeight;
     gameOverPopup.style.animation = "popupAnimation .35s ease";
        overlay.style.display = "block";

    document.querySelector("body").classList.add("gameOver");

    setTimeout(function () {
        document.querySelector("body").classList.remove("gameOver");
    }, 200);

    reset();
}
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startBtn.innerText = "Start Game";
     startBtn.disabled = false;
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", function () {
        userFlash(this);

         let userColor = this.getAttribute("id");
         playSound(userColor);
        console.log(userColor);

        userSeq.push(userColor);
          console.log(userSeq);

        let idx = userSeq.length - 1;
           checkAns(idx);
    });
}

restartBtn.addEventListener("click", function () {

    gameOverPopup.style.display = "none";
    overlay.style.display = "none";

});