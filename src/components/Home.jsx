import React, { useState } from 'react'
var CryptoJS = require("crypto-js");


export default function Home() {

    const [word,setWord] = useState("")
    const [name,setName] = useState("")
    const [pressed,setPressed] = useState(false)



    return (
        <div className="login">
            <h3>Enter a 5 letter word</h3>
            <input type="text" placeholder="Enter your word" value={word} onChange={(e)=>{setWord(e.target.value)}}/>
            <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <button className={pressed ? "pressed" : ""} onClick={()=>{
                if(word.length != 5){
                    return
                }
                if(name.length == 0){
                    return
                }

                var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(`${word}|${name}`), 'my-secret-key@123').toString();
                console.log(ciphertext)
                const copyContent = async (text) => {
                    try {
                      await navigator.clipboard.writeText(text);
                      console.log('Content copied to clipboard');
                      setPressed(true)
                    } catch (err) {
                      console.error('Failed to copy: ', err);
                    }
                  }
                  let link = `${window.location.href}${ciphertext}`
                  copyContent(link)
            }}>{!pressed ? "Generate Link" : "Copied!"}</button>
        </div>
    )
}
