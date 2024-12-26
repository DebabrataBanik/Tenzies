# Tenzies Game

Tenzies is a fun dice game where the goal is to roll until all the dice show the same value. Players can "hold" specific dice to freeze their values between rolls, and continue rolling the remaining dice until all are the same.

## Table of Contents

- [Screenshots](#screenshots)
- [Live Site](#live_site)
- [Features](#features)
- [Built with](#built-with)
- [Structure](#structure)
- [What I Learned](#what-i-learned)
- [Continued Development](#continued-development)

### Screenshots

![alt text](<public/live site ss.png>)

### Live Site

This project has been deployed on Vercel: [Live Site](https://my-tenzies.vercel.app/)

### Features

- **Dynamic Dice Rolling**: Each die displays a random value between 1 and 6.

- **Hold Functionality**: Click on a die to freeze its value, preventing it from being rolled again(indicated by a different color).

- **Winning Condition**: The game ends when all the freezed dice show the same value.

- **Interactive UI**: Responsive design with a clean, user-friendly interface.

### Built with

- ReactJs
- CSS
- Vite

### Structure

`App.jsx`

- Manages the game state, including the array of dice.

- Contains the logic for rolling dice and checking win conditions.

- Passes props to the Die component to handle individual dice.

`Die.jsx`

- Renders a single die.

- Handles the **hold** functionality, which is defined and managed in the parent component (App.js) and passed down to Die.js as a prop, allowing users to freeze a die's value.

### What I Learned

1. State Initialization with a Callback:

``` javascript

 const [dice, setDice] = useState(() => generateAllNewDice());
  
```

Using a callback in the state initialization prevents unnecessary re-runs of the `generateAllNewDice`  function on every render.

2. **DOM Focus with useRef**: Using a ref to focus the button after the game is won:

```javascript
const buttonRef = useRef(null);

useEffect(() => {
  if (gameWon) {
    buttonRef.current.focus();
    // This allows immediate focus on the button when the game is won after selecting the last die.
  }
}, [gameWon]);

<button
  className="roll-btn"
  onClick={rollDice}
  ref={buttonRef}
>
  {gameWon ? "New Game" : "Roll"}
</button>

```

### Continued Development

- Add a timer to track how quickly players win.

- Add animations for dice rolls and holds.
