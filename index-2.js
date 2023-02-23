// it crashes because y = 1 in both nodes and 2 > 1 and direction is 90
// it crashes y > maxY && x > minX && x < maxX && direction === 90
// it crashes x > maxX && y > minY && y < maxY && and direction === 180
// it crashes y < minY && x > minX && x < maxX && direction === 270
// it crashes x < minX && y > minY && y < maxY && direction === 0

const instructionsNormal = [1, 2, 4];
const instructionsClash = [1, 2, 4, 1, 5];

console.log(robotWalk(instructionsNormal));
console.log(robotWalk(instructionsClash));

function robotWalk(instructions) {
    const coordinates = {
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0,
        currentDirection: 90
    }
    const currentPoint = {x: 0, y: 0};
    for (let index = 0; index < instructions.length; index++) {
        updateCurrentPoint(currentPoint, instructions[index], coordinates.currentDirection);
        if (isClash(currentPoint, coordinates) && index > 2) {
            return getClashResult(currentPoint, coordinates)
        }
        updateCoordinates(coordinates, currentPoint);
    }

    return Object.values(currentPoint);
}

function updateCurrentPoint(currentPoint, instruction, direction) {
    if (direction === 90) {
        currentPoint.y = currentPoint.y + instruction;
    } else if (direction === 180) {
        currentPoint.x = currentPoint.x + instruction;
    } else if (direction === 270) {
        currentPoint.y = currentPoint.y - instruction;
    } else if (direction === 0) {
        currentPoint.x = currentPoint.x - instruction;
    }
}

function isClash(currentPoint, coordinates) {
    //y > maxY && x > minX && x < maxX && direction === 90
    if (coordinates.currentDirection === 90 && currentPoint.y > coordinates.maxY && currentPoint.x > coordinates.minX && currentPoint.x < coordinates.maxX) {
        return true;
    }
    //x > maxX && y > minY && y < maxY && and direction === 180
    if (coordinates.currentDirection === 180 && currentPoint.x > coordinates.maxX && currentPoint.y > coordinates.minY && currentPoint.y < coordinates.maxY) {
        return true;
    }
    //y < minY && x > minX && x < maxX && direction === 270
    if (coordinates.currentDirection === 270 && currentPoint.y < coordinates.minY && currentPoint.x > coordinates.minX && currentPoint.x < coordinates.maxX) {
        return true;
    }
    //x < minX && y > minY && y < maxY && direction === 0
    if (coordinates.currentDirection === 0 && currentPoint.x < coordinates.minX && currentPoint.y > coordinates.minY && currentPoint.y < coordinates.maxY) {
        return true;
    }

    return false;
}

function getClashResult(currentPoint, coordinates) {
    let x = currentPoint.x;
    let y = currentPoint.y;
    if (coordinates.currentDirection === 90 && currentPoint.y > coordinates.maxY && currentPoint.x > coordinates.minX && currentPoint.x < coordinates.maxX) {
        y = coordinates.maxY;
    }
    //x > maxX && y > minY && y < maxY && and direction === 180
    if (coordinates.currentDirection === 180 && currentPoint.x > coordinates.maxX && currentPoint.y > coordinates.minY && currentPoint.y < coordinates.maxY) {
        x = coordinates.maxX;
    }
    //y < minY && x > minX && x < maxX && direction === 270
    if (coordinates.currentDirection === 270 && currentPoint.y < coordinates.minY && currentPoint.x > coordinates.minX && currentPoint.x < coordinates.maxX) {
        y = coordinates.minY;
    }
    //x < minX && y > minY && y < maxY && direction === 0
    if (coordinates.currentDirection === 360 && currentPoint.x < coordinates.minX && currentPoint.y > coordinates.minY && currentPoint.y < coordinates.maxY) {
        x = coordinates.minX;
    }

    return [x, y];
}

function updateCoordinates(coordinates, currentPoint) {


    if (coordinates.currentDirection === 90) {
        coordinates.maxY = Math.max(currentPoint.y, coordinates.maxY);
    } else if (coordinates.currentDirection === 180) {
        coordinates.maxX = Math.max(currentPoint.x, coordinates.maxX);
    } else if (coordinates.currentDirection === 270) {
        coordinates.minY = Math.min(coordinates.minY, currentPoint.y);
    } else if (coordinates.currentDirection === 0) {
        coordinates.minX = Math.min(currentPoint.x, coordinates.minX);
    }
    coordinates.currentDirection = (coordinates.currentDirection + 90) % 360;
}

