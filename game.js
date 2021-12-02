var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// $( window ).load(function() {
//   $('#start').text("Start");
// });
$(document).ready(function() {
  $('#start').text("Start");
})
function nextSequence(){
  userClickedPattern =[];
  level++;
  $('#level-title').text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound( randomChosenColour );
  animatePress(randomChosenColour);

}

$('.btn').click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound( userChosenColour );
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  //console.log(userClickedPattern);
})

// $(document).keydown(function(event){
//   if(!started){
//     $('#level-title').text("Level "+level);
//     nextSequence();
//     started = true;
//   }
// })

$('#start').click(function(event){
  if(!started){
    $('#level-title').text("Level "+level);
    nextSequence();
    started = true;
    $('#start').hide();
  }
})

function playSound( name ){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $('#'+currentColor).addClass("pressed");
  setTimeout(function(){
        $('#'+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer( currentLevel ){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
    // console.log("success");
    // console.log("userClickedPattern: "+userClickedPattern);
    // console.log("gamePattern: "+gamePattern);
  }
  else{
    playSound("wrong");
    $('body').addClass("game-over");
    setTimeout(function(){
          $('body').removeClass("game-over");
      }, 200);
    $('#level-title').text("Game Over, Press Below Button To Restart");
    startOver();
    $('#start').show();
    // console.log("wrong");
    // console.log("userClickedPattern: "+userClickedPattern);
    // console.log("gamePattern: "+gamePattern);
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
