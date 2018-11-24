// Code elements that user has to type
var codeArray = [
  {
    codeSnippet: "<img>",
    codeBase: "html",
    gameLevel: 1
  },
  {
    codeSnippet: "<div>",
    codeBase: "html",
    gameLevel: 1
  },
  {
    codeSnippet: "<h1>",
    codeBase: "html",
    gameLevel: 1
  },
  {
    codeSnippet: "<li>",
    codeBase: "html",
    gameLevel: 1
  },
  {
    codeSnippet: "<th>",
    codeBase: "html",
    gameLevel: 1
  },
  {
    codeSnippet: "<button>",
    codeBase: "html",
    gameLevel: 1
  },
  {
    codeSnippet: "<a>",
    codeBase: "html",
    gameLevel: 1
  },
  {
    codeSnippet: "<span>",
    codeBase: "html",
    gameLevel: 1
  }
];


var playerName = "";
var x1 = 180;
var x2 = 100;
var correctCount = 1;
var levelCount = 1;
var levelSpeed = 0.5;

var backgroundSound = new Audio("./sounds/background.mp3");
var errorSound = new Audio("./sounds/error1.mp3");
var correctSound = new Audio("./sounds/correct1.mp3");
var levelUp = new Audio("./sounds/levelup.mp3");
var gameOver = new Audio("./sounds/gameover.mp3");

window.onload = function() {
  // hides the canvas and game form field before the game started
  $("#enterButton")
    .parent()
    .hide();
  $("#startText").show();

  document.getElementById("startButton").onclick = function() {
    $("#enterButton")
      .parent()
      .show();
    $("#startPage")
      .siblings()
      .hide();
    playerName = $("#enteredPlayer").prop("value");

    backgroundSound.onload = backgroundSound.play();
    startGame();
  };

  function startGame() {
    var enterArray = []; // array of entered code elements that user typed
    var gameArray = []; // array of randomly picked code that user has to type
    var gameScore = 0; // score the user achieves
    var gameLives = 3; // count of mistakes possible until game over

    var ctx = document.getElementById("syntaxxo-frame").getContext("2d");
    ctx.clearRect(0, 0, 400, 200);
    ctx.fillRect(20, 20, 400, 500); // drawing the frame for the code-parts
    //window.requestAnimationFrame(updateCanvas);

    var imgBack = new Image();
    imgBack.onload = function() {
      ctx.drawImage(imgBack, background.x, background.y, 400, 500);
    };
    imgBack.src = "./images/background_1.png";

    var imgLaser = new Image();
    imgLaser.onload = function() {
      ctx.drawImage(imgLaser, 150, 450, 40, 20);
    };
    imgLaser.src = "./images/lasergun.gif";

    var imgHome = new Image();
    imgHome.onload = function() {
      ctx.drawImage(imgHome, 0, 0, 400, 50);
    };
    imgHome.src = "./images/homeplanet.png";

    function getRandomCode() {
      gameArray.splice(0, 1);
      var rndCode = Math.floor(Math.random() * codeArray.length);
      //console.log(codeArray[rndCode].codeSnippet);
      gameArray.push(codeArray[rndCode].codeSnippet);
      return codeArray[rndCode].codeSnippet;
    }

    function getenteredCode() {
      enterArray.splice(0, 1);
      console.log($("#enteredCode").prop("value"));
      enterArray.push($("#enteredCode").prop("value"));
    }

    function storeHighscore() {
      console.log("storing highscore");
      var highscoresArray =
        JSON.parse(localStorage.getItem("highscores")) || [];
      highscoresArray.push({ name: playerName, score: gameScore });
      localStorage.setItem("highscores", JSON.stringify(highscoresArray));
    }

    function crashBottom() {
      if (intersect(codeObject, bottomObject)) {
        //ctx.clearRect(20, 20, 400, 500);
        if (gameLives <= 0) {
          drawGameOver();
        } else {
          errorSound.play();
          gameLives -= 1;
          y1 = 0;
          gameCode = getRandomCode();
          console.log(gameLives);
        }
      }
    }

    function intersect(codeObject, bottomObject) {
      var codeBottom = y1;
      var bottomTop = bottomObject.y;
      return !(codeBottom < bottomTop);
    }

    function drawBackground(background) {
      ctx.drawImage(imgBack, background.x, background.y, 400, 500);
    }

    //function drawGun() {
      //ctx.drawImage(imgLaser, 160, 415, 100, 70);
    //}

    function drawHome() {
      ctx.drawImage(imgHome, 0, 450, 400, 50);
    }

    function drawCode() {
      ctx.font = "20px Roboto";
      ctx.fillStyle = "#fff";
      ctx.fillText(gameCode, x1, y1);
    }

    //function drawBottom() {
    //  ctx.fillStyle = "#444444";
    //  ctx.fillRect(0, 450, 400, 50);
    //}

    function drawPlayername() {
      ctx.font = "12px Roboto";
      ctx.fillStyle = "#fff";
      ctx.fillText("Player: " + playerName, 10, 20);
    }

    function drawLives() {
      ctx.font = "12px Roboto";
      ctx.fillStyle = "#fff";
      ctx.fillText("Lives left: " + gameLives, 10, 50);
    }

    function drawScore() {
      ctx.font = "12px Roboto";
      ctx.fillStyle = "#fff";
      ctx.fillText("Your Score: " + gameScore, 300, 20);
    }

    function drawBoost() {
      ctx.font = "12px Roboto";
      ctx.fillStyle = "#fff";
      ctx.fillText("Booster: " + boostScore, 300, 50);
    }

    function drawLevel() {
      ctx.font = "12px Roboto";
      ctx.fillStyle = "#fff";
      ctx.fillText("Level: " + levelCount, 300, 80);
    }

    function drawLaser() {
      isCorrectFrameCount--;
      if (isCorrectFrameCount < 0) return;
      else {
        ctx.beginPath();
        ctx.strokeStyle = "#a5faff";
        ctx.moveTo(200, 450);
        ctx.lineTo(oldX1, oldY1);
        //ctx.closePath();
        ctx.strokeStyle = "#a5faff";
        ctx.moveTo(205, 450);
        ctx.lineTo(oldX1, oldY1);
        ctx.stroke();
        ctx.font = "30px Roboto";
        if (isCorrect) {
          ctx.fillStyle = "#4b8963";
          ctx.fillText("CORRECT!", oldX1 - 40, oldY1);
          ctx.fillStyle = "#8cffb8";
          ctx.fillText("CORRECT!", oldX1 - 42, oldY1 - 2);
        } else {
          ctx.fillStyle = "#a3352f";
          ctx.fillText("BUG!", oldX1 - 40, oldY1);
          ctx.fillStyle =  "#fc6f67";
          ctx.fillText("BUG!", oldX1 - 42, oldY1 - 2);
        }
      }
    }

    function drawHighscore() {
      var highscoresArray =
        JSON.parse(localStorage.getItem("highscores")) || [];

      // top 5
      // sortiert
      highscoresArray.forEach(function(el, index) {
        ctx.font = "20px Roboto";
      ctx.fillStyle = "#6b6b6b";
      ctx.fillText("HIGHSCORES", 122, 162);
      ctx.fillStyle = "#fff";
      ctx.fillText("HIGHSCORES", 120, 162);
        ctx.font = "20px Roboto";
        ctx.fillStyle = "#fff";
        ctx.fillText(el.name + "   " + el.score, 120, 180 + index * 30);
      });
    }

    function drawGameOver() {
      //ctx.clearRect(0, 0, 400, 500);
      drawBackground(background);
      gameLives = 0;
      drawPlayername();
      drawLives();
      drawScore();
      ctx.font = "30px Roboto";
      ctx.fillStyle = "#6b6b6b";
      ctx.fillText("GAME OVER", 122, 103);
      ctx.fillStyle = "#fff";
      ctx.fillText("GAME OVER", 120, 100);
      storeHighscore();
      drawHighscore();

      gameOver.play();
    }

    var background = {
      x: 0,
      y: 0
    };

    var bottomObject = {
      x: 0,
      y: 450,
      width: 400,
      height: 50
    };

    var boostScore = 0;

    var y1 = 0;

    var codeObject = {
      x: 80
    };

    var gameCode = getRandomCode(); // to pass the code to type into the updateCanvas function

    function drawCorrect() {
      isCorrectFrameCount--;
      if (isCorrectFrameCount < 0) return;
      if (correctCount % 5 === 0) {
        //ctx.fillStyle = "#2d2800";
        //ctx.fillRect(0, 450, 400, 50);
        ctx.font = "30px Roboto";
        ctx.fillStyle = "#f9f759";
        ctx.fillText("Level " + levelCount, 160, 480);
      } else if (isCorrect) {
        //ctx.fillStyle = "#64b784";
        //ctx.fillRect(0, 450, 400, 50);
        ctx.font = "20px Roboto";
        ctx.fillStyle = "#fff";
        //ctx.fillText("CORRECT", 160, 480);
      } else {
        //ctx.fillStyle = "#a3352f";
        //ctx.fillRect(0, 450, 400, 50);
        ctx.font = "20px Roboto";
        ctx.fillStyle = "#fff";
        console.log(ctx.fillStyle);
        //ctx.fillText("FALSE", 160, 480);
      }
    }

    // var frameCount = 0

    var isCorrectFrameCount = -1;
    var isCorrect = false;

    var oldY1 = 0;

    function updateCanvas() {
      ctx.clearRect(0, 0, 400, 500);
      y1 += levelSpeed;
      x1 = Math.floor(Math.random() * 10 + x2); // jibber effect
      boostScore = Math.floor(500 - y1);
      drawBackground(background);
      //drawGun();
      drawHome();
      drawPlayername();
      drawLives();
      drawBoost();
      drawLevel();
      drawScore();
      //drawBottom();
      drawCode();
      drawLaser();
      crashBottom();
      drawCorrect();
      //if (isCorrectFrameCount == 60) {drawLaser()};
      if (gameLives < 1) {
        drawGameOver();
      } else {
        // frameCount ++;
        window.requestAnimationFrame(updateCanvas);
      }
    }

    updateCanvas();

    function checkMatch() {
      isCorrectFrameCount = 60;
      getenteredCode();
      if (enterArray[0] == gameArray[0]) {
        console.log("DEBUG: CORRECT");
        isCorrect = true;
        correctSound.play();
        gameScore = gameScore + boostScore;
        boostScore = 0;
        correctCount += 1;
        if (correctCount % 5 === 0) {
          levelCount += 1;
          levelSpeed += 0.4;
          levelUp.play();
        }
      } else {
        console.log("DEBUG: FALSE");
        errorSound.play();
        isCorrect = false;
        gameLives -= 1;
      }
      oldX1 = x2;
      x2 = Math.floor(Math.random() * 100 + 100); // to move the next code to another x position
      gameCode = getRandomCode();
      oldY1 = y1;
      y1 = 0;
      $("#enteredCode").val("");
    }

    document.onkeydown = function(event) {
      if (event.keyCode == 13) {
        checkMatch();
      }
    };

    document.getElementById("enterButton").onclick = function() {
      checkMatch();
    };
  }
};
