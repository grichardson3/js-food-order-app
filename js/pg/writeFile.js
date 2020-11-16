"use strict";

let file = require("file-system");
const fs = require('fs'),
jsonData = JSON.stringify(foodItems);

fs.writeFile('json/newFile.json', jsonData, (err) => {
    if (err) {
        console.log(err);
    }
});