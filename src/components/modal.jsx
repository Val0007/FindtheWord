import React from 'react'

export default function modal({isCorrect,turn,solution,name}) {
    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <h1>YOU WIN! You found the word given by {name}</h1>
                    <p className="solution">{solution}</p>
                    <p>You found the solution in {turn} guesses</p>
                </div>
            )}

            {!isCorrect && (
                <div>
                    <h1>Nevermind! You couldn't find {name}'s word</h1>
                    <p className="solution">{solution}</p>
                    <p>Better luck next time</p>
                </div>
            )}
        </div>
    )
}
