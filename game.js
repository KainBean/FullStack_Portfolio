function startGame() {
    var canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 320;
    document.body.appendChild(canvas);
  
    var ctx = canvas.getContext("2d");
  
    var basket = {
      x: canvas.width / 2,
      y: canvas.height - 20,
      width: 50,
      height: 20
    };
  
    var fruits = [];
    var score = 0;
  
    function drawBasket() {
      ctx.beginPath();
      ctx.rect(basket.x - basket.width / 2, basket.y - basket.height / 2, basket.width, basket.height);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  
    function drawFruits() {
      for (var i = 0; i < fruits.length; i++) {
        var fruit = fruits[i];
        ctx.beginPath();
        ctx.arc(fruit.x, fruit.y, fruit.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
      }
    }
  
    function updateGame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBasket();
      drawFruits();
  
      for (var i = 0; i < fruits.length; i++) {
        fruits[i].y += 2;
  
        if (fruits[i].y + fruits[i].radius > canvas.height) {
          if (
            fruits[i].x >= basket.x - basket.width / 2 &&
            fruits[i].x <= basket.x + basket.width / 2 &&
            fruits[i].y + fruits[i].radius >= basket.y - basket.height / 2
          ) {
            score++;
          } else {
            // Game over logic
            alert("Game over!\nScore: " + score);
            resetGame();
            return;
          }
  
          fruits.splice(i, 1);
          i--;
        }
      }
  
      requestAnimationFrame(updateGame);
    }
  
    function resetGame() {
      fruits = [];
      score = 0;
    }
  
    function spawnFruit() {
      var fruit = {
        x: Math.random() * canvas.width,
        y: 0,
        radius: 10
      };
  
      fruits.push(fruit);
    }
  
    document.addEventListener("keydown", function(event) { startGame(event); });
  
    setInterval(spawnFruit, 1000);
    updateGame();
  }
  
  
  
  
  