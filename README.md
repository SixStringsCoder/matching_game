### Proposal
Make a _Memory Match_ game where all card pairs must be matched to win the game

  #### Game Behavior
  - present it as a grid of 4 x 4 (Desktop) and 3 x 6 (small mobile) of 8 hidden card pairs
  - randomly shuffle the cards
  - once a match is made, the paired cards are _kept revealed_
  - if two picked squares don't match indicate that with a message (sound too?)
  - have a timer running that shows how long it took to complete the challenge
  - Winning Sequence
    - modal window to congratulate the player
    - show how much time it took to complete the challenge
    - ask to play again or quit


  #### Components
  - grid with cards
  - 'Strikes or Stars' display area
    - showing how well the player is doing.  
    - 3-6 strikes = game over
  - Timer
    - count up
    - option to count down and remove 'strikes'
  - Number of 'Moves' or 'Attempts'
  - Modal Window for Winner/Loser
    - play again button
    - quit button
  - Reset button to restart game


  #### UX Notes
- CSS Grid to make whole page responsive layout
-

  #### Workflow as it happened:

  - Start Read Me and Proposal
  - Make sample array of vocabulary words
  - Make function to load array words onto DOM in a grid of squares
  - Make initial CSS Flexbox to get Memory Match Grid centered
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
  - Add Top Score area to modal window; add functionality using localStorage to store a score
  - Add loser X symbol after losing
  - Make PLAY button turn to a RESET button during play
  - Add Selector to pick different content arrays (i.e. fruit, animals, Spanish, etc.)
  - Change Content Array into and Content Object with keys representing topic arrays - use words only
  - Add SVG images to Content Array, use <img> tags and paths as the string values
  - Make responsive design with CSS Grid
  - Show an Alert if no 'Word' bank is selected from Dropdown menu but Play is hit anyway.
  - Add 'sound matches pic' version; (use generic icon for sound for visual)

_To-Do-List_
  - Add shake animation for wrong answer


#### Fixes
  - Hit Play - Then after clicking Reset, the matched cards still show. Hide all cards on Reset.


#### Future features
 - word vs pic
 - pic vs. sound
