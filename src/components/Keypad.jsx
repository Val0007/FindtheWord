import React, { useEffect, useState } from 'react'

export default function Keypad({usedKeys,handler}) {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    const lettersObject = [
        {"key": "q"},
        {"key": "w"},
        {"key": "e"},
        {"key": "r"},
        {"key": "t"},
        {"key": "y"},
        {"key": "u"},
        {"key": "i"},
        {"key": "o"},
        {"key": "p"},
        {"key": "a"},
        {"key": "s"},
        {"key": "d"},
        {"key": "f"},
        {"key": "g"},
        {"key": "h"},
        {"key": "j"},
        {"key": "k"},
        {"key": "l"},
        {"key": "Enter"},
        {"key": "z"},
        {"key": "x"},
        {"key": "c"},
        {"key": "v"},
        {"key": "b"},
        {"key": "n"},
        {"key": "m"},
        {"key": "back"}
      ]
     setLetters(lettersObject)
  }, [])

  return (
    <div className="keypad">
      {letters && letters.map(l => {
          const color = usedKeys[l.key]
        return (
          <div key={l.key} className={color} onClick={()=>{
            handler({key:l.key})
          }}>{l.key}</div>
        )
      })}
    </div>
  )
}