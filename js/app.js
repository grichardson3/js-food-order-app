const br = document.createElement("br");
const con = document.querySelector("#container");
let comparingArray = editItem;
let orderItemID;

import { pushOrderItem, removeToppingFromItem } from './functions/data-functions.js';

const getItem = (item) => {
    orderItemID = item.itemID;
    item.toppings.forEach((topping) => {
        editItem.push(topping);
    });
    renderToppings(editItem);
}

export const renderToppings = (editItem) => {
    const toppingHeaderText = document.createElement("h1");
    const allToppingCon = document.createElement("div");
    const toppingButtonContainer = document.createElement("div");
    const addTopping = document.createElement("button");
    const confirmTopping = document.createElement("button");
    let toppingChoice = extraToppings[0].toppingName;

    toppingHeaderText.textContent = "Edit Item";
    addTopping.textContent = "Add Topping";
    confirmTopping.textContent = "Confirm";

    allToppingCon.setAttribute("id", "allToppingCon");
    allToppingCon.setAttribute("class", "row");
    toppingHeaderText.setAttribute("class", "headerText");
    toppingButtonContainer.setAttribute("id", "toppingButtonContainer");
    addTopping.setAttribute("class", "btn btn-primary addToppingButton");
    confirmTopping.setAttribute("class", "btn btn-success confirmToppingButton");

    con.appendChild(toppingHeaderText);
    con.appendChild(allToppingCon);
    con.appendChild(toppingButtonContainer);

    editItem.forEach((topping) => {
        const toppingCon = document.createElement("div");
        const toppingText = document.createElement("span");
        const removeToppingButton = document.createElement("div");

        toppingText.textContent = topping.topping;
        removeToppingButton.textContent = "X";

        toppingCon.setAttribute("class", "col-xs-12 col-sm-6 col-md-3 toppingCon");
        removeToppingButton.setAttribute("class", "removeToppingButton");
        
        allToppingCon.appendChild(toppingCon);
        toppingCon.appendChild(toppingText);
        toppingCon.appendChild(removeToppingButton);

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
        con.removeChild(toppingHeaderText);
        con.removeChild(allToppingCon);
        con.removeChild(toppingButtonContainer);
        renderCart(orderItems);
    });

    addTopping.addEventListener("click", (e) => {
        const selectTopping = document.createElement("select");
        const confirmAddTopping = document.createElement("button");

        selectTopping.textContent = "Select A Topping...";
        confirmAddTopping.textContent = "Add";

        selectTopping.setAttribute("class", "form-control");
        confirmAddTopping.setAttribute("class", "btn btn-success confirmAddToppingButton");

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
            extraToppings.forEach((topping) => {
                if (toppingChoice == topping.toppingName) {
                    editItem.push({
                        id: editItem.length,
                        topping: topping.toppingName
                    });
                }
            });
            con.removeChild(allToppingCon);
            con.removeChild(toppingHeaderText);
            con.removeChild(toppingButtonContainer);
            con.removeChild(selectTopping);
            con.removeChild(confirmAddTopping);
            renderToppings(editItem);
        });

        selectTopping.addEventListener("change", (e) => {
            toppingChoice = e.target.value;
        });
    });

    toppingButtonContainer.appendChild(addTopping);

    if (editItem !== comparingArray) {
        toppingButtonContainer.appendChild(confirmTopping);
    }
}

const renderCartIcon = (orderItems) => {
    const cartButton = document.querySelector("#cartArea img");
    cartButton.removeAttribute("src");
    cartButton.setAttribute("src", "img/icon/shopping-cart-valid.png");
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
    const foodList = document.createElement("div");
    foodList.setAttribute("class", "row");
    foodList.setAttribute("id", "foodItems");
    con.appendChild(foodList);
    foodItems.forEach((item) => {
        const itemImg = document.createElement("div");
        const itemRenderCon = document.createElement("div");
        const itemRenderName = document.createElement("span");
        const itemRenderPrice = document.createElement("span");
        const addItem = document.createElement("button");
        const containerColumn = document.createElement("div");
        const br = document.createElement("br");
        itemImg.setAttribute("class", "itemImg");
        itemImg.setAttribute("style", 
            `background-image: url("${item.itemImgURL}"); height: 300px; background-position: center; background-repeat: no-repeat; background-size: cover;`
        );
        // console.log(item.itemImgURL);
        itemRenderCon.setAttribute("class", "itemTextCon");
        itemRenderName.setAttribute("class", "itemNameText");
        itemRenderPrice.setAttribute("class", "itemPriceText");
        addItem.setAttribute("class", "btn btn-success addItemButton");
        containerColumn.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 itemContainer");
        foodList.appendChild(containerColumn);
        itemRenderName.textContent = item.itemName;
        itemRenderPrice.textContent = "$" + item.price;
        addItem.textContent = "Add Item";

        addItem.addEventListener("click", () => {
            gsap.to(itemRenderName, {duration: .05, ease: "none", color: "#28a745"});
            gsap.to(itemRenderPrice, {duration: .05, ease: "none", color: "#28a745"});
            gsap.to(itemRenderName, {delay: .05, duration: 2, ease: "none", color: "black"});
            gsap.to(itemRenderPrice, {delay: .05, duration: 2, ease: "none", color: "black"});
            pushOrderItem(item);
            renderCartIcon(orderItems);
        });

        addItem.addEventListener("mouseover", () => {
            gsap.to(itemImg, {duration: .3, ease: "ease.out", opacity: .85});
        });

        addItem.addEventListener("mouseout", () => {
            gsap.to(itemImg, {duration: .3, ease: "ease.out", opacity: 1});
        });

        containerColumn.appendChild(itemImg);
        containerColumn.appendChild(itemRenderCon);
        itemRenderCon.appendChild(itemRenderName);
        itemRenderCon.appendChild(itemRenderPrice);
        containerColumn.appendChild(addItem);
    });

    const checkoutButton = document.querySelector("#cartArea");
    const cartButton = document.querySelector("#cartArea img");

    checkoutButton.addEventListener("click", (e) => {
        if (orderItems.length > 0) {
            const cartList = document.querySelector("#cartList");
            if (!cartList) {
                renderCart(orderItems);
            }
        } else {
            console.log("No items in cart");
            // Do Greensock Animation here where the cart icon wiggles
            gsap.to(cartButton, {duration: .1, ease: "ease.out", rotation: -20});
            gsap.to(cartButton, {delay: .1, duration: .5, ease: "bounce.out", rotation: 0});
        }
    });
    checkoutButton.addEventListener("mouseover", (e) => {
        gsap.to(cartButton, {duration: .3, ease: "ease.in", opacity: .7});
    });
    checkoutButton.addEventListener("mouseout", (e) => {
        gsap.to(cartButton, {duration: .3, ease: "ease.in", opacity: 1});
    });
}

const renderCart = (orderItems) => {
    const cartList = document.createElement("div");
    const cartItemColumn = document.createElement("div");
    const totalCheckoutColumn = document.createElement("div");
    const cartText = document.createElement("h1");
    const foodList = document.querySelector("#foodItems");
    const checkoutButton = document.querySelector("#checkout");
    const errorMsg = document.querySelector("#errorMsg");
    const renderTotal = document.createElement("h3");
    const finalizeOrderButton = document.createElement("button");
    const backButton = document.createElement("button");
    let totalCost = 0;
    editItem = [];

    cartList.setAttribute("class", "row");
    cartList.setAttribute("id", "cartList");
    cartItemColumn.setAttribute("class", "col-xs-12 col-md-6");
    totalCheckoutColumn.setAttribute("class", "col-xs-12 col-md-6 finalizeOrderArea");
    cartText.setAttribute("class", "headerText");
    renderTotal.setAttribute("id", "totalCostText");
    finalizeOrderButton.setAttribute("class", "btn btn-success finalizeOrderButton");
    backButton.setAttribute("class", "btn btn-secondary backButton");

    cartText.textContent = "Cart";
    finalizeOrderButton.textContent = "Finalize Order";
    backButton.textContent = "Back";

    con.appendChild(cartText);
    con.appendChild(cartList);
    cartList.appendChild(cartItemColumn);
    cartList.appendChild(totalCheckoutColumn);
    
    orderItems.forEach((item) => {
        const cartItem = document.createElement("div");
        const orderItemName = document.createElement("span");
        const orderItemPrice = document.createElement("span");
        const editItemButton = document.createElement("button");
        const br = document.createElement("br");

        cartItem.setAttribute("class", "cartItem");
        editItemButton.setAttribute("class", "btn btn-success editItemButton");
        orderItemPrice.setAttribute("class", "orderItemPrice");
        orderItemName.textContent = item.itemName;
        orderItemPrice.textContent = "$" + item.price;
        editItemButton.textContent = "Edit Item";

        cartItemColumn.appendChild(cartItem);
        cartItem.appendChild(orderItemName);
        cartItem.appendChild(editItemButton);
        cartItem.appendChild(br);
        cartItem.appendChild(orderItemPrice);

        editItemButton.addEventListener("click", (e) => {     
            con.removeChild(cartText);
            con.removeChild(cartList);
            con.removeChild(backButton);
            getItem(item);
        });

        totalCost = totalCost + item.price;
    });

    finalizeOrderButton.addEventListener("click", (e) => {
        con.removeChild(cartText);
        con.removeChild(cartList);
        con.removeChild(backButton);
        renderCheckout(orderItems);
    });
    backButton.addEventListener("click", (e) => {
        con.removeChild(document.querySelector(".headerText"));
        con.removeChild(document.querySelector("#cartList"));
        con.removeChild(document.querySelector(".backButton"));
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
    cartList.appendChild(totalCheckoutColumn);
    totalCheckoutColumn.appendChild(renderTotal);
    totalCheckoutColumn.appendChild(finalizeOrderButton);
    con.appendChild(backButton);

}

const checkCoupon = (couponValue, totalCost) => {
    const totalPriceText = document.querySelector("#totalPriceText");
    const couponCodeStatus = document.createElement("p");
    const couponCodeCheckSummary = document.querySelector("#couponCodeStatus");

    couponCodeStatus.setAttribute("id", "couponCodeStatus");

    couponCodes.forEach((code) => {
        if (couponValue == code.couponName) {
            couponCodeStatus.textContent = "Coupon code successfully activated!";
            if (!couponCodeCheckSummary) {
                checkoutSummaryContainer.appendChild(couponCodeStatus);
            } else {
                checkoutSummaryContainer.removeChild(couponCodeCheckSummary);
                checkoutSummaryContainer.appendChild(couponCodeStatus);
            }
            totalCost = totalCost - code.priceReduction;
        } else {
            couponCodeStatus.textContent = "Coupon code invalid";
            if (!couponCodeCheckSummary) {
                checkoutSummaryContainer.appendChild(couponCodeStatus);
            } else {
                checkoutSummaryContainer.removeChild(couponCodeCheckSummary);
                checkoutSummaryContainer.appendChild(couponCodeStatus);
            }
        }
    });
    totalPriceText.textContent = "Total: $" + totalCost;
}

const renderCheckout = (orderItems) => {
    const checkoutList = document.createElement("div");
    const checkoutText = document.createElement("h1");

    const checkoutSummaryContainer = document.createElement("div");
    const totalPriceText = document.createElement("h2");
    const couponForm = document.createElement("form");
    const couponInput = document.createElement("input");
    const couponSubmit = document.createElement("button");
    const confirmOrderButton = document.createElement("button");
    const backButton = document.createElement("button");
    let totalCost = 0;

    checkoutText.textContent = "Checkout";
    couponSubmit.textContent = "Submit Code";
    confirmOrderButton.textContent = "Place Order";
    backButton.textContent = "Back";

    checkoutList.setAttribute("id", "checkoutList");
    checkoutText.setAttribute("class", "headerText");
    couponForm.setAttribute("id", "couponForm");
    couponInput.setAttribute("class", "form-control");
    couponSubmit.setAttribute("class", "btn btn-success couponSubmitButton");
    checkoutSummaryContainer.setAttribute("id", "checkoutSummaryContainer");
    totalPriceText.setAttribute("id", "totalPriceText");
    confirmOrderButton.setAttribute("class", "btn btn-success");
    confirmOrderButton.setAttribute("id", "placeOrderButton");
    backButton.setAttribute("class", "btn btn-secondary");
    couponInput.setAttribute("id", "couponInput");

    con.appendChild(checkoutText);
    con.appendChild(checkoutList);
    con.appendChild(checkoutSummaryContainer);

    orderItems.forEach((item) => {
        const checkoutListItem = document.createElement("div");
        const itemNameText = document.createElement("h3");
        const itemPriceText = document.createElement("h4");

        itemNameText.textContent = item.itemName;
        itemPriceText.textContent = item.price;

        checkoutListItem.setAttribute("class", "checkoutListItem");

        checkoutList.appendChild(checkoutListItem);
        checkoutListItem.appendChild(itemNameText);
        checkoutListItem.appendChild(itemPriceText);

        item.toppings.forEach((topping) => {
            const itemToppingText = document.createElement("small");
            itemToppingText.textContent = topping.topping + ", ";
            checkoutListItem.appendChild(itemToppingText);
        });
        totalCost = totalCost + item.price;
    });
    totalPriceText.textContent = "Total: $" + totalCost;

    checkoutSummaryContainer.appendChild(couponForm);
    couponForm.appendChild(couponInput);
    couponForm.appendChild(couponSubmit);
    checkoutSummaryContainer.appendChild(totalPriceText);
    checkoutSummaryContainer.appendChild(confirmOrderButton);
    checkoutSummaryContainer.appendChild(backButton);

    couponForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const couponValue = couponInput.value;
        checkCoupon(couponValue, totalCost);
    });

    backButton.addEventListener("click", (e) => {
        con.removeChild(checkoutText);
        con.removeChild(checkoutList);
        con.removeChild(checkoutSummaryContainer);
        renderCart(orderItems);
    });

    confirmOrderButton.addEventListener("click", (e) => {
        con.removeChild(checkoutText);
        // con.removeChild(errorMsg);
        con.removeChild(checkoutSummaryContainer);
        confirmOrder(orderItems);
    });
}

renderItems(foodItems);