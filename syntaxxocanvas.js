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

var enterArray = []; // array of entered code elements that user typed
var gameArray = []; // array of randomly picked code that user has to type
var gameScore = 0; // score the user achieves
var gameLives = 3; // count of mistakes possible until game over

var backgroundSound = new Audio("./sounds/background.mp3");
var errorSound = new Audio("./sounds/error1.mp3");
var correctSound = new Audio("./sounds/correct1.mp3");
var gameOver = new Audio("./sounds/gameover.mp3");

window.onload = function() {
  document.getElementById("startButton").onclick = function() {
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

    function getRandomCode() {
      gameArray.splice(0, 1);
      var rndCode = Math.floor(Math.random() * codeArray.length);
      //console.log(codeArray[rndCode].codeSnippet);
      gameArray.push(codeArray[rndCode].codeSnippet);
      return codeArray[rndCode].codeSnippet;
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

    function drawCode() {
      ctx.font = "20px Roboto";
      ctx.fillStyle = "#fff";
      ctx.fillText(gameCode, 100, y1);
    }

    function drawBottom() {
      ctx.fillStyle = "#f44b42";
      ctx.fillRect(0, 480, 400, 20);
    }

    function drawLives() {
      ctx.font = "12px Roboto";
      ctx.fillStyle = "#fff";
      ctx.fillText("Lives left: " + gameLives, 10, 20);
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

    function drawLaser() {
      ctx.clearRect(0, 0, 400, 500);
      ctx.beginPath();
      ctx.strokeStyle = "#5be8ef";
      ctx.moveTo(150, 480);
      ctx.lineTo(120, y1);
      ctx.closePath();
      ctx.strokeStyle = "#5be8ef";
      ctx.moveTo(151, 480);
      ctx.lineTo(121, y1);
      ctx.stroke();
    }

    function drawGameOver() {
      //ctx.clearRect(0, 0, 400, 500);
      drawBackground(background);
      gameLives = 0;
      drawLives();
      drawScore();
      ctx.font = "30px Roboto";
      ctx.fillStyle = "#fff";
      ctx.fillText("GAME OVER", 120, 200);
      gameOver.play();
    }

    var background = {
      x: 0,
      y: 0
    };

    var bottomObject = {
      x: 0,
      y: 480,
      width: 400,
      height: 20
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
      if (isCorrect) {
        ctx.font = "26px Roboto";
        ctx.fillStyle = "#8cffb8";
        ctx.fillText("CORRECT", 120, 200);
      } else {
        ctx.font = "26px Roboto";
        ctx.fillStyle = "#f76e45";
        console.log(ctx.fillStyle);
        ctx.fillText("FALSE", 120, 200);
      }
    }

    // var frameCount = 0

    var isCorrectFrameCount = -1;
    var isCorrect = false;

    function updateCanvas() {
      ctx.clearRect(0, 0, 400, 500);
      y1 += 1;
      boostScore = Math.floor(500 - y1 / 2);
      drawBackground(background);
      drawLives();
      drawBoost();
      drawScore();
      drawBottom();
      drawCode();
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

   

    document.getElementById("enterButton").onclick = function() {
      isCorrectFrameCount = 60;
      {drawLaser()}
      getenteredCode();
      if (enterArray[0] == gameArray[0]) {
        console.log("DEBUG: CORRECT");
        isCorrect = true;
        correctSound.play();
        gameScore = gameScore + boostScore;
        boostScore = 0;
      } else {
        console.log("DEBUG: FALSE");
        errorSound.play();
        isCorrect = false;
        gameLives -= 1;
      }
      gameCode = getRandomCode();
      y1 = 0;
    };

    function getenteredCode() {
      enterArray.splice(0, 1);
      console.log($("#enteredCode").prop("value"));
      enterArray.push($("#enteredCode").prop("value"));
    }

    /*function updateCanvasScored() {
      ctx.font = "36px Roboto";
      ctx.fillStyle = "#fff";
      ctx.fillText("CORRECT", 80, 200);
    } */
  }
};
