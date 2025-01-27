import { Animal, type AnimalInterface } from './animal.ts';

export function createAnimal(name: string): AnimalInterface {
    return new Animal(name);
}


