import React, { useState, useEffect, KeyboardEventHandler } from "react";
import {type AnimalInterface,createAnimal} from './tamagochi'
import './App.css'
import puppy from "./assets/puppy.png";

function App() {
  const [nameValue, setNameValue] = useState("");
  const [animal, setAnimal] = useState<AnimalInterface | null>(null);
  const [animalDeathStatus, setanimalDeathStatus] = useState<string | undefined>("");
  const [happiness, setHappiness] = useState(0);
  const [food, setFood] = useState(0);
  const [health, setHealth] = useState(0);
  const [position, setPosition] = useState(150);
  const [direction, setDirection] = useState('left');
  const [mood,setMood] = useState<String>('happy');

  const blinkingHealth = {
    animation: health < 30 ? 'blink 1s infinite' : 'none', 
  };
  const blinkingFood = {
    animation: food < 30 ? 'blink 1s infinite' : 'none', 
  };
  const blinkingHappynes = {
    animation: happiness < 30 ? 'blink 1s infinite' : 'none', 
  };
  const styles = `
  @keyframes blink {
    0% {
      color: red;
    }
    50% {
      color: white;
    }
    100% {
      color: red;
    }
  }
`;
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value); 
  };

  const randomDirection = () => {
    setDirection(Math.random() > 0.5 ? 'left' : 'right');
  };


  useEffect(() => {
    const interval = setInterval(() => {
      randomDirection();
      setPosition(Math.floor(Math.random() * 300) + 150);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  const submitAndCreateAnimal = () => {
    if (nameValue.length > 0 && animal === null) {
      const newAnimal = createAnimal(nameValue);
      setanimalDeathStatus(undefined);
      console.log(newAnimal);
      setAnimal(newAnimal);
    }
  };

  useEffect(() => {
    if (animal) {
      const intervalId = setInterval(() => {

        animal.time();
        setHappiness(animal.happiness);
        setFood(animal.food);
        setHealth(animal.health);
        setMood(animal.mood);
        console.log(animal.status());
        if (!animal.alive) {
          clearInterval(intervalId);
          console.clear();
          setanimalDeathStatus(animal.deathStatus);
          console.log(animalDeathStatus);      
          console.log("пупупу ЯК так можна????");
          setAnimal(null);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [animal]);


  return (
    <>
      <style>{styles}</style>
      {animalDeathStatus && <div>{animalDeathStatus}</div>}
      {!animal ? (
      <div> 
      <input
        type="text"
        value={nameValue}
        onChange={handleChange}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            submitAndCreateAnimal(); // Викликаємо функцію
          }
        }}
      />
        <button  onClick={submitAndCreateAnimal}>Create Animal</button>
      </div>
      ) : (
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap : '30px' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={blinkingHappynes}>Happiness</h2>
              <div style={{minWidth:"200px", width: '100%', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
                <div className="params" style={{ width: `${happiness}%`, height: '10px', backgroundColor: 'green' }}></div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h2 style={blinkingFood}>Food</h2>
              <div style={{minWidth:"200px", width: '100%', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
                <div className="params" style={{ width: `${food}%`, height: '10px', backgroundColor: 'orange' }}></div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h2 style={blinkingHealth}>Health</h2>
              <div style={{minWidth:"200px", width: '100%', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
                <div className="params" style={{ width: `${health}%`, height: '10px', backgroundColor: 'red' }}></div>
              </div>
            </div>
          </div>
          <h2>{mood}</h2>
          <div style={{ position: 'relative', height: '420px' }}>
            <div style={{
              position: 'absolute',
              left: direction === 'left' ? `calc(${position})` : `calc(${position}px)`,
              
              transition: 'left 1s linear',
              marginTop: '-50px',
              width: '300px',
              height: '300px',
              top: '50%',
              transform:"translateY(-50%)",
              }}>
              <h1>{animal.name}</h1>  
              <img src={puppy} alt="Moving" className="puppyImage"style={{width: '100%', height: '100%',transform: direction === 'left' ? "scaleX(-1)": "scaleX(1)",}}/>
            </div>
          </div>
          <button onClick={() => animal?.play()}>Погладить</button>
          <button onClick={() => animal?.feed()}>Покормить</button>
          <button onClick={() => animal?.heal()}>Вилікувати</button>
        </div>
      )}


    </>
  )
}

export default App
