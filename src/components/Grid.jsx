import React from 'react'
import Row from './Row'
export default function Grid({currentGuess,guesses,turn}) {
    return (
        <div>
            {guesses.map((guess,i) => {
                if(i == turn){
                    return <Row guess={guess} key={i} currentGuess={currentGuess}></Row>
                }
                return <Row guess={guess} key={i}></Row>
            })}
        </div>
    )
}
