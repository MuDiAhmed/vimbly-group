//loop through instructions
//build The Node class to track x, y
//build the isVisited check method

//Note: o(n) time, o(1) space
function robotWalk(instructions){
    const moves = new Map();
    const movesNode = new Map();
    let currentNode = new Node(0, 0);
    for(let index=0; index<instructions.length; index++){
        const currentInstruction = instructions[index];
        currentNode = createNode(currentNode, currentInstruction);
        movesNode.set(currentNode.x+""+currentNode.y, currentNode);
        addToMoved(moves, currentNode);

    }

    return currentNode;
}

function createNode(node, instruction){
    const direction = node.direction + 90;
    let x = node.x;
    let y = node.y;
    //TODO:: order of conditions have to be maintained because % 90 will be true for direction 360 as well
    //TODO:: fined a better solution
    if(direction % 270 === 0 ){
        y = node.y - instruction;
    }else if(direction % 360 === 0){
        x = node.x - instruction;
    }else if(direction % 180 === 0 ){
        x = node.x + instruction;
    }else if(direction % 90 === 0){
        y = node.y + instruction;
    }
    return new Node(x, y, direction);
}

function addToMoved(moves, node){
    const xKey = `x${node.x}`;
    const yKey = `y${node.y}`;
    if(!moves.has(xKey)){
        moves.set(xKey, 0);
    }
    if(!moves.has(yKey)){
        moves.set(yKey, 0);
    }
    moves.set(xKey, moves.get(xKey)+1);
    moves.set(yKey, moves.get(yKey)+1);
}

class Node{
    x;
    y;
    direction = 0;
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = (direction || this.direction) % 360;
    }
}

const instructions = [1, 2, 4, 1, 5];

console.log(robotWalk(instructions));

// (1, 2) is between (0,1) (2, 1)
// it crashes because y = 1 in both nodes and 2 > 1 and direction is 90
// it crashes newNode.y > oldNodes.y and direction === 90
// it crashes newNode.x > oldNodes.x and direction === 180
// it crashes newNode.y < oldNodes.y and direction === 270
// it crashes newNode.x < oldNodes.x and direction === 0