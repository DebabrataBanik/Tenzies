import Die from "./components/Die"
import { useState, useRef, useEffect } from "react"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(() => generateAllNewDice())
  // initializing state with a function will cause the it to run on every re render although it wont reset so a callback is preffered

  const buttonRef = useRef(null)

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
      // this allows us to focus the button when the game is won immediately after selecting the last sync die
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
    setDice(prevDice =>
      prevDice.map(die =>
        die.isHeld ? die : {
          ...die,
          value: Math.ceil(Math.random() * 6)
        }
      )
    )
    if (gameWon) {
      setDice(generateAllNewDice())
    }
  }

  function hold(id) {
    setDice(prevDice =>
      prevDice.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    )
  }

  let gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  return (
    <main className="main">
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>You won!! Press &quot;New Game&quot; to play again</p>}
      </div>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

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
        onClick={rollDice}
        ref={buttonRef}
      >{gameWon ? "New Game" : "Roll"}</button>

    </main>
  )
}

export default App