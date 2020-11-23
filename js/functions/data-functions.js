import { renderToppings } from '../app.js';

const br = document.createElement("br");
const con = document.querySelector("#container");
let comparingArray = editItem;
let orderItemID;

export const pushOrderItem = (item) => {
    orderItems.push({
        itemID: orderItems.length,
        id: item.id,
        itemName: item.itemName,
        desc: item.desc,
        price: item.price,
        toppings: item.toppings
    });
}

export const removeToppingFromItem = (id) => {
    const ariaContainer = document.querySelector("#allToppingCon");
    const toppingIndex = editItem.findIndex((topping) => {
        return topping.id === id;
    });
    if (toppingIndex > -1) {
        editItem.splice(toppingIndex, 1);
    }
    con.removeChild(document.querySelector(".headerText"));
    con.removeChild(ariaContainer);
    con.removeChild(toppingButtonContainer);
    renderToppings(editItem);
}

export const getItem = (item) => {
    const cartList = document.querySelector("#cartList");
    con.removeChild(cartList);
    orderItemID = item.itemID;
    item.toppings.forEach((topping) => {
        editItem.push(topping);
    });
    renderToppings(editItem);
}