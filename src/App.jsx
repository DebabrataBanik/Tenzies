import Die from "./components/Die"
import { useState, useRef, useEffect } from "react"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(() => generateAllNewDice())

  const buttonRef = useRef(null)

  const [rollCount, setRollCount] = useState(0)

  let gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }))
  }

  function rollDice() {
    setRollCount(prevCount => prevCount + 1);
    setDice(prevDice =>
      prevDice.map(die =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }

  function resetGame() {
    setRollCount(0)
    setDice(generateAllNewDice())
  }

  function hold(id) {
    setDice(prevDice =>
      prevDice.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    )
  }

  return (
    <main className="main">
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>You won!! Press &quot;New Game&quot; to play again</p>}
      </div>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <div className="counter">
        <p>Roll Count: {rollCount}</p>
      </div>

      <div className="dice__container">
        {
          dice.map(die => (
            <Die
              hold={hold}
              key={die.id}
              {...die}

            />
          ))
        }
      </div>

      <button
        className="roll-btn"
        onClick={gameWon ? resetGame : rollDice}
        ref={buttonRef}
      >{gameWon ? "New Game" : "Roll"}</button>

    </main>
  )
}

export default App