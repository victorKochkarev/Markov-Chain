var fs = require('fs');
var http = require('http');


//Getting input text
var inputText = fs.readFileSync("input.txt", "utf8");

//Building the network

console.log("Building the network");
var words = inputText.split(" ");
for(var i = 0; i < words.length; i++){
    var aWord = words[i];
    if(app.cursor == null){
        app.cursor = app.getNodeByValue(aWord);
    }else{
        app.cursor = app.cursor.addValueConnection(aWord);
    }
}
console.log("BigramNetwork is done");


http.createServer(function (req, res) {
    //Printing output
    var result = "";
    var workdCounter = 0;
    app.cursor = app.nodeList[0];
    while(app.cursor != null && workdCounter < 1000){
        workdCounter++;
        result += " "+app.cursor.value;
        app.cursor = app.cursor.getNextNode();
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(result);
}).listen(1337, '10.0.1.29');