// Code elements that user has to type
var htmlArray = [
  "<img>",
  "<div>",
  "<h1>",
  "<li>",
  "<th>",
  "<button>",
  "<a>",
  "<span>",
  "</p>",
  'id="game"',
  "</div>",
  "<ul>",
  "<br>",
  '<img src="">'
];

var jscrArray = [
  "var x=1",
  "function(){}",
  "var array=[]",
  "ctx.clearRect()",
  "window.onload",
  "getElementById",
  '$("#id")',
  'show()',
  'hide()',
  "array.splice(0,1)",
  "Math.floor",
  "(Math.random())",
  "requestAnimationFrame()"
];

var playerName = "";

var backgroundSound = new Audio("./sounds/background.mp3");
var errorSound = new Audio("./sounds/error1.mp3");
var correctSound = new Audio("./sounds/correct1.mp3");
var levelUp = new Audio("./sounds/levelup.mp3");
var gameOver = new Audio("./sounds/gameover.mp3");
var codetypeArray = [];

window.onload = function() {
  // hides the canvas and game form field before the game started
  $("#enterButton")
    .parent()
    .hide();
  $("#startText").show();

  document.getElementById("startButtonJSC").onclick = function() {
    $("#enterButton")
      .parent()
      .show();
    $("#startPage")
      .siblings()
      .hide();
    playerName = $("#enteredPlayer").prop("value");
    backgroundSound.onload = backgroundSound.play();
    codetypeArray = jscrArray;
    startGame();
  };

  document.getElementById("startButtonHTML").onclick = function() {
    $("#enterButton")
      .parent()
      .show();
    $("#startPage")
      .siblings()
      .hide();
    playerName = $("#enteredPlayer").prop("value");
    backgroundSound.onload = backgroundSound.play();
    codetypeArray = htmlArray;
    startGame();
  };

  function startGame() {
    //ctx.clearRect(0, 0, 400, 500);
    var enterArray = []; // array of entered code elements that user typed
    var gameArray = []; // array of randomly picked code that user has to type
    var gameScore = 0; // score the user achieves
    var gameLives = 5; // count of mistakes possible until game over
    var x1 = 180;
    var x2 = 100;
    var correctCount = 1;
    var levelCount = 1;
    var levelSpeed = 0.3;

    var ctx = document.getElementById("syntaxxo-frame").getContext("2d");
    ctx.clearRect(0, 0, 400, 500);
    //ctx.fillRect(20, 20, 400, 500); // drawing the frame for the code-parts
    //window.requestAnimationFrame(updateCanvas);

    var imgBack = new Image();
    imgBack.onload = function() {
      ctx.drawImage(imgBack, background.x, background.y, 400, 500);
    };
    imgBack.src = "./images/backgrounds/background_1.png";

    var imgBack2 = new Image();
    imgBack2.onload = function() {
      ctx.drawImage(imgBack2, background.x, background.y, 400, 500);
    };
    imgBack2.src = "./images/backgrounds/background_4.png";

    var imgBack3 = new Image();
    imgBack3.onload = function() {
      ctx.drawImage(imgBack3, background.x, background.y, 400, 500);
    };
    imgBack3.src = "./images/backgrounds/background_5.png";

    var imgBack4 = new Image();
    imgBack3.onload = function() {
      ctx.drawImage(imgBack4, background.x, background.y, 400, 500);
    };
    imgBack4.src = "./images/backgrounds/background_2.png";

    var imgLaser = new Image();
    imgLaser.onload = function() {
      ctx.drawImage(imgLaser, 150, 450, 40, 20);
    };
    imgLaser.src = "./images/lasergun.gif";

    var imgHome = new Image();
    imgHome.onload = function() {
      ctx.drawImage(imgHome, 0, 0, 400, 50);
    };
    imgHome.src = "./images/homeplanet.jpg";

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

    var imgX = 400;
    var imgY = 350;

    var gameCode = getRandomCode(); // to pass the code to type into the updateCanvas function

    // var frameCount = 0

    var isCorrectFrameCount = -1;
    var isCorrect = false;
    var oldY1 = 0;

    function getRandomCode() {
      gameArray.splice(0, 1);
      var rndCode = (Math.ranMath.floordom() * codetypeArray.length);
      //console.log(codeArray[rndCode].codeSnippet);
      gameArray.push(codetypeArray[rndCode]);
      return codetypeArray[rndCode];
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
      imgX = imgX + 0.02;
      imgY = imgY + 0.02;
      ctx.drawImage(imgBack, background.x, background.y, imgX, imgY);
    }

    function drawHome() {
      ctx.drawImage(imgHome, 0, 450, 400, 50);
    }

    function drawCode() {
      ctx.font = "20px Roboto";
      var r = 100;
      var g = Math.floor(Math.random() * 100 * 2.5);
      var b = Math.floor(Math.random() * 100 * 2.5);
      ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
      ctx.fillText(gameCode, x1, y1);
    }

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
      ctx.fillText("Your Score: " + gameScore, 290, 20);
    }

    function drawBoost() {
      ctx.font = "12px Roboto";
      ctx.fillStyle = "#fff";
      ctx.fillText("Booster: " + boostScore, 290, 50);
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
        ctx.moveTo(195, 453);
        ctx.lineTo(oldX1 + 30, oldY1);
        ctx.strokeStyle = "#a5faff";
        ctx.moveTo(200, 455);
        ctx.lineTo(oldX1 + 30, oldY1);
        ctx.strokeStyle = "#a5faff";
        ctx.moveTo(205, 457);
        ctx.lineTo(oldX1 + 30, oldY1);
        ctx.stroke();
        ctx.font = "30px Roboto";
        if (isCorrect) {
          if (correctCount % 5 === 0){
          } else{
          ctx.fillStyle = "#4b8963";
          ctx.fillText("CORRECT!", oldX1 - 40, oldY1);
          ctx.fillStyle = "#8cffb8";
          ctx.fillText("CORRECT!", oldX1 - 42, oldY1 - 2);}
        } else {
          ctx.fillStyle = "#a3352f";
          ctx.fillText("BUG!", oldX1 - 40, oldY1);
          ctx.fillStyle = "#fc6f67";
          ctx.fillText("BUG!", oldX1 - 42, oldY1 - 2);
        }
      }
    }

    function drawHighscore() {
      var highscoresArray =
        JSON.parse(localStorage.getItem("highscores")) || [];
      highscoresArray.sort(function(a, b) {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        return 0;
      });
      highscoresArray.forEach(function(el, index) {
        ctx.font = "20px Roboto";
        ctx.fillStyle = "#6b6b6b";
        ctx.textAlign = "center";
        ctx.fillText("HIGHSCORES", 202, 182);
        ctx.fillStyle = "#fff";
        ctx.fillText("HIGHSCORES", 200, 180);

        if (index <= 9) {
          ctx.font = "20px Roboto";
          ctx.fillStyle = "#fff";
          ctx.textAlign = "left";
          ctx.fillText(el.name, 100, 220 + index * 30);
          ctx.textAlign = "right";
          ctx.fillText(el.score, 290, 220 + index * 30);
        }
      });
    }

    function drawGameOver() {
      ctx.clearRect(0, 0, 400, 500);
      ctx.drawImage(imgBack, background.x, background.y, 400, 350);
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
      $("#enteredCode").val("");
      gameOver.play();
    }

    function drawCorrect() {
      isCorrectFrameCount--;
      if (isCorrectFrameCount < 0) return;
      if (correctCount % 5 === 0) {
        ctx.font = "40px Roboto";
        var r = Math.floor(Math.random() * 100 * 2.5);
        var g = Math.floor(Math.random() * 100 * 2.5);
        var b = Math.floor(Math.random() * 100 * 2.5);
        ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
        //ctx.fillStyle = "#f9f759";
        ctx.fillText("Level " + levelCount, oldX1, oldY1);
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

    function updateCanvas() {
      ctx.clearRect(0, 0, 400, 500);
      y1 += levelSpeed;
      x1 = Math.floor(Math.random() * 10 + x2); // jibber effect
      boostScore = Math.floor(450 + 50 * levelCount - y1); // boosts score by level and reduces by y1 (the later you type, the less you get)
      ctx.textAlign = "left";
      drawBackground(background);
      drawHome();
      drawPlayername();
      drawLives();
      drawBoost();
      drawLevel();
      drawScore();
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

    // passes entered code by ENTER button (key 13)
    document.onkeydown = function(event) {
      if (event.keyCode == 13) {
        checkMatch();
      }
    };

    // passes entered code by click on DOM button (Fire)
    document.getElementById("enterButton").onclick = function() {
      checkMatch();
    };
  }
};
