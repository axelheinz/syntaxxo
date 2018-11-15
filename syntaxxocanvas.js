window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    var ctx = document.getElementById("syntaxxo-frame").getContext("2d");

    
    ctx.fillRect(30, 30, 400, 400); // drawing the frame for the code-parts
    ctx.strokeRect(30, 440, 400, 100); // drawing the frame for typing and user interaction

    function drawWord() {
      ctx.fillStyle = "#fff";
      ctx.fillRect(50, y1, 100, 30);
    }
     

    var y1 = 0;
    function updateCanvas() {
      ctx.clearRect(30, 30, 400, 400);
      y1 += 1;
      ctx.fillStyle = "#3b557f";
      ctx.fillRect(30, 30, 400, 400);
      drawWord();
      window.requestAnimationFrame(updateCanvas);
    }

    updateCanvas();
  }
};
