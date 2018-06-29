# Memory Match Game: Brain Fart

## Table of Contents
- [Acknowledgements](#acknowledgements)
- [Maintainers](#maintain)
- [License](#lic)
- [Summary](#brain-fart-summary)
- [Scripts and Libraries](#scripts-and-libraries)
- [Programming Explanations](#programming-explanations)
- [Proposal link for more details and sample UI](#proposal)
- [Workflow](#workflow)
- [Fixes](#fixes)
- [Future Features](#features)

--------------------------

- <a id="acknowledgements">Acknowledgements</a>
   - fruit_pics from https://commons.wikimedia.org/
   - sign language anigifs from http://lifeprint.com/asl101/gifs-animated/
   - sound effects from Hollywood Premiere Edition licensed collection

- <a id="maintain">Maintainers</a> - Steve Hanlon
- <a id="lic">License</a> - None


### Brain Fart Summary  
This project came from a Google project challenge.  The memory match game had to cover the following rubric:


#### Scripts and Libraries
- JavaScript ES2015
- jQuery 3.3.1
- CSS Grid and Flexbox

### Programming Explanations

1. **Create content and game board** -
  **The content** is stored in arrays. The arrays always consist of string values which represent words and at other times, links to picture files.

  The game board is made by iterating through one of the content arrays and then appending each content element to a DOM element, which are then styled with CSS into a grid of squares.
  ```
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
  ```

2. **Shuffle cards**
I used a pre-made function that implements the [Fisher-Yates method](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) of shuffling.  Calling this function also calls the function to make the game board.
```
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
```

3. **Event Handler to start the game (i.e. a PLAY button)**
  - Triggers a callback function to shuffle cards which also...
  - Makes the game board which also...
  - Starts the Timer
```
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
```
As I started adding more content arrays, I added a select menu to allow the player to pick the content to play the game with.  I then adjusted this function to ```alert()``` the player the game can only start if content is _selected_.

This PLAY button eventually became a button toggling between PLAY and RESET.
```
$('.reset-btn').on('click', (event) => {
  $('.reset-btn').addClass('hide');
  $('.play-btn').removeClass('hide');
  resetGame(); // resets gameboard values BUT doesn't start Timer
});
```

4. **Timer** -
Part of the Google rubric was to add a timer. I wanted to add some excitement to the game so I added a _centisecond_ value so the numbers incremented faster.  The timer function is invoked every hundredth of a second by ```setInterval()``` and stopped with a ```clearInterval()``` function when a Global boolean variable ```timerGoing``` is assigned to false.
```
const timeHandler = () => {
  return timerGoing ? (
    timer = setInterval(timeCounter, 100)
  ) : (
    clearInterval(timer)
  );
};
```
Each value (minutes, seconds, centiseconds) are incremented and reset to zero when needed.  I then add them to the DOM via jQuery's ```.html()``` method.  I decided to make the minutes, seconds, centiseconds Global values so that other functions could access them when needed (e.g. Winner modal window with Five Top Times).
```
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
```
Here's a function to set the Boolean value indicating when the timer should be stopped and the function clearInterval() called.  `timerGoing` is a Global variable so that other functions could assign it to false when needing to stop the timer (note: future feature of pausing the Timer).
```
const stopTimer = () => {
  timerGoing = false;
  timeHandler();
};
```

5. **Score and Strikes**   I dealt with these two together because they dictate when the game is lost and won.  I first started with an Event Listener and Handler to handle the card clicked on by the player.

The ```<div>``` with a class of ```.card-cover``` is what the player is actually clicking on but it gets added to the DOM after the PLAY button is clicked.  IN other words, the DOM doesn't start with these elements; they get added via ```.html()```.  So I need to add that as the 2nd parameter of the ```on()``` method which is a "selector" parameter.  It wouldn't work otherwise.  Then the callback function ```handlePicks``` is called.

```
// Event listener to pick cards
$("#gameboard").on('click', 'div.card-cover', handlePicks);
```

I decided to store the 2 picked cards in an array and then compare the array's elements to make the judgements.  The ```handlePicks()``` function takes the event's value and pushes it to the array.  Once the array's length reaches 2, the next function ```decideMatch``` is called to compare the cards' values and act accordingly.
```
// Event handler to catalog card picks in array 'cardPicks'
const handlePicks = (event) => {
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
```

Both cards are compared and when a match happen, I immediately disable those two cards ```makeCardsInactive()``` (so player can't continue to click on them), increment the score with ```changeScore()```, play the appropriate audio effect, then ```emptyCardPicks()``` array for the next two cards to be picked.

A similar sequence plays out if the cards don't match but I increment a ```strikes``` value with ```changeStrikes()```, then ```hideCardsAgain()``` and  empty the array with ```emptyCardPicks()```.

```
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
```

This sequence of events plays out until the ```score``` variable equals 80 (i.e. 8 correct answers * 10 points each) or the ```strikes``` variable equals 10 (10 strikes and you're out!).

**Winner**
```wonGame()``` is a function expression which invokes a sequence of self-explanatory functions:  ```stopTimer()```, ```playWinnerSound()```, disable the game board with ```.prop```, ```judgeScore(seconds, centiseconds)```, then ```showResults()```.

```
const wonGame = () => {
  stopTimer();
  playWinnerSound();
  // Disable game board
  $('#gameboard, div.card-cover').prop( "disabled", true );
  // show modal window with totals + Play Again button;
  judgeScore(seconds, centiseconds);
  showResults();
};
```

Winners get to view a modal window showing their results ```showResults()```.  

```
const showResults = () => {
  $('.results').addClass('show-results');
  $('#win-time').html(`Your Time: <span>${minutes} min. ${seconds}.${centiseconds} seconds</span>`);
  $('main').on('click', () => $('.results').removeClass('show-results'));
};
```

If a time is one of the "Top Five Times" then the score is added to the list of fastest times and recorded in the browser's localStorage for future reference with ```JSON.stringify```. Whereas ```JSON.parse``` method helps with getting the time to then display on the DOM with the function ```displayTopTimes()```.

```
const judgeScore = (seconds, centiseconds) => {
  let totalSeconds = (minutes * 60) + seconds;
  let time = parseFloat(`${totalSeconds}.${centiseconds}`);
  const sortTimes = (a, b) => a - b

  // Would be 'Null' if bestTimes hasn't been created in LocalStorage yet
  if (localStorage.getItem("bestTimes") == null) {
    bestTimes.push(time); // add to global array 'bestTimes'
    localStorage.setItem("bestTimes", JSON.stringify(bestTimes)); // add to LocalStorage
    displayTopTimes()
  } else if (localStorage.getItem("bestTimes")) {
    bestTimes = JSON.parse(localStorage.getItem("bestTimes"));
        if (bestTimes.length != 5) {
          bestTimes.push(time);
          bestTimes.sort(sortTimes); // Sorted fastest to slowest time
          localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
        } else if (bestTimes.length === 5 && time < bestTimes[bestTimes.length-1]) {
            bestTimes.splice(bestTimes.length-1, 1, time); // Replaces last array element
            bestTimes.sort(sortTimes);
            localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
        }
    displayTopTimes()
  }
};
```

The ```displayTopTimes()``` looks a bit verbose with the ```switch``` statement.  I realized I needed to rebuild the TopFive Times every time a game was won.  Though I ran into a snag when I realized someone playing the game for the first time wouldn't have any previous times stored in their ```localStorage```.  So I opted for 5 individual cases to display 1 time, 2 times, etc.  Otherwise, ```undefined``` was listed for any times not yet recorded to ```localStorage```.


```
const displayTopTimes = () => {
  console.log(bestTimes);
  const displayTimesArray = [];
  console.log(displayTimesArray);
  bestTimes.forEach(bestTime => {
    if (bestTime > 60) {
      let mins = Math.floor(bestTime / 60)
      let secs = (bestTime - 60).toFixed(1);
      let displayTime = `${mins} min. ${secs} seconds`;
      displayTimesArray.push(displayTime);
    } else {
      let displayTime = `${bestTime} seconds`;
      displayTimesArray.push(displayTime);
    }
  });
  switch(bestTimes.length) {
    case 2:
      $('#first').html(`<span>${displayTimesArray[0]}</span>`);
      $('#second').html(`<span>${displayTimesArray[1]}</span>`);
      break;
    case 3:
      $('#first').html(`<span>${displayTimesArray[0]}</span>`);
      $('#second').html(`<span>${displayTimesArray[1]}</span>`);
      $('#third').html(`<span>${displayTimesArray[2]}</span>`);
      break;
    case 4:
      $('#first').html(`<span>${displayTimesArray[0]}</span>`);
      $('#second').html(`<span>${displayTimesArray[1]}</span>`);
      $('#third').html(`<span>${displayTimesArray[2]}</span>`);
      $('#fourth').html(`<span>${displayTimesArray[3]}</span>`);
      break;
    case 5:
      $('#first').html(`<span>${displayTimesArray[0]}</span>`);
      $('#second').html(`<span>${displayTimesArray[1]}</span>`);
      $('#third').html(`<span>${displayTimesArray[2]}</span>`);
      $('#fourth').html(`<span>${displayTimesArray[3]}</span>`);
      $('#fifth').html(`<span>${displayTimesArray[4]}</span>`);
      break;
    default:
      $('#first').html(`<span>${displayTimesArray[0]}`);
      break;
  }
}
```


**Loser**
I wanted to add some effect if a person got 10 strikes and lost the game.  I opted for a sound effect with a blinking "X" as a visual effect.  The "X" is an HTML symbol ```&#10754;``` hard-coded in the HTML and the blinking is controlled with CSS and jQuery fade methods.

```
const lostGame = () => {
  playLoserSound();
  showLoserX();
  // Disable game board
  $('#gameboard, div.card-cover').prop( "disabled", true );
  stopTimer();
};
```
```
const showLoserX = () => {
  $('#loser-x').css('display', 'flex').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500);
};
```


6. **Reset**
Whether a person wins or loses, the RESET button near the game board when clicked invokes the ```resetGame()``` function expression.

```
$('.reset-btn').on('click', (event) => {
  $('.reset-btn').addClass('hide');
  $('.play-btn').removeClass('hide');
  // resets game board values BUT doesn't start Timer
  resetGame();
});
```

```
const resetGame = () => {
  score = 0;
  strikes = 0;
  centiseconds = 0;
  seconds = 0;
  minutes =  0;
  timerGoing = true;

  // Clear Interval so when button is clicked, the time doesn't count twice as fast
  clearInterval(timer);
  // Reset DOM so time, score and strikes display 0s
  $('#time').html(`<span>${minutes}:${seconds}:${centiseconds}</span>`);
  $('#score').html(score);
  $('#strikes').html(strikes);
  // Removes Winner Modal window
  $('.results').removeClass('show-results');
  // Covers all uncovered cards
  $('.card-cover').removeClass('card-show');
};
```

7. **Sound Effects**
The sound effects are added by instantiating several Audio objects.  I initialized and stored them in an object literal just to visually organize them.  The first 6 properties are sounds underscoring the game.  The ```animals``` property is actual game content that a player matches with words in the game.

```
const gameAudio = {
    clickCard: new Audio('audio/click.mp3'),
    rightAnswer: new Audio('audio/right.mp3'),
    wrongAnswer: new Audio('audio/wrong.mp3'),
    aboutToLose: new Audio('audio/last_wrong.mp3'),
    winningSound: new Audio('audio/winner.mp3'),
    losingSound: new Audio('audio/loser.mp3'),
    animals: {
      chicken: new Audio('audio/animals/chicken.mp3'),
      cow: new Audio('audio/animals/cow.mp3'),
      duck: new Audio('audio/animals/duck.mp3'),
      elephant: new Audio('audio/animals/elephant.mp3'),
      goat: new Audio('audio/animals/goat.mp3'),
      dog: new Audio('audio/animals/dog.mp3'),
      horse: new Audio('audio/animals/horse.mp3'),
      frog: new Audio('audio/animals/frog.mp3'),
      sheep: new Audio('audio/animals/sheep.mp3'),
      wolf: new Audio('audio/animals.wolf.mp3'),
    }
};
```
All of the audio objects are _triggered_ by tucking each in its own function, which invokes the Audio object's ```.play``` method.  Allowing each to have its own function name also makes invoking them more explicit when tucked inside other functions.

The trickiest one was when I added animal sound effects as part of the matching content (e.g. match the sound effect of an elephant with the picture of an elephant).  I needed to balance those sounds with the ```clickCard``` sound effect when a player clicks a card.  Investigating the event object, I noticed when the ```clickCard``` sound effect was triggered, the event was _undefined_ or an empty string. When I clicked on an animal sound, the event had an ID (tucked deep in its hierarchy) from the HTML element ```"<img id='cow' src='./images/audio_file.svg' />"``` listed in the ```animalPics_sounds``` content array.  So I used that as the event parameter in ```handleAudio(event.target.nextElementSibling.children[0].firstChild.id);``` when its called in the ```handlePicks``` function expression.  Perhaps it's verbose, but it was the one sliver of difference between the two events that I could use to trigger each of the two sounds in the correct condition.

```
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
```


#### <a id="proposal">Project Proposal</a>

For more details and sample UI, please click on <a href="/proposal.md">Memory Match Proposal</a>.



#### <a id="workflow">Workflow</a>

  - Start Read Me and Proposal
  - Make sample array of vocabulary words
  - Make function to load array words onto DOM in a grid of squares
  - Make initial CSS Flex Box to get Memory Match Grid centered
  - Add Fisher-Yates function to shuffle array words
  - Add Button to trigger Fisher-Yates Shuffle
  - Add TIMER section and function
  - Add SCORE section and function
  - Add STRIKES section and function
  - Add Click Event logic to compare 'Card' values
  - Add Card covers and animation to show word underneath
  - Add sounds for action
  - Add window to show end results for winners
  - Refactor 'content' from array of strings to array of subarrays with strings allowing for more flexibility of content (word vs. word, word vs. picture, word vs. html symbol, word vs. audio)
  - Add Top Five Times area to modal window;
  - Add Top Five Times functionality using localStorage to set/get the Best Times
  - Add loser X symbol after losing
  - Make PLAY button turn to a RESET button during play
  - Add Selector to pick different content arrays (i.e. fruit, animals, Spanish, etc.)
  - Change Content Array into and Content Object with keys representing topic arrays - use words only
  - Add SVG images to Content Array, use <img> tags and paths as the string values
  - Make responsive design with CSS Grid
  - Show an Alert if no 'Word' bank is selected from Dropdown menu but Play is hit anyway.
  - Add 'sound matches pic' version; (use generic icon for sound for visual)


#### <a id="fixes">Fixes</a>
  - Timer doesn't stop immediately after game is won.


#### <a id="features">Future feature</a>
 - custom word content (use a ``<form>`` for user to make custom content of words and their matches) and
    add it to players ``<select>`` menu with button to edit it if it's selected.
 - store that custom content in browser's ``LocalStorage`` and add to players ``<select>`` menu

[back to the top](#table-of-contents)
