import {useEffect, useState} from 'react'
import wordleHook from '../hooks/wordleHook'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './modal'
import { useParams } from 'react-router-dom'
var CryptoJS = require("crypto-js");


export default function Wordle() {

    const [solution,setSolution] = useState("")
    const [name,setName] = useState("")
    const {currentGuess,handleKeyup,guesses,isCorrect,turn,usedKeys} = wordleHook(solution)
    const [showModal,setShowModal] = useState(false)
    console.log(currentGuess.length)
    const obj = useParams()
    const word  = obj['*']

    useEffect(() => {
        if(solution == ""){
            console.log(word)
            var bytes = CryptoJS.AES.decrypt(word, 'my-secret-key@123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            let data = decryptedData.split("|")
            setName(data[1])
            setSolution(data[0].toString().toLowerCase()) //will reRender and give wordleHook() will be called again with new solution
        }
        window.addEventListener('keyup',handleKeyup)
        console.log("YOO")
        if(isCorrect){
            console.log("you winn")
            setTimeout(()=>{
                setShowModal(true)
            },2000)
            window.removeEventListener('keyup',handleKeyup)
        }

        if(turn>5){
            setTimeout(()=>{
                setShowModal(true)
            },2000)
            console.log("soory u lost")
        }

        return () => {
            //before it gets called again we perform a cleanup or multiple presses will log even for one press
            window.removeEventListener('keyup',handleKeyup)
        }
    },[handleKeyup,isCorrect,turn,setShowModal,solution])


    return (
        <div>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}></Grid>
            <Keypad usedKeys={usedKeys} handler={handleKeyup}/>
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} name={name}></Modal>}
        </div>
    )
}
