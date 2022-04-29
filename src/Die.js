import React from "react";


export default function Die(props) {
   
    const diceValue = props.value;
    
    return (
        <div>
        <div class="first-face" style={{ display: diceValue === 1 ? "flex" : "none", backgroundColor: props.isHeld ? "#59E391" : "white"}} 
           
            onClick={props.holdDice}>
            <span class="pip"></span>
        </div>
 
        <div class="second-face" style={{ display: diceValue === 2 ? 'flex' : 'none',
         backgroundColor: props.isHeld ? "#59E391" : "white"}}
         onClick={props.holdDice}>
            <span class="pip"></span>
            <span class="pip"></span>
        </div>

    <div class="third-face" style={{ display: diceValue === 3 ? 'flex' : 'none',
     backgroundColor: props.isHeld ? "#59E391" : "white" }}
     onClick={props.holdDice}>
        <span class="pip"></span>
        <span class="pip"></span>
        <span class="pip"></span>
    </div>
 
        <div class="fourth-face" style={{ display: diceValue === 4 ? 'flex' : 'none' ,
         backgroundColor: props.isHeld ? "#59E391" : "white" }}
         onClick={props.holdDice}>
            <div class="column">
                <span class="pip"></span>
                 <span class="pip"></span>
            </div>
            <div class="column">
                <span class="pip"></span>
                <span class="pip"></span>
            </div>
        </div>
  
        <div class="fifth-face" style={{ display: diceValue === 5 ? 'flex' : 'none' ,
         backgroundColor: props.isHeld ? "#59E391" : "white" }}
         onClick={props.holdDice}>
  <div class="column">
    <span class="pip"></span>
    <span class="pip"></span>
  </div>
  <div class="column">
    <span class="pip"></span>
  </div>
  <div class="column">
    <span class="pip"></span>
    <span class="pip"></span>
  </div>
</div>
    

        <div class="sixth-face" style={{ display: diceValue === 6 ? 'flex' : 'none',
        backgroundColor: props.isHeld ? "#59E391" : "white" }}
        onClick={props.holdDice}>
  <div class="column">
    <span class="pip"></span>
    <span class="pip"></span>
    <span class="pip"></span>
  </div>
  <div class="column">
    <span class="pip"></span>
    <span class="pip"></span>
    <span class="pip"></span>
  </div>
</div>
    </div>

    )
}