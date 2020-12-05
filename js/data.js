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