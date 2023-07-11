import React from 'react'

export default function Row({guess,currentGuess}) {

    //past guesses
    if(guess){
        return (
            <div className="row past">
                {guess.map((letter,i) => {
                    return <div key={i} className={letter.color}>{letter.key}</div>
                })}
            </div>
        )
    }

    //current guesses
    if (currentGuess) {
        let letters = currentGuess.split('')
    
        return (
          <div className="row current">
            {letters.map((letter, i) => (
              <div key={i} className="filled">{letter}</div>
            ))}
            {[...Array(5 - letters.length)].map((_,i) => (
              <div key={5 - letters.length + i}></div>
            ))}
          </div>
        )
      }


    //empty rows
    return (
        <div className="row">
            <div>{currentGuess ? currentGuess[0] : ""}</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
