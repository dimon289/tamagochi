import { Food } from './food';
export interface FoodPlateInterface {
    name: string;
    food: Food[];
    consolemessage: string;
    typeFoodCapacity:"liquid" | "one piece"| "many pieces";
    addFood(food: Food): void;
    removeFood(): void;
}

export class FoodPlate implements FoodPlateInterface {
    name: string;
    food: Food[] = [];
    consolemessage: string= '';
    
    typeFoodCapacity: "liquid" | "one piece" | "many pieces";
    constructor(name: string, typeFoodCapacity: "liquid" | "one piece" | "many pieces") {
        this.name = name;
        this.typeFoodCapacity = typeFoodCapacity;
    }
    addFood(food: Food) {
        this.consolemessage = "";
        if (this.typeFoodCapacity === food.state) {
            this.food.push(food);
        }
        else {
            this.consolemessage = "Ця тара не підходить для цієї їжі(води)";
        }
    }
    removeFood() {
        this.food = [];
    }
}