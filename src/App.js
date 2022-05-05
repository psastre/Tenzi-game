import React,{useState, useEffect} from 'react'
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [counter, setCounter] = useState(0)
    const [prevBest, setPrevBest] = useState(Number(localStorage.getItem("best ranking") || "100"))
    const [prevBestTime, setPrevBestTime] = useState(Number(localStorage.getItem("best time") || "100"))
    const [toggle, setToggle]= useState(true)



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
    
    
    
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
        
    }, [dice])

    useEffect(()=>{
        
        if(tenzies && counter<prevBest){
            localStorage.setItem("best ranking", counter.toString())
            setPrevBest(Number(localStorage.getItem("best ranking")))
            localStorage.setItem("best time", count.toString())
            setPrevBestTime(Number(localStorage.getItem("best time")))
            
        }
        
        
    })

    

    const [count, setCount] = useState(0);
    const [intervalId, setIntervalId] = useState(0);
    
        const handleClick = () => {
            if (intervalId) {
              clearInterval(intervalId);
              setIntervalId(0);
              return;
            }
        
            const newIntervalId = setInterval(() => {
              setCount(prevCount => prevCount + 1);
            }, 1000);
            setIntervalId(newIntervalId);
          };
      

    
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
            
            setTenzies(false)
            setDice(allNewDice())
            setCounter(0-1)
            setCount(0)
            

            
           
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

   function NewGameButton(){
    setDice(allNewDice())
    setToggle(prevState => !prevState)
    setCounter(0)
    setCount(0)
    setTenzies(false)
   }
   
   useEffect(()=>{
       if(tenzies){
        setToggle(prevState => !prevState)
       }
   },[dice])
 
    
    return (
        <main>
            {tenzies && <Confetti />}
            
            <div className="menu" style={{display: toggle||!tenzies && "none"}}>
              
                <h4>Best Score:</h4>
                <p>{prevBest}</p>
                <h4>Best Time:</h4>
                <p>{prevBestTime}</p>
               
                <button onClick={()=>{NewGameButton();handleClick()}}>New Game</button>
                <button onClick={()=>{setToggle(!toggle);handleClick()}}>Back to play</button>
                
            </div>
            
            
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div className="buttons">
                <button 
                    className="roll-dice" 
                    onClick={()=>{rollDice();rollCounter();start();
                    }}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
                <div className="counters">
                <button className='rolls-counter'>
                    rolls:<br/>
                    {counter}
                </button>
                <button className='rolls-counter'>
                    sec:<br/>
                   {count}
                </button>
                </div>
                <button className='pause' onClick={()=>{setToggle(!toggle);handleClick()}}>
                    Pause
                </button>
            </div>
        </main>
    )
}