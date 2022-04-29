import React,{useState, useEffect} from 'react'
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [counter, setCounter] = useState(0)

    const [seconds, setSeconds]= useState(0);
    const [minutes, setMinutes]= useState(0);

    var timer;
    

    
    
    const pause =()=>{clearInterval(timer) }
    const start =()=>{
        timer=setInterval(()=>{
        setSeconds(seconds+1);
        if(seconds===59){
            setMinutes(minutes+1)
            setSeconds(0);
        }
        
    },100)

    return ()=>(clearInterval(timer)) }
    
    //const pauseWin =()=>{tenzies && clearInterval(timer)}
    //pauseWin()
    
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])


   

    function generateNewDie() {
       
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        
        return newDice
    }
    
/**
 * Challenge: Allow the user to play a new game when the
 * button is clicked and they've already won
 */
    
    function rollDice() {
      if(!tenzies){
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        
        }))
          }else{
            clearInterval(timer)
            setTenzies(false)
            setDice(allNewDice())
          }
        }
  
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    function rollCounter(){
        setCounter(prevCounter => prevCounter+=1)
    }

   
    
    
    
    return (
        <main>
            
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div className="buttons">
                <button 
                    className="roll-dice" 
                    onClick={()=>{rollDice();rollCounter();start()
                    }}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
                <button className='rolls-counter'>
                    {counter}
                </button>
                <button className='pause' onClick={pause}>
                    Pause
                </button>
                <h4>
                    {minutes<10 ? "0"+minutes:minutes}:{seconds<10 ? "0"+seconds:seconds}
                </h4>
            </div>
        </main>
    )
}