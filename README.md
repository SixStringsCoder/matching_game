# Game: Brain Fart

## Table of Contents

--------------------------

- [Acknowledgements] (#related-efforts)
   - fruit_pics from https://commons.wikimedia.org/
   - sign language anigifs from http://lifeprint.com/asl101/gifs-animated/
   - sound effects from Hollywood Premiere Edition licensed collection

- [Maintainers] Steve Hanlon
- [License] None


**Brain Fart** - *the memory match game for memories that stink*, came from a Google project challenge.  The memory match game had to cover the following rubric:


### Workflow and Programming Explanations
#### Scripts and Libraries: JavaScript ES2015 and jQuery 3.3.1
1. **Create content and game board**
  **The content** is stored in arrays. The arrays always consist of string values which represent words and at other times, links to picture files.

  The game board is made by iterating through one of the content arrays and then appending each content element to a DOM element which are styled with CSS into a grid of squares.
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
  - Triggers a callback function to shuffle cards which also
  - Makes the game board which also
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
As I started adding more content arrays, I added a select menu to allow the player to pick the content to play the game with.  I then needed to adjust this function to alert the player the game can only start if content is _selected_.

This Play game eventually became a button toggling between PLAY and RESET.
```
$('.reset-btn').on('click', (event) => {
  $('.reset-btn').addClass('hide');
  $('.play-btn').removeClass('hide');
  resetGame(); // resets gameboard values BUT doesn't start Timer
});
```

4. **Timer**
Part of the Google rubric was to add a timer. I wanted to add some excitement to the game so I added a _centisecond_ value so the numbers incremented faster.  The timer function is triggered by a setInterval function.
```
const timeHandler = () => {
  return timerGoing ? (
    timer = setInterval(timeCounter, 100)
  ) : (
    clearInterval(timer)
  );
};
```
Each value (minutes, seconds, centiseconds) are incremented and reset accordingly. Then I add them to the DOM via jQuery html method.  I decided to make the minutes, seconds, centiseconds Global vlaues so that other functions could access them when needed.
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
I then created a Boolean value to indicate when the timer should be stopped and the function clearInterval() called.  `timerGoing` is a Global variable, too, so that other functions could control when to stop the timer.
```
const stopTimer = () => {
  timerGoing = false;
  timeHandler();
};
```

For more details and sample UI, please click on <a href="/proposal.md">Memory Match Proposal</a>.



  #### Workflow
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


#### Fixes
  - Timer doesn't stop immediately after game is won.


#### Future features
 - custom word content (use a ``<form>`` for user to make custom content of words and their matches) and
    add it to players ``<select>`` menu with button to edit it if it's selected.
 - store that custom content in browser's ``LocalStorage`` and add to players ``<select>`` menu
