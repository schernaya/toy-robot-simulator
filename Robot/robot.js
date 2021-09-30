import {
  DIRECTION,
  DIRECTIONS,
  CHARACTERS
} from '../common/constants/constants.js';
import {
  isCoordinatesCorrect,
  isXCoordinateCorrect,
  isYCoordinateCorrect,
  isDirectionCorrect,
} from '../validations/index.js';

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
    if (positionParams) {
      const [x, y, direction] = positionParams;

      const isXCorrect = isXCoordinateCorrect(x);
      const isYCorrect = isYCoordinateCorrect(y);

      if (!isXCorrect || !isYCorrect) {
        this.isPlaced = false;
        return;
      }

      this.position = { x, y };
      this.direction = direction;
      this.isPlaced = true;
    }
  }

  report() {
    if (this.isPlaced) {
      console.log([
        this.position.x, this.position.y,
        this.direction.toUpperCase()
      ].join(CHARACTERS.COMMA));
    }
  }

  move() {
    if (!this.isPlaced) {
      return;
    }

    let newPosition = {
      x: this.position.x,
      y: this.position.y
    };

    const step = DIRECTION[this.direction].step;
    const isWestOrEast = this.direction == DIRECTIONS.west || this.direction == DIRECTIONS.east;

    isWestOrEast ? newPosition.x += step : newPosition.y += step;

    if (isCoordinatesCorrect(newPosition)) {
      this.position = newPosition;
    }
  }

  left() {
    if (this.isPlaced) {
      this.direction = DIRECTION[this.direction].left;
    }
  }

  right() {
    if (this.isPlaced) {
      this.direction = DIRECTION[this.direction].right;
    }
  }

  executeCommands(commands) {
    for (const command of commands) {
      this[command.command](command.arguments);
    }
  }
}

export default Robot;
