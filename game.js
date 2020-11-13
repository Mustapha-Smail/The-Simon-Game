var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0 ;

$(".start").click(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  var lastIndex = userClickedPattern.length -1;
  checkAnswer(lastIndex);
});

function nextSequence() {
  $(".start").text("Start");
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var chosenButton = "#" + randomChosenColor;
  $(chosenButton).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if ( gamePattern[currentLevel] === userClickedPattern[currentLevel] )
  {
    console.log("success");
    if( userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("fail");
    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Restart to Play!");
    $(".start").text("Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
