function Die({
  id,
  value,
  isHeld,
  hold
}) {
  return (
    <button
      onClick={() => hold(id)}
      className={`${isHeld ? 'die held' : 'die'}`}
      aria-label={`Die with value ${value},
      ${isHeld ? 'held' : 'not held'}`}
      aria-pressed={isHeld}
    >
      {value}
    </button>
  )
}

export default Die