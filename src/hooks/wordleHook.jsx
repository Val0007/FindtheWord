import {useState} from 'react'

//closure keeping track of everything modifying properties using handlekeyup
const useWordle = (solution)=>{

    const [turn, setTurn] = useState(0) //updates after adding a new guess 
    const [currentGuess, setCurrentGuess] = useState('') //updates after handleKeyup
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array (Formatted  Guesses -> [{key,color},{}])
    const [history, setHistory] = useState([]) // each guess is a string ->  to check for duplicates
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys,setUsedKeys] = useState({})

    const formatGuess = ()=>{
        console.log(currentGuess)
        let solutionArray = [...solution] //arr of char
        let formattedGuess = [...currentGuess].map(letter => {
            return {key:letter,color:'grey'}
        })

        //find green letter
        formattedGuess.forEach((obj,i) => {
            if(solutionArray[i] === obj.key){
                formattedGuess[i].color = "green"
                solutionArray[i] = null
            }
        })


        //find one occurance
        formattedGuess.forEach((obj,i)=>{
            if(solutionArray.includes(obj.key) && obj.color !== 'green'){
                formattedGuess[i].color = "yellow"
                solutionArray[solutionArray.indexOf(obj.key)] = null
            }
        })

        return formattedGuess

    }


    const addNewGuess = (formattedGuess)=>{
        if(currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses(prev => {
            const newGuesses = [...prev] //never change the old state directly
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory(prev => {
            const old = [...prev]
            old.push(currentGuess)
            return old
        })
        setTurn(prev => prev + 1)
        setUsedKeys(prev => {
            const newk = {...prev}
            formattedGuess.forEach(l => {
                const currentColor = newk[l.key]
                if(l.color === 'green'){
                    newk[l.key] = 'green'
                    return
                }
                if(l.color === 'yellow' && currentColor !== 'green'){ //in the past it was not green
                    newk[l.key] = 'yellow'
                    return
                }
                if(l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow'){
                    newk[l.key] = 'grey'
                    return
                }
            })
            return newk
        })
        setCurrentGuess("")

    }


    const handleKeyup = ({key})=>{
        console.log("current word is",currentGuess)
        console.log("solution is ",solution)
        if(key === 'Enter'){
            if(turn>5){
                return
            }
            if(history.includes(currentGuess)){
                return
            }
            if(currentGuess.length !== 5){
                console.log(currentGuess.length)
                return
            }
            console.log("ADD")
            const formattedWord = formatGuess()
            addNewGuess(formattedWord)
            console.log(formattedWord)
        }

        if (key === 'Backspace' || key === 'back') {
            setCurrentGuess(prev => prev.slice(0, -1))
            return
          }
          if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
              setCurrentGuess(prev => prev + key)
            }
        }

    }

    console.log("WITH SOL",solution)
    return {turn,currentGuess,guesses,isCorrect,handleKeyup,usedKeys}


}

export default useWordle