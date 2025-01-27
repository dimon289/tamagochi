import { Food } from "./food";
import { FoodPlate } from "./foodPlates";

export function addFoodtoPlates(plates: FoodPlate[], food: Food): void {
    plates.forEach(plate => {
        if (plate.typeFoodCapacity === food.state) {
            plate.addFood(food);
        }
    });
}
