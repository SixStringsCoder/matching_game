// Once modules are supported by browsers, it will be better to store content in separate js file
// import content from './content';

/*============================================
                  CONTENT
============================================*/
const content = {
  fruit: [
    ["strawberry", "match1"],
    ["strawberry", "match1"],
    ["lemon", "match2"],
    ["lemon", "match2"],
    ["grapes", "match3"],
    ["grapes", "match3"],
    ["cherries", "match4"],
    ["cherries", "match4"],
    ["pear", "match5"],
    ["pear", "match5"],
    ["peach","match6" ],
    ["peach","match6" ],
    ["apple", "match7"],
    ["apple", "match7"],
    ["orange", "match8"],
    ["orange", "match8"]
  ],
  animals: [
    ["bird", "match1"],
    ["bird", "match1"],
    ["elephant", "match2"],
    ["elephant", "match2"],
    ["tiger", "match3"],
    ["tiger", "match3"],
    ["lion", "match4"],
    ["lion", "match4"],
    ["monkey", "match5"],
    ["monkey", "match5"],
    ["turkey","match6" ],
    ["turkey","match6" ],
    ["eagle", "match7"],
    ["eagle", "match7"],
    ["zebra", "match8"],
    ["zebra", "match8"]
  ],
  spanish: [
    ["hello", "match1"],
    ["hola", "match1"],
    ["goodbye", "match2"],
    ["adios", "match2"],
    ["grapes", "match3"],
    ["uvas", "match3"],
    ["horse", "match4"],
    ["caballo", "match4"],
    ["car", "match5"],
    ["carro", "match5"],
    ["house","match6" ],
    ["casa","match6" ],
    ["apple", "match7"],
    ["manzana", "match7"],
    ["table", "match8"],
    ["mesa", "match8"]
  ],
  fruit_pics: [
    ["<img src='./images/strawberry.svg' />", "match1"],
    ["<img src='./images/strawberry.svg' />", "match1"],
    ["<img src='./images/lemon.svg' />", "match2"],
    ["<img src='./images/lemon.svg' />", "match2"],
    ["<img src='./images/grapes.svg' />", "match3"],
    ["<img src='./images/grapes.svg' />", "match3"],
    ["<img src='./images/cherries.svg' />", "match4"],
    ["<img src='./images/cherries.svg' />", "match4"],
    ["<img src='./images/pear.svg' />", "match5"],
    ["<img src='./images/pear.svg' />", "match5"],
    ["<img src='./images/peach.svg' />","match6" ],
    ["<img src='./images/peach.svg' />","match6" ],
    ["<img src='./images/apple.svg' />", "match7"],
    ["<img src='./images/apple.svg' />", "match7"],
    ["<img src='./images/orange.svg' />", "match8"],
    ["<img src='./images/orange.svg' />", "match8"]
  ],
  als_pics: [
    ["actor", "match1"],
    ["<img src='./images/asl_pics/actor.gif' />", "match1"],
    ["basketball", "match2"],
    ["<img src='./images/asl_pics/basketball.gif' />", "match2"],
    ["book", "match3"],
    ["<img src='./images/asl_pics/book.gif' />", "match3"],
    ["child", "match4"],
    ["<img src='./images/asl_pics/child.gif' />", "match4"],
    ["door", "match5"],
    ["<img src='./images/asl_pics/door.gif' />", "match5"],
    ["fish","match6" ],
    ["<img src='./images/asl_pics/fish.gif' />","match6" ],
    ["music", "match7"],
    ["<img src='./images/asl_pics/music.gif' />", "match7"],
    ["shirt", "match8"],
    ["<img src='./images/asl_pics/shirt.gif' />", "match8"]
  ],
  animal_sounds: [
    ["cow", "match1"],
    ["<img id='cow' src='./images/audio_file.svg' />", "match1"],
    ["duck", "match2"],
    ["<img id='duck' src='./images/audio_file.svg' />", "match2"],
    ["elephant", "match3"],
    ["<img id='elephant' src='./images/audio_file.svg' />", "match3"],
    ["goat", "match4"],
    ["<img id='goat' src='./images/audio_file.svg' />", "match4"],
    ["dog", "match5"],
    ["<img id='dog' src='./images/audio_file.svg' />", "match5"],
    ["horse","match6"],
    ["<img id='horse' src='./images/audio_file.svg' />","match6" ],
    ["frog", "match7"],
    ["<img id='frog' src='./images/audio_file.svg' />", "match7"],
    ["sheep", "match8"],
    ["<img id='sheep' src='./images/audio_file.svg' />", "match8"]
  ],
  animalPics_sounds: [
    ["<img src='./images/animal_pics/cow.svg' />", "match1"],
    ["<img id='cow' src='./images/audio_file.svg' />", "match1"],
    ["<img src='./images/animal_pics/duck.svg' />", "match2"],
    ["<img id='duck' src='./images/audio_file.svg' />", "match2"],
    ["<img src='./images/animal_pics/elephant.svg' />", "match3"],
    ["<img id='elephant' src='./images/audio_file.svg' />", "match3"],
    ["<img src='./images/animal_pics/frog.svg' />", "match4"],
    ["<img id='frog' src='./images/audio_file.svg' />", "match4"],
    ["<img src='./images/animal_pics/chicken.svg' />", "match5"],
    ["<img id='chicken' src='./images/audio_file.svg' />", "match5"],
    ["<img src='./images/animal_pics/horse.svg' />","match6"],
    ["<img id='horse' src='./images/audio_file.svg' />","match6" ],
    ["<img src='./images/animal_pics/dog.svg' />", "match7"],
    ["<img id='dog' src='./images/audio_file.svg' />", "match7"],
    ["<img src='./images/animal_pics/sheep.svg' />", "match8"],
    ["<img id='sheep' src='./images/audio_file.svg' />", "match8"]
  ],
};

let selectFromMenu;
let timer;
let centiseconds = 00;
let seconds = 0;
let minutes = 0;
let timerGoing = true;

let score = 0;
let strikes = 0;
let cardPicks = [];


/*============================================
          Audio Sound effects
============================================*/
const gameAudio = {
    clickCard: new Audio('audio/click.mp3'),
    rightAnswer: new Audio('audio/right.mp3'),
    wrongAnswer: new Audio('audio/wrong.mp3'),
    aboutToLose: new Audio('audio/last_wrong.mp3'),
    winningSound: new Audio('audio/winner.mp3'),
    losingSound: new Audio('audio/loser.mp3'),
    animals: {
      cow: new Audio('audio/animals/cow.mp3'),
      duck: new Audio('audio/animals/duck.mp3'),
      elephant: new Audio('audio/animals/elephant.mp3'),
      goat: new Audio('audio/animals/goat.mp3'),
      dog: new Audio('audio/animals/dog.mp3'),
      horse: new Audio('audio/animals/horse.mp3'),
      frog: new Audio('audio/animals/frog.mp3'),
      sheep: new Audio('audio/animals/sheep.mp3'),
      wolf: new Audio('audio/animals.wolf.mp3')
    }
};

const playClickCard = () => gameAudio.clickCard.play();
const playRightAnswer = () => gameAudio.rightAnswer.play();
const playWrongAnswer = () => strikes != 9 ? gameAudio.wrongAnswer.play() : gameAudio.aboutToLose.play();
const playWinnerSound = () => gameAudio.winningSound.play();
const playLoserSound = () => gameAudio.losingSound.play();
const handleAudio = (event) => {
  (event === undefined || event === "") ?
    gameAudio.clickCard.play()
    :
    gameAudio.animals[`${event}`].play()
}


/*============================================
          Select Menu for Content
============================================*/

$('#menu').on("change", function(event) {
  selectFromMenu = content[event.target.value];
});


/*============================================
      Play / Reset to Shuffle Content
============================================*/
// Click Play Button to reset values and trigger Shuffle
$('.play-btn').on('click', (event) => {
    if (selectFromMenu == undefined) {
      alert('Use the START HERE menu to select a word bank. Then click PLAY.');
    } else {
      $('.play-btn').addClass('hide'); // hides Play button
      $('.reset-btn').removeClass('hide'); // shows Reset button
      resetGame();
      shuffle(selectFromMenu); // shuffles content, makes gameboard and starts timer
    }
});

$('.reset-btn').on('click', (event) => {
  $('.reset-btn').addClass('hide');
  $('.play-btn').removeClass('hide');
  resetGame(); // resets gameboard values BUT doesn't start Timer
});

// Click Play Again Button on Modal Window
$('.play-again-btn').on('click', (event) => {
  resetGame();
  shuffle(selectFromMenu);
});

// Using Fisher-Yates method
function shuffle(array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  makeGameBoard(array);
}


/*============================================
            Add Content to DOM
============================================*/
const makeGameBoard = (someList) => {
    // Remove all contents from game board
    $('#gameboard').empty();
    // Populate game baord
    someList.map((word, index) => {
      $('#gameboard').append(
        `<div class="square">
          <div class="card-cover"></div>
          <div class="${word[1]}"><span class="span-for-content">${word[0]}</span></div>
         </div>`);
    });
    // Start timer
    timeHandler();
};

/*============================================
                    TIMER
============================================*/
const timeHandler = () => {
  return timerGoing ? (
    timer = setInterval(timeCounter, 100)
  ) : (
    clearInterval(timer)
  );
};

const timeCounter = () => {
	let increment = centiseconds++;

    if (centiseconds > 9 && seconds >= 59) {
      minutes += 1;
      seconds = 0;
      centiseconds = 0;
    }
	  if (centiseconds > 9) {
      seconds += 1;
      centiseconds = 0;
    }
    return $('#time').html(`<span>${minutes}:${seconds}:${centiseconds}</span>`)
};

const stopTimer = () => {
  timerGoing = false;
  timeHandler();
};


/*============================================
              SCORE and STRIKES
============================================*/
// Event handler to catalog card picks in array 'cardPicks'
const handlePicks = (event) => {
  console.log(event);
  // Long targeting needed for when game matches 'word' with 'sound'
  handleAudio(event.target.nextElementSibling.children[0].firstChild.id);

  $(event.target).addClass('card-show');
  let pick = $(event.target).siblings("div").attr('class');
  // Disable the card picked so it can't be clicked twice
  $(event.target).prop( "disabled", true );
  cardPicks.push(pick);

  if (cardPicks.length === 2) {
    setTimeout(decideMatch, 650, cardPicks);
  }
};

const changeScore = () => {
  score += 10;
  return $('#score').html(score);
};

const changeStrikes = () => {
  strikes += 1;
  return $('#strikes').html(strikes);
};

const hideCardsAgain = (cardPicksArr) => {
  $(`div.${cardPicksArr[0]}, div.${cardPicksArr[1]}`).siblings('div.card-cover').removeClass('card-show');
};

const makeCardsInactive = (cardPicksArr) => {
  $(`div.${cardPicksArr[0]}, div.${cardPicksArr[1]}`).siblings('div.card-cover').prop( "disabled", true );
};

const emptyCardPicks = arr => cardPicks.splice(0, cardPicks.length)

const decideMatch = (cardPicksArr) => {
    if (cardPicksArr[0] === cardPicksArr[1]) {
      makeCardsInactive(cardPicks);
      changeScore();
      score === 80 ? wonGame() : playRightAnswer(); // audio effect
      emptyCardPicks();
  } else {
    // Re-enable the cards picked so they're back in play again
     $('div.card-cover').prop( "disabled", false );
       changeStrikes();
       hideCardsAgain(cardPicks);
       strikes === 10 ? lostGame() : playWrongAnswer(); // audio effect
       emptyCardPicks();
  }
};

// Event listener to pick cards
$("#gameboard").on('click', 'div.card-cover', handlePicks);


/*============================================
              WINNING and LOSING
============================================*/
const wonGame = () => {
  playWinnerSound();
  // Disable game board
  $('#gameboard, div.card-cover').prop( "disabled", true );
  // stop clock
  stopTimer();
  // show modal window with totals + Play Again button;
  judgeScore(seconds);
  showResults();
};

const showResults = () => {
  $('.results').addClass('show-results');
  $('#win-time').html(`You did it in: <span>${seconds}.${centiseconds} seconds</span>`);
  $('main').on('click', () => $('.results').removeClass('show-results'));
};

const lostGame = () => {
  let xCounter = 0;
  playLoserSound();
  showLoserX();
  // Disable game board
  $('#gameboard, div.card-cover').prop( "disabled", true );
  // stop clock;
  stopTimer();
  // show modal window with totals and consolatioin message + Play Again button;
};

const showLoserX = () => {
  $('#loser-x').css('display', 'flex').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500);
};



/*============================================
              TOP 5 WINNERS BOARD
============================================*/
const judgeScore = (time) => {
  let bestTime = parseInt(localStorage.getItem("bestTime"))

  if (!bestTime || time < bestTime) {
    console.log(time + 'vs' + bestTime);
    // Store new scores
    localStorage.setItem("bestTime", time);
    // Display new best score
    $('#first').html(`<span>${time} seconds`);
  } else {
    $('#first').html(`<span>${bestTime} seconds</span>`);
  }
};


/*============================================
                  RESET GAME
============================================*/
const resetGame = () => {
  score = 0;
  strikes = 0;
  centiseconds = 0;
  seconds = 0;
  minutes =  0;
  timerGoing = true;
  // Clear Interval so when button is clicked, the time doesn't count twice as fast
  clearInterval(timer);
  // Reset DOM so time, score and strikes are at 0
  $('#time').html(`<span>${minutes}:${seconds}:${centiseconds}</span>`);
  $('#score').html(score);
  $('#strikes').html(strikes);
  $('.results').removeClass('show-results');
};
