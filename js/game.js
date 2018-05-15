let blankBlock = 0;
let blockNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const grid = [
  "0 0",
  "0 50px",
  "0 100px",
  "50px 0px",
  "50px 50px",
  "50px 100px",
  "100px 0",
  "100px 50px",
  "100px 100px"
];

$(document).keypress(function(event) {
  let keycode = event.which || event.keyCode;
  if (keycode == 119 || keycode == 115 || keycode == 97 || keycode == 100 || gamestart === true) {
    startTimer();
  }
  if (keycode == 119) {
    moveUp();
  } else if (keycode == 115) {
    moveDown();
  } else if (keycode == 97) {
    moveLeft();
  } else if (keycode == 100) {
    moveRight();
  }
  if (blockNumber[8] === 9){
    if(puzzleComplete()){
      console.log(interval);
      clearInterval(interval);
      $("#black-screen").css("display", "block");
      gamestart = false;
    }
  }
});

//TIMER
let seconds = 00;
let tens = 00;
let appendTens = $(".min");
let appendSeconds = $(".sec");
let interval = 0;
let gamestart = false;

function startTimer() {
  if(!gamestart){
    gamestart = true;
    interval = setInterval(function(){increment();}, 1000);
  }
}

function increment() {
  tens++;
  if (tens < 9) {
    appendTens.text("0" + tens);
  }
  if (tens > 9) {
    appendTens.text(tens);
  }
  if (tens > 99) {
    seconds++;
    appendSeconds.text("0" + seconds);
    tens = 0;
    appendTens.text("0" + 0);
  }
  if (seconds > 9) {
    appendSeconds.text(seconds);
  }
}

function moveUp() {
  if (blankBlock + 3 <= 8) {
    $("#" + blockNumber[blankBlock + 3]).css("margin", grid[blankBlock]);
    blockNumber[blankBlock] = blockNumber[blankBlock + 3];
    //switch blankBlock with the block below
    blockNumber[blankBlock + 3] = 9;
    blankBlock = blankBlock + 3;
  }
}

function moveDown() {
  if (blankBlock - 3 >= 0) {
    $("#" + blockNumber[blankBlock - 3]).css("margin", grid[blankBlock]);
    blockNumber[blankBlock] = blockNumber[blankBlock - 3];
    blockNumber[blankBlock - 3] = 9;
    blankBlock = blankBlock - 3;
  }
}

function moveLeft() {
  if (
    blankBlock + 1 >= 0 &&
    blankBlock != 2 &&
    blankBlock != 5 &&
    blankBlock != 8
  ) {
    $("#" + blockNumber[blankBlock + 1]).css("margin", grid[blankBlock]);
    blockNumber[blankBlock] = blockNumber[blankBlock + 1];
    blockNumber[blankBlock + 1] = 9;
    blankBlock = blankBlock + 1;
  }
}

function moveRight() {
  if (
    blankBlock - 1 >= 0 &&
    blankBlock != 0 &&
    blankBlock != 3 &&
    blankBlock != 6
  ) {
    $("#" + blockNumber[blankBlock - 1]).css("margin", grid[blankBlock]);
    blockNumber[blankBlock] = blockNumber[blankBlock - 1];
    blockNumber[blankBlock - 1] = 9;
    blankBlock = blankBlock - 1;
  }
}

function reset() {
  //randomise blocks and reset timer
  randomise();
  clearInterval();
  seconds = 00;
  tens = 00;
  $("#black-screen").css("display", "none");
  gamestart = false;
  appendTens.text("00");
  appendSeconds.text("00");
  setBlocks();
}

function randomise() {
  blockNumber.sort(function(a, b) {
    return 0.5 - Math.random();
  });
  //position blank block, check solvability
  checkSolvability();
}

function checkSolvability() {
  //define inversion
  //check for number of inversions for each block onwards till end of array
  //if odd number, reset
  let inversion = 0;
  for (i = 0; i <= 8; i++) {
    if (blockNumber[i] == 9) {
      blankBlock = i;
    }
    for (j = i + 1; j <= 8; j++) {
      if (
        blockNumber[i] > blockNumber[j] &&
        blockNumber[i] != 9 &&
        blockNumber[j] != 9
      ) {
        inversion++;
      }
    }
  }
  if (inversion % 2 != 0) {
    randomise();
  }
}

function setBlocks() {
  $(".puzzle").html("");
  for (i = 0; i <= 8; i++) {
    if (blockNumber[i] != 9) {
      $(".puzzle").append(
        '<div class="blocks" id="' +
          blockNumber[i] +
          '" style="margin:' +
          grid[i] +
          '">' +
          blockNumber[i] +
          "</div>"
      );
    }
  }
}

function puzzleComplete() {
  for(i=0; i<=8; i++){
    if(blockNumber[i] != i+1){
      return false
    }
  }
  return true
}

$(document).ready(function() {
  reset();
  // setBlocks();
});
