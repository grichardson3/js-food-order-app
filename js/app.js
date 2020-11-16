const br = document.createElement("br");
const con = document.querySelector("#container");
let comparingArray = editItem;
let orderItemID;

const pushOrderItem = (item) => {
    orderItems.push({
        itemID: orderItems.length,
        id: item.id,
        itemName: item.itemName,
        desc: item.desc,
        price: item.price,
        toppings: item.toppings
    });
}

const removeToppingFromItem = (id) => {
    const ariaContainer = document.querySelector("#toppingCon");
    const toppingIndex = editItem.findIndex((topping) => {
        return topping.id === id;
    });
    if (toppingIndex > -1) {
        editItem.splice(toppingIndex, 1);
    }
    con.removeChild(ariaContainer);
    renderToppings(editItem);
}

const renderToppings = (editItem) => {
    const toppingCon = document.createElement("div");
    const addTopping = document.createElement("button");
    const confirmTopping = document.createElement("button");
    confirmTopping.textContent = "Confirm";
    let toppingChoice = extraToppings[0].toppingName;

    toppingCon.setAttribute("id", "toppingCon");
    addTopping.textContent = "Add Topping";

    con.appendChild(toppingCon);
    editItem.forEach((topping) => {
        const toppingText = document.createElement("small");
        const removeToppingButton = document.createElement("button");
        const br = document.createElement("br");
        toppingText.textContent = topping.topping;
        removeToppingButton.textContent = "Remove";
        toppingCon.appendChild(toppingText);
        toppingCon.appendChild(removeToppingButton);
        toppingCon.appendChild(br);

        removeToppingButton.addEventListener("click", (e) => {
            removeToppingFromItem(topping.id);
        });
    });

    confirmTopping.addEventListener("click", (e) => {
        orderItems[orderItemID].toppings = [];
        editItem.forEach((topping) => {
            orderItems[orderItemID].toppings.push(topping);
        });
        editItem = [];
        con.removeChild(toppingCon);
        renderCart(orderItems);
    });
    addTopping.addEventListener("click", (e) => {
        const selectTopping = document.createElement("select");
        const confirmAddTopping = document.createElement("button");
        selectTopping.textContent = "Select A Topping...";
        confirmAddTopping.textContent = "Add";
        con.appendChild(selectTopping);
        con.appendChild(confirmAddTopping);
        extraToppings.forEach((topping) => {
            const toppingItem = document.createElement("option");
            toppingItem.textContent = topping.toppingName;
            selectTopping.appendChild(toppingItem);
        });
        confirmAddTopping.addEventListener("click", (e) => {    
            // Validates if item is present in topping array,
            // then pushes to current topping array
            console.log(editItem);
            extraToppings.forEach((topping) => {
                if (toppingChoice == topping.toppingName) {
                    editItem.push({
                        id: editItem.length,
                        topping: topping.toppingName
                    });
                }
            });
            con.removeChild(toppingCon);
            con.removeChild(selectTopping);
            con.removeChild(confirmAddTopping);
            renderToppings(editItem);
        });
        selectTopping.addEventListener("change", (e) => {
            toppingChoice = e.target.value;
        });
    });
    toppingCon.appendChild(addTopping);
    console.log("comparingArray: ", comparingArray);
    console.log("editItem: ", editItem);
    if (editItem !== comparingArray) {
        toppingCon.appendChild(confirmTopping);
    }
}

const getItem = (item) => {
    const cartList = document.querySelector("#cartList");
    con.removeChild(cartList);
    orderItemID = item.itemID;
    item.toppings.forEach((topping) => {
        editItem.push(topping);
    });
    renderToppings(editItem);
}

const renderCartIcon = (orderItems) => {
    const cartButton = document.querySelector("#checkout");
    cartButton.textContent = orderItems.length + " Cart";
    console.log("clicked");
}

const confirmOrder = (orderItems) => {
    const confirmOrderContainer = document.createElement("div");
    const confirmOrderHeading = document.createElement("h2");
    const confirmOrderSubHeading = document.createElement("h3");

    confirmOrderHeading.textContent = "Congratulations!";
    confirmOrderSubHeading.textContent = "Thank you for placing your order with us!";
    con.removeChild(checkoutList);
    con.appendChild(confirmOrderContainer);
    confirmOrderContainer.appendChild(confirmOrderHeading);
    confirmOrderContainer.appendChild(confirmOrderSubHeading);

    // Add current order to queue
    orderQueue.push({
        orderID: orderQueue.length,
        orderStatus: orderItems,
    });
}

const renderItems = (foodItems) => {
    const foodList = document.createElement("ul");
    foodList.setAttribute("id", "foodItems");
    con.appendChild(foodList);
    const appTitle = document.createElement("h1");
    appTitle.textContent = "Food Order App";
    foodList.appendChild(appTitle);
    foodItems.forEach((item) => {
        const itemRender = document.createElement("p");
        const toppingList = document.createElement("div");
        const addItem = document.createElement("button");
        itemRender.textContent = item.itemName + " - $" + item.price;
        addItem.textContent = "Add Item";
        toppingList.setAttribute("class", "topping-list");

        addItem.addEventListener("click", () => {
            pushOrderItem(item);
            renderCartIcon(orderItems);
        });

        foodList.appendChild(itemRender);
        foodList.appendChild(toppingList);
        foodList.appendChild(addItem);
    });

    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "Cart";
    checkoutButton.setAttribute("id", "checkout");
    con.appendChild(checkoutButton);
    if (orderItems.length > 0) {
        checkoutButton.textContent = orderItems.length + " Cart";
    }
    document.querySelector("#checkout").addEventListener("click", (e) => {
        if (orderItems.length > 0) {
            renderCart(orderItems);
        } else {
            const errorMsg = document.createElement("small");
            errorMsg.setAttribute("id", "errorMsg");
            const msgCheck = document.querySelector("#errorMsg");
            errorMsg.textContent = "Please add items in order to checkout";
            if (!msgCheck) {
                con.append(br);
                con.append(errorMsg);
            }
        }
    });
}

const renderCart = (orderItems) => {
    const cartList = document.createElement("div");
    const cartText = document.createElement("h1");
    const foodList = document.querySelector("#foodItems");
    const checkoutButton = document.querySelector("#checkout");
    const errorMsg = document.querySelector("#errorMsg");
    const renderTotal = document.createElement("p");
    const finalizeOrderButton = document.createElement("button");
    const backButton = document.createElement("button");
    let totalCost = 0;
    editItem = [];

    cartList.setAttribute("id", "cartList");
    cartText.textContent = "Cart";
    finalizeOrderButton.textContent = "Finalize Order";
    backButton.textContent = "Back";

    con.appendChild(cartList);
    cartList.appendChild(cartText);
    
    orderItems.forEach((item) => {
        const orderItem = document.createElement("p");
        const editItemButton = document.createElement("button");
        orderItem.textContent = item.itemName + " - $" + item.price;
        editItemButton.textContent = "Edit Item";
        cartList.appendChild(orderItem);
        cartList.appendChild(editItemButton);

        editItemButton.addEventListener("click", (e) => {
            getItem(item);
        });

        totalCost = totalCost + item.price;
    });

    finalizeOrderButton.addEventListener("click", (e) => {
        renderCheckout(orderItems);
    });
    backButton.addEventListener("click", (e) => {
        con.removeChild(document.querySelector("#cartList"));
        renderItems(foodItems);
    });

    if (checkoutButton) {
        con.removeChild(checkoutButton);
    }
    if (document.querySelector("#orderList")) {
        con.removeChild(document.querySelector("#orderList"));
    }
    if (errorMsg) {
        con.removeChild(errorMsg);
    }
    if (foodList) {
        document.querySelector("#container").removeChild(foodList);
    }

    renderTotal.textContent = `Total: $${totalCost}`;
    cartList.appendChild(renderTotal);
    cartList.appendChild(finalizeOrderButton);
    cartList.appendChild(backButton);

}

const checkCoupon = (couponValue, totalCost) => {
    const checkoutList = document.querySelector("#checkoutList");
    const totalPriceText = document.querySelector("#totalPriceText");
    const couponCodeStatus = document.createElement("p");
    couponCodeStatus.setAttribute("id", "couponCodeStatus");
    couponCodes.forEach((code) => {
        if (couponValue == code.couponName) {
            couponCodeStatus.textContent = "Coupon code successfully activated!";
            if (!document.querySelector("#couponCodeStatus")) {
                checkoutList.appendChild(couponCodeStatus);
            } else {
                checkoutList.removeChild(document.querySelector("#couponCodeStatus"));
                checkoutList.appendChild(couponCodeStatus);
            }
            totalCost = totalCost - code.priceReduction;
        } else {
            couponCodeStatus.textContent = "Coupon code invalid";
            if (!document.querySelector("#couponCodeStatus")) {
                checkoutList.appendChild(couponCodeStatus);
            } else {
                checkoutList.removeChild(document.querySelector("#couponCodeStatus"));
                checkoutList.appendChild(couponCodeStatus);
            }
        }
    });
    totalPriceText.textContent = "Total: $" + totalCost;
}

const renderCheckout = (orderItems) => {
    const checkoutList = document.createElement("div");
    const checkoutText = document.createElement("h1");
    const totalPriceText = document.createElement("h2");
    const couponForm = document.createElement("form");
    const couponInput = document.createElement("input");
    const couponSubmit = document.createElement("button");
    const cartList = document.querySelector("#cartList");
    const confirmOrderButton = document.createElement("button");
    const backButton = document.createElement("button");
    let totalCost = 0;

    checkoutList.setAttribute("id", "checkoutList");
    totalPriceText.setAttribute("id", "totalPriceText");
    couponInput.setAttribute("id", "couponInput");
    checkoutText.textContent = "Checkout";
    couponSubmit.textContent = "Submit Code";
    confirmOrderButton.textContent = "Place Order";
    backButton.textContent = "Back";

    con.removeChild(cartList);

    con.appendChild(checkoutList);
    checkoutList.appendChild(checkoutText);

    orderItems.forEach((item) => {
        const itemNameText = document.createElement("h3");
        const itemPriceText = document.createElement("h4");
        itemNameText.textContent = item.itemName;
        itemPriceText.textContent = item.price;
        checkoutList.appendChild(itemNameText);
        checkoutList.appendChild(itemPriceText);
        item.toppings.forEach((topping) => {
            const itemToppingText = document.createElement("small");
            itemToppingText.textContent = topping.topping + ", ";
            checkoutList.appendChild(itemToppingText);
        });
        totalCost = totalCost + item.price;
    });
    totalPriceText.textContent = "Total: $" + totalCost;

    checkoutList.appendChild(br);
    checkoutList.appendChild(br);
    checkoutList.appendChild(couponForm);
    couponForm.appendChild(couponInput);
    couponForm.appendChild(couponSubmit);
    checkoutList.appendChild(totalPriceText);
    checkoutList.appendChild(confirmOrderButton);
    checkoutList.appendChild(backButton);

    couponForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const couponValue = couponInput.value;
        checkCoupon(couponValue, totalCost);
    });

    backButton.addEventListener("click", (e) => {
        con.removeChild(checkoutList);
        renderCart(orderItems);
    });

    confirmOrderButton.addEventListener("click", (e) => {
        confirmOrder(orderItems);
    });
}

renderItems(foodItems);