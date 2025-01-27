import { Animal, type AnimalInterface } from './animal.ts';
import { type FoodPlateInterface } from "./foodPlates";

export function createAnimal(name: string, nearbyPlates:FoodPlateInterface[]): AnimalInterface {
    return new Animal(name, nearbyPlates);
}


