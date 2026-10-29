const fs = require("fs");
const buf = fs.readFileSync("public/mahi-ta-mera.m4a");
console.log("Hex:", buf.subarray(0, 32).toString("hex"));
console.log("Text:", buf.subarray(0, 32).toString("latin1").replace(/[\x00-\x1f]/g, "."));

