let foodItems = [{
    id: 0,
    itemName: 'Cheeseburger',
    itemImgURL: 'img/cheeseburger.jpg',
    price: 12.99,
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    toppings: [{
        id: 0,
        topping: "topping1"
    },{
        id: 1,
        topping: "topping2"
    },{
        id: 2,
        topping: "topping3"
    }]
}, {
    id: 1,
    itemName: 'Hamburger',
    itemImgURL: 'img/hamburger.jpg',
    price: 12.99,
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    toppings: [{
        id: 0,
        topping: "topping4"
    },{
        id: 1,
        topping: "topping5"
    },{
        id: 2,
        topping: "topping6"
    }]
}, {
    id: 2,
    itemName: 'Salad',
    itemImgURL: 'img/salad.jpg',
    price: 8.99,
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    toppings: [{
        id: 0,
        topping: "topping4"
    },{
        id: 1,
        topping: "topping5"
    },{
        id: 2,
        topping: "topping6"
    }]
}];

let extraToppings = [{
    id: 0,
    toppingName: "extratopping0",
    extraPrice: 0.99
}, {
    id: 1,
    toppingName: "extratopping1",
    extraPrice: 2.99,
}, {
    id: 2,
    toppingName: "extratopping2",
    extraPrice: 1.99
}];

const couponCodes = [{
    couponName: "5OFF",
    priceReduction: 5,
}];

let orderItems = Array();
let editItem = Array();
let orderQueue = Array();

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

        toppingCon.setAttribute("class", "col-xs-12 col-sm-6 col-md-3 col-lg-2 toppingCon");
        removeToppingButton.setAttribute("class", "removeToppingButton");
        
        allToppingCon.appendChild(toppingCon);
        toppingCon.appendChild(toppingText);
        toppingCon.appendChild(removeToppingButton);

        removeToppingButton.addEventListener("click", (e) => {
            removeToppingFromItem(topping.id);
        });

        removeToppingButton.addEventListener("mouseover", (e) => {
            gsap.to(removeToppingButton, {duration: .3, ease: "ease.in", opacity: .7});
        });

        removeToppingButton.addEventListener("mouseout", (e) => {
            gsap.to(removeToppingButton, {duration: .3, ease: "ease.in", opacity: 1});
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
                if (toppingChoice === topping.toppingName) {
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

const renderCartIcon = () => {
    const cartButton = document.querySelector("#cartArea img");
    cartButton.removeAttribute("src");
    cartButton.setAttribute("src", "img/icon/shopping-cart-valid.png");
}

const confirmOrder = (orderItems) => {
    const confirmOrderContainer = document.createElement("div");
    const confirmOrderHeading = document.createElement("h2");
    const confirmOrderSubHeading = document.createElement("h3");
    const makeAnotherOrder = document.createElement("a");
    const header = document.querySelector("header");
    const cartButton = document.querySelector("#cartArea");

    makeAnotherOrder.setAttribute("href", "./order.html");

    confirmOrderHeading.textContent = "Congratulations!";
    confirmOrderSubHeading.textContent = "Thank you for placing your order with us!";
    makeAnotherOrder.textContent = "Place Another Order";

    header.removeChild(cartButton);
    con.removeChild(checkoutList);
    con.appendChild(confirmOrderContainer);
    confirmOrderContainer.appendChild(confirmOrderHeading);
    confirmOrderContainer.appendChild(confirmOrderSubHeading);
    confirmOrderContainer.appendChild(makeAnotherOrder);

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

        itemImg.setAttribute("class", "itemImg");
        itemImg.setAttribute("style", 
            `background-image: url("${item.itemImgURL}");
            height: 300px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;`
        );
        itemRenderCon.setAttribute("class", "itemTextCon");
        itemRenderName.setAttribute("class", "itemNameText");
        itemRenderPrice.setAttribute("class", "itemPriceText");
        addItem.setAttribute("class", "btn btn-success addItemButton");
        containerColumn.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 itemContainer");
        
        itemRenderName.textContent = item.itemName;
        itemRenderPrice.textContent = "$" + item.price;
        addItem.textContent = "Add Item";

        foodList.appendChild(containerColumn);

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

    const cartButton = document.querySelector("#cartArea img");

    cartButton.addEventListener("click", (e) => {
        if (orderItems.length > 0) {
            const cartList = document.querySelector("#cartList");
            if (!cartList) {
                renderCart(orderItems);
            }
        } else {
            gsap.to(cartButton, {duration: .1, ease: "ease.out", rotation: -20});
            gsap.to(cartButton, {delay: .1, duration: .5, ease: "bounce.out", rotation: 0});
        }
    });

    // Helps with issue for cart button losing opacity after clicking in mobile
    if (window.innerWidth >= 768) {
        cartButton.addEventListener("mouseover", (e) => {
            gsap.to(cartButton, {duration: .3, ease: "ease.in", opacity: .7});
        });
        cartButton.addEventListener("mouseout", (e) => {
            gsap.to(cartButton, {duration: .3, ease: "ease.in", opacity: 1});
        });
    }
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
    editItem = new Array();

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

    if (document.querySelector('#checkoutList')) {
        con.removeChild(document.querySelector('#checkoutList'));
        con.removeChild(document.querySelector('#checkoutSummaryContainer'));
        con.removeChild(document.querySelector('.headerText'));
    }

    if (document.querySelector("#allToppingCon")) {
        con.removeChild(document.querySelector('.headerText'));
        con.removeChild(document.querySelector('#allToppingCon'));
        con.removeChild(document.querySelector('#toppingButtonContainer'));
        if (document.querySelector('.confirmAddToppingButton')) {
            con.removeChild(document.querySelector('.form-control'));
            con.removeChild(document.querySelector('.confirmAddToppingButton'));
        }
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
        if (couponValue === code.couponName) {
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
    couponSubmit.setAttribute("disabled", "");
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
        itemPriceText.textContent = "$" + item.price;

        checkoutListItem.setAttribute("class", "checkoutListItem");

        checkoutList.appendChild(checkoutListItem);
        checkoutListItem.appendChild(itemNameText);
        checkoutListItem.appendChild(itemPriceText);

        item.toppings.forEach((topping) => {
            const itemToppingText = document.createElement("small");
            if ((topping.id + 1) === item.toppings.length) {
                itemToppingText.textContent = topping.topping;
            } else {
                itemToppingText.textContent = topping.topping + ", ";
            }
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

    couponInput.addEventListener("input", (e) => {
        if (e.target.value !== "") {
            couponSubmit.removeAttribute("disabled");
        } else {
            couponSubmit.setAttribute("disabled", "");
        }
    });

    backButton.addEventListener("click", (e) => {
        con.removeChild(checkoutText);
        con.removeChild(checkoutList);
        con.removeChild(checkoutSummaryContainer);
        renderCart(orderItems);
    });

    confirmOrderButton.addEventListener("click", (e) => {
        con.removeChild(checkoutText);
        con.removeChild(checkoutSummaryContainer);
        confirmOrder(orderItems);
    });
}

renderItems(foodItems);