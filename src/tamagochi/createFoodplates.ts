import { FoodPlate } from "./foodPlates";

export function createFoodplates(): FoodPlate[] {
    const foodPlate1 = new FoodPlate("кошик для їжі", "many pieces");
    const foodPlate2 = new FoodPlate("Миска для води", "liquid");
    const foodPlate3 = new FoodPlate("Миска для їжі", "one piece");
    return [foodPlate1, foodPlate2, foodPlate3];
}