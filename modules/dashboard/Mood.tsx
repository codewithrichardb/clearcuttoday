import React, { useState } from 'react'
import { FaFrown, FaHistory, FaMeh, FaSmile } from 'react-icons/fa';

function Mood() {
  const [moodToday, setMoodToday] = useState<number>(0)
  const handleMoodSelect = (value: number) => {
    setMoodToday(value);
  };
  return (
    <>
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => handleMoodSelect(value)}
          className={`rounded-circle btn border-0 ${moodToday === value
            ? "text-success"
            : "text-muted"
            }`}
        >{value < 3 ? <FaFrown size={20} /> : value === 3 ? <FaMeh size={20} /> : <FaSmile size={20} />}
        </button>
      ))}
      <FaHistory />
    </>
  )
}

export default Mood