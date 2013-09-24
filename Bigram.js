function BigramNetwork(){
    this.nodeList = [];
    this.cursor = null;
}

BigramNetwork.prototype.getNodeByValue = function(value){
    var result = null;
    for(var i = 0; i < this.nodeList.length; i++){
        var aNode = this.nodeList[i];
        if(aNode.value === value){
            result = aNode;
            break;
        }
    }
    if(result == null){
        result = new BigramNode(value, this);
        this.nodeList.push(result);
    }
    return result;
}




function BigramNode(value, network){
    this.value = value;
    this.connectionList = [];
    this.totalConnectionWeight = 0;
    this.network = network;
}

BigramNode.prototype.addValueConnection = function(value){
    this.totalConnectionWeight++;
    //Getting node value
    var nodeToAdd = this.network.getNodeByValue(value);
    var isNodeFound = false;

    for(var i = 0; i < this.connectionList.length; i++){
        var aConnection = this.connectionList[i];
        if(nodeToAdd == aConnection.node){
            //connection found
            aConnection.addWeight();
            isNodeFound = true;
            break;
        }
    }

    if(isNodeFound == false){
        var newConnection = new BigramConnection(nodeToAdd);
        this.connectionList.push(newConnection);
    }

    return nodeToAdd;
}

BigramNode.prototype.getNextNode = function(){
    var result = null;
    if(this.totalConnectionWeight > 0){
        var randomWeightValue = Math.floor(Math.random() * this.totalConnectionWeight + 1);
        var currentWeightCounter = 0;
        for(var i = 0; i < this.connectionList.length; i++){
            var aConnection = this.connectionList[i];
            currentWeightCounter += aConnection.weight;
            if(randomWeightValue <= currentWeightCounter){
                result = aConnection.node;
                break;
            }
        }
    }
    return result;
}


function BigramConnection(node){
    this.node = node;
    this.weight = 1;
}

BigramConnection.prototype.addWeight = function(){
    this.weight++;
}