import { renderToppings } from '../app.js';

const br = document.createElement("br");
const con = document.querySelector("#container");
let comparingArray = editItem;
let orderItemID;

export const renderToppingButtons = () => {
    const toppingCon = document.createElement("div");
    const addTopping = document.createElement("button");
    const confirmTopping = document.createElement("button");
    let toppingChoice = extraToppings[0].toppingName;

    addTopping.textContent = "Add Topping";
    confirmTopping.textContent = "Confirm";
    toppingCon.setAttribute("id", "toppingCon");

    con.appendChild(toppingCon);
}