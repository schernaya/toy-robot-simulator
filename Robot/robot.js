import { DIRECTION, DIRECTIONS, TABLE_SIZE, CHARACTERS } from '../common/constants/constants.js';

class Robot {
  constructor() {
    this.position = {
      x: null,
      y: null,
    };

    this.direction = null;
    this.isPlaced = false;
  }

  place(positionParams) {
    const [x, y, direction] = positionParams;

    if (x > TABLE_SIZE.x || y > TABLE_SIZE.y) {
      this.isPlaced = false;
      return;
    }

    this.position = { x, y };
    this.direction = direction;
    this.isPlaced = true;
  }

  report() {
    if (!this.isPlaced) {
      return;
    }

    console.log([this.position.x, this.position.y, this.direction.toUpperCase()].join(CHARACTERS.COMMA));
  }

  isPositionCorrect(coordinates) {
    const isXCorrect = coordinates.x < TABLE_SIZE.y && coordinates.x < TABLE_SIZE.x && coordinates.x >= 0;
    const isYCorrect = coordinates.y < TABLE_SIZE.y && coordinates.y < TABLE_SIZE.x && coordinates.y >= 0;

    return isXCorrect && isYCorrect;
  }

  move() {
    if (!this.isPlaced) {
      return;
    }

    let newPosition = { x: this.position.x, y: this.position.y };

    const step = DIRECTION[this.direction].step;
    const isWestOrEast = this.direction == DIRECTIONS.west || this.direction == DIRECTIONS.east;

    isWestOrEast ? newPosition.x += step : newPosition.y += step;

    if (this.isPositionCorrect(newPosition)) {
      this.position = newPosition;
    }
  }

  left() {
    if (!this.isPlaced) {
      return;
    }
    this.direction = DIRECTION[this.direction].left;
  }

  right() {
    if (!this.isPlaced) {
      return;
    }
    this.direction = DIRECTION[this.direction].right;
  }

  executeCommands(commands) {
    for (const command of commands) {
      this[command.command](command.arguments);
    }
  }
}

export default Robot;
