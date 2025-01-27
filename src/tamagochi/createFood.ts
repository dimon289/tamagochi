import { Food, foodInterface } from "./food";


export function createFood(name: string, amount: number, state: "one piece" | "liquid" | "many pieces"): Food {
    return new Food(name, amount, state);
}