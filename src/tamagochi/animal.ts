import { FoodPlate } from "./foodPlates";

interface AnimalInterface {
    name: string;
    age: number;
    nearbyPlates?: FoodPlate[];
    foodAmount: number;
    mood: "happy" | "sad" | "hungry" | "thirsty";
    happiness: number;
    water: number;
    health: number;
    alive: boolean;
    deathStatus?: string;
    eat(): void;
    play(): void;
    heal(): void;
    watered(): void;
    die(): void;
    status(): void;
    step (): void;
}


export class Animal implements AnimalInterface {
    name: string;
    mood: "happy" | "sad" | "hungry" | "thirsty" = "happy";
    health = 100;
    alive = true;
    foodAmount = 100;
    deathStatus?: string | undefined;
    happiness= 100;
    water= 100;  
    age = 0;
    nearbyPlates?: FoodPlate[] | undefined;
    constructor(name: string, nearbyPlates?: FoodPlate[]) {
        this.name = name;
        this.nearbyPlates = nearbyPlates;

    }
    eat() {
        if (this.foodAmount > 250) {
            this.die();
            this.deathStatus = `${this.name} наївся`;
        }
            if(this.nearbyPlates![0].food[0] !== undefined){
                this.foodAmount += this.nearbyPlates![0].food[0].amount;
                this.nearbyPlates![0].food.pop();
            }
            else if (this.nearbyPlates![2].food[0] !== undefined){             
                this.foodAmount += this.nearbyPlates![2].food[0].amount;
                this.nearbyPlates![2].food.pop();
            }
    }
    watered(): void {
        if(this.nearbyPlates![1].food[0] !== undefined){
            this.foodAmount += this.nearbyPlates![1].food[0].amount;
            this.nearbyPlates![1].food.pop();
        }
    }
    play() {
        let rand = Math.random() * 100;
        if (this.happiness > 250) {
            this.die();
            this.deathStatus = `${this.name} в буквальному сенсі лопнув від щастя`;
        }
        if (rand > 25) {
            this.health -= 10;
        }
        if (rand == 99) {
            this.die();
            this.deathStatus = `Шляхом випадкового випадку ${this.name} загинула`;
        }
        this.happiness += 10;
        this.foodAmount -= 10;
    }

    heal() {
        let rand = Math.random() * 100;
        if (this.health > 250) {
            this.die();
            this.deathStatus = `${this.name} більше ніколи не потребуватиме в лікуванні`;
        }

        if (rand == 99) {
            this.die();
            this.deathStatus = "Методи самолікування можуть бути шкідливими для вашого здоров'я";
        }
        this.health += 10;
        this.foodAmount -= 10;
    }
    die() {
        this.alive = false;
    }
    step(): void {
        this.age += 1;
        if (this.age%60 == 0) {
            this.foodAmount -= 10;
            this.water -= 10;
        }
        if (this.age%30 == 0) {
            this.happiness -= 10;
        }
        if (this.happiness < 50) {
            this.mood = "sad";
        }
        if (this.foodAmount < 50) {
            this.mood = "hungry";
        }
        if (this.health < 50 || this.happiness < 50) {
            this.mood = "sad";
        }
        if(this.foodAmount <= 0){
            this.die();
            this.deathStatus = `ви не змогли впоратися з відповідальністю за ${this.name} і він помер від голоду`;
        }
        if (this.water < 50) {
            this.mood = "thirsty";
        }
        if (this.water <= 0) {
            this.die();
            this.deathStatus = `ви не змогли впоратися з відповідальністю за ${this.name} і він помер від спраги`;
        }
        if (this.happiness < 0) {
            this.deathStatus = `внаслідок вашої безсердечності ${this.name} вирішив вступити в атихриський куль де йому буде краще  без вас`;
            this.die();
        }
        if (this.health < 0) {
            this.deathStatus = `треба бути обачнушим зі своєю твариною, ${this.name} помер від недбалості`;
            this.die();
        }
        if (this.health >= 50 && this.happiness >= 50 && this.foodAmount >= 50) {
            this.mood = "happy";
        }
        if(this.nearbyPlates![0].food[0]!==undefined && this.age%5 == 0){
            this.eat();
        }
        if(this.nearbyPlates![1].food[0]!==undefined && this.age%5 == 0){
            this.watered();
        }
        if(this.nearbyPlates![2].food[0]!==undefined && this.age%5 == 0){
            this.eat();
        }
    }
    status(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}, food: ${this.foodAmount}, Mood: ${this.mood}, Happiness: ${this.happiness}, Health: ${this.health}, Alive: ${this.alive}`);
    }
}

export type {AnimalInterface};