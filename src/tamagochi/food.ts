export interface foodInterface {
    name: string;
    amount : number;
    state: "one piece" | "liquid" | "many pieces";  
}

export class Food implements foodInterface {
    name: string;
    amount: number;
    state: "one piece" | "liquid" | "many pieces";
    constructor(name: string,amount: number, state: "one piece" | "liquid" | "many pieces") {
        this.name = name;
        this.amount = amount;
        this.state = state;
    }
}