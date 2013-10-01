var fs = require('fs');
var http = require('http');
var bigram = require("./Bigram.js");


//Getting input text
var inputText = fs.readFileSync("input.txt", "utf8");

//Building the network

console.log("Building the network");

var network = new bigram.BigramNetwork();
network.buildNetworkUsingDataStringAndSeparator(inputText, " ");
console.log("BigramNetwork is done");
var node = network.cursor;
console.log(node.value);
node = node.getNextNode();
console.log(node.value);
