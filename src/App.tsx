import React, { useState, useEffect } from "react";
import {type AnimalInterface,createAnimal, createFoodplates, createFood, type FoodPlateInterface} from './tamagochi'
import './App.css'
import puppy from "./assets/puppy.png";

function App() {
  const [nameValue, setNameValue] = useState("");
  const [animal, setAnimal] = useState<AnimalInterface | null>(null);
  const [animalDeathStatus, setanimalDeathStatus] = useState<string | undefined>("");
  const [happiness, setHappiness] = useState(0);
  const [food, setFood] = useState(0);
  const [health, setHealth] = useState(0);
  const [water, setWater] = useState(0);
  const [position, setPosition] = useState(150);
  const [direction, setDirection] = useState('left');
  const [mood,setMood] = useState<String>('happy');
  const [foodType, setFoodType] = useState<string>('1');
  const [foodPlates, setFoodPlates] = useState<string>('1');
  const [plates, setPlates] = useState<undefined|FoodPlateInterface[]>();
  const [message, setMessage] = useState('');

  const showMessage = (message:string) => {
    setMessage(message); 
    setTimeout(() => {
      setMessage('');
    }, 3000); 
  };
  const blinkingHealth = {
    animation: health < 30 ? 'blink 1s infinite' : 'none', 
  };
  const blinkingFood = {
    animation: food < 30 ? 'blink 1s infinite' : 'none', 
  };
  const blinkingHappynes = {
    animation: happiness < 30 ? 'blink 1s infinite' : 'none', 
  };
  const blinkingWater = {
    animation: water < 30 ? 'blink 1s infinite' : 'none', 
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
      const plates = createFoodplates();
      setPlates(plates);
      const newAnimal = createAnimal(nameValue, plates);
      setanimalDeathStatus(undefined);
      console.log(newAnimal);
      setAnimal(newAnimal);
    }
  };

  useEffect(() => {
    if (animal) {
      const intervalId = setInterval(() => {
        animal.step();
        setHappiness(animal.happiness);
        setFood(animal.foodAmount);
        setHealth(animal.health);
        setWater(animal.water);
        setMood(animal.mood);
        // console.log(animal.status());
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
      {animalDeathStatus && <h1>{animalDeathStatus}</h1>}
      {!animal ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', height: '100vh'   }}> 
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
            <div style={{ textAlign: 'center' }}>
              <h2 style={blinkingWater}>Water</h2>
              <div style={{minWidth:"200px", width: '100%', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
                <div className="params" style={{ width: `${water}%`, height: '10px', backgroundColor: 'red' }}></div>
              </div>
            </div>
          </div>
          <h2>{mood}</h2>
          <div style={{ position: 'relative', height: '320px' }}>
            <div style={{
              position: 'absolute',
              left: direction === 'left' ? `calc(${position})` : `calc(${position}px)`,
              
              transition: 'left 1s linear',
              marginTop: '-50px',
              width: '200px',
              height: '200px',
              top: '50%',
              transform:"translateY(-50%)",
              }}>
              <h1>{animal.name}</h1>  
              <img src={puppy} alt="Moving" className="puppyImage"style={{width: '100%', height: '100%',transform: direction === 'left' ? "scaleX(-1)": "scaleX(1)",}}/>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap : '30px' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={blinkingHappynes}>Тарілка</h2>
              <div style={{minWidth:"200px", width: '100%', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
                <div className="params" style={{ width: `${plates![0].food.length * 10}%`, height: '10px', backgroundColor: 'red' }}></div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h2 style={blinkingFood}>Бутилка</h2>
              <div style={{minWidth:"200px", width: '100%', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
                <div className="params" style={{ width: `${plates![1].food.length * 10}%`, height: '10px', backgroundColor: 'blue' }}></div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h2 style={blinkingHealth}>Кошик</h2>
              <div style={{minWidth:"200px", width: '100%', backgroundColor: '#ddd', borderRadius: '5px', overflow: 'hidden' }}>
                <div className="params" style={{ width: `${plates![2].food.length * 10}%`, height: '10px', backgroundColor: 'green' }}></div>
              </div>
            </div>
          </div>
          {message && <h3 style={{color:"red"}}>{message}</h3>}
          <button onClick={() => animal?.play()}>Погладить</button>
          <select name="food" value={foodType} onChange={(event) => setFoodType(event.target.value)}>
            <option value="1">М'ясо</option>
            <option value="2">Вода</option>
            <option value="3">Яблуки</option>
          </select>
          <select name="foodPlates" id="" value={foodPlates} onChange={(event) => setFoodPlates(event.target.value)}>
            <option value="1">Тарілка</option>
            <option value="2">бутилка</option>
            <option value="3">Кошик</option>
          </select>
          <button onClick={() => {
            if(foodType.length > 0 && foodPlates.length > 0){
              if (foodPlates == "1"){
                if(foodType == "1"){
                  plates![0].addFood(createFood("М'ясо", 10, "many pieces"));
                  showMessage(plates![0].consolemessage);
                }
                else if(foodType == "2"){
                  plates![0].addFood(createFood("Вода", 10, "liquid"));
                  showMessage(plates![0].consolemessage);
                }
                else
                {
                  plates![0].addFood(createFood("Яблуки", 10, "one piece"));
                  showMessage(plates![0].consolemessage);
                }
              }
              if (foodPlates == "2"){
                if(foodType == "1"){
                  plates![1].addFood(createFood("М'ясо", 10, "many pieces"));
                  showMessage(plates![1].consolemessage);
                }
                else if(foodType == "2"){
                  plates![1].addFood(createFood("Вода", 10, "liquid"));
                  showMessage(plates![1].consolemessage);
                }
                else
                {
                  plates![1].addFood(createFood("Яблуки", 10, "one piece"));
                  showMessage(plates![1].consolemessage);
                }
              }
              if (foodPlates == "3"){
                if(foodType == "1"){
                  plates![2].addFood(createFood("М'ясо", 10, "many pieces"));
                  showMessage(plates![2].consolemessage);
                }
                else if(foodType == "2"){
                  plates![2].addFood(createFood("Вода", 10, "liquid"));
                  showMessage(plates![2].consolemessage);
                } 
                else
                {
                  plates![2].addFood(createFood("Яблуки", 10, "one piece"));
                  showMessage(plates![2].consolemessage);
                }
              }
              console.log(plates);
            }}}>Положити Їжу</button>
          <button onClick={() => animal?.heal()}>Вилікувати</button>
        </div>
      )}


    </>
  )
}

export default App
