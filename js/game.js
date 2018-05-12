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
  if (keycode == 119 || keycode == 115 || keycode == 97 || keycode == 100) {
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
});

//TIMER
var seconds = 00;
var tens = 00;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");

function startTimer() {
  Interval = setInterval(increment, 100);
}

function increment() {
  tens++;
  if (tens < 9) {
    appendTens.innerHTML = "0" + tens;
  }
  if (tens > 9) {
    appendTens.innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }
  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
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

function moveRight() {
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

function moveLeft() {
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
  tens = "00";
  seconds = "00";
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;
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
  console.log(blockNumber);
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
  for (var i = 1, len = i.length; i < len; i++) {
    // check if current value smaller than previous value
    if (data[i] < data[i - 1]) {
      return false;
    }
  }
  return true;
}

$(document).ready(function() {
  reset();
  setBlocks();
});
