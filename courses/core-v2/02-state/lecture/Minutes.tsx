import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

export const Minutes = () => {
  const [minutes, setMinutes] = React.useState(0)
  const [error, setError] = useState(null)

  function subtract() {
    const nextMinutes = minutes - 1
    setMinutes(nextMinutes) // queue's a re-render
    if (nextMinutes < 0) {
      setError('Cannot be less than 0')
    }
  }

  function add() {
    setMinutes(minutes + 1)
  }

  return (
    <>
      <div className="minutes">
        <div>
          <button onClick={subtract} type="button">
            <FaMinusCircle />
          </button>
        </div>
        <input type="text" value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value))} />
        <div>
          <button onClick={add} type="button">
            <FaPlusCircle />
          </button>
        </div>
      </div>

      {error && <p>{error}</p>}
    </>
  )
}
