interface AnimalInterface {
    name: string;
    age: number;
    food: number;
    mood: "happy" | "sad" | "hangry";
    happiness: number;
    health: number;
    alive: boolean;
    deathStatus?: string;
    feed(): void;
    play(): void;
    heal(): void;
    die(): void;
    status(): void;
    time (): void;
}


export class Animal implements AnimalInterface {
    name: string;
    mood: "happy" | "sad" | "hangry" = "happy";
    health = 100;
    alive = true;
    food = 100;
    deathStatus?: string | undefined;
    happiness= 100;
    age = 0;
    constructor(name: string) {
        this.name = name;
    }
    feed() {
        if (this.food > 250) {
            this.die();
            this.deathStatus = `${this.name} наївся`;
        }
        this.food += 10;
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
        this.food -= 10;
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
        this.food -= 10;
    }
    die() {
        this.alive = false;
    }
    time(): void {
        this.age += 1;
        if (this.age%60 == 0) {
            this.food -= 10;
        }
        if (this.age%30 == 0) {
            this.happiness -= 10;
        }
        if (this.happiness < 50) {
            this.mood = "sad";
        }
        if (this.food < 50) {
            this.mood = "hangry";
        }
        if (this.health < 50 || this.happiness < 50) {
            this.mood = "sad";
        }
        if(this.food <= 0){
            this.die();
            this.deathStatus = `ви не змогли впоратися з відповідальністю за ${this.name} і він помер від голоду`;

        }
        if (this.happiness < 0) {
            this.deathStatus = `внаслідок вашої безсердечності ${this.name} вирішив вступити в атихриський куль де йому буде краще  без вас`;
            this.die();
        }
        if (this.health < 0) {
            this.deathStatus = `треба бути обачнушим зі своєю твариною, ${this.name} помер від недбалості`;
            this.die();
        }
        if (this.health >= 50 && this.happiness >= 50){
            this.mood = "happy";
        }
    }
    status(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}, food: ${this.food}, Mood: ${this.mood}, Happiness: ${this.happiness}, Health: ${this.health}, Alive: ${this.alive}`);
    }
}

export type {AnimalInterface};