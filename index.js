const SIDES = ['LEFT', 'RIGTH'];
const TABLE_SIZE = { x: 5, y: 5 };

const DIRECTIONS = {
    north: {
        step: 1,
        left: 'west',
        right: 'east',
    },
    south: {
        step: -1,
        left: 'east',
        right: 'west'
    },
    west: {
        step: -1,
        left: 'south',
        right: 'north'
    },
    east: {
        step: 1,
        left: 'north',
        right: 'south'
    },
};

class Robot {
    constructor() {
        this.position = {
            x: null,
            y: null,
        };

        this.direction = null;
        this.isPlaced = false;
    }

    place(x, y, direction) {
        if (x > TABLE_SIZE.x || y > TABLE_SIZE.y) {
            console.info('Out of table');
            this.isPlaced = false;
            return;
        }

        this.position = { x, y };
        this.direction = direction;
        this.isPlaced = true;
    }

    report() {
        if (!this.isPlaced) {
            console.log('Robot has not been placed');
            return;
        }
        
        console.log('');
        console.log([this.position.x, this.position.y, this.direction.toUpperCase()].join(','));
        console.log('');
    }

    isPositionCorrect(coordinates) {
        const isXCorrect = coordinates.x < TABLE_SIZE.y && coordinates.x < TABLE_SIZE.x && coordinates.x >= 0;
        const isYCorrect = coordinates.y < TABLE_SIZE.y && coordinates.y < TABLE_SIZE.x && coordinates.y >= 0;
        
        return isXCorrect && isYCorrect;
    }

    move() {
        if (!this.isPlaced) {
            console.log('Robot has not been placed');
            return;
        }

        let newPosition = { x: this.position.x, y: this.position.y };

        const step = DIRECTIONS[this.direction].step;
        const isWestOrEast = this.direction == 'west' || this.direction == 'east';

        isWestOrEast ? newPosition.x += step :  newPosition.y += step;

        if (this.isPositionCorrect(newPosition)) {
            this.position = newPosition;
        }
    }

    rotate(side) {
        if (!this.isPlaced) {
            console.log('Robot has not been placed');
            return;
        }

        const facingDirection = DIRECTIONS[this.direction][side];
        if (facingDirection) {
            this.direction = facingDirection;
        }
    }
}

const robot = new Robot();
robot.place(1, 2, 'east');

robot.move();
robot.move();
robot.rotate('left');
robot.move();

robot.report();
