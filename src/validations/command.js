import {
  COMMANDS,
  DIRECTIONS,
} from '../common/constants/constants.js';

export const isCorrectPlaceCommand = (placeArguments) => {
  const [x, y, direction] = placeArguments;
  const correctDirection = isDirectionCorrect(direction);
  return !isNaN(x) && !isNaN(y) && correctDirection;
};

export const isDirectionCorrect = (direction) => {
  const directions = Object.keys(DIRECTIONS);
  return directions.includes(direction);
};

export const commandIsCorrect = (command) => {
  const commands = Object.values(COMMANDS);
  return commands.includes(command);
};

export const isCorrectCommand = (command) => {
  const correctCommand = commandIsCorrect(command.command);

  const isPlaceCommand = isPlaceCommandFirst(command.command);
  if (isPlaceCommand) {
    const direction = command.arguments[2];
    const correctDirection = isDirectionCorrect(direction);
    return correctCommand && correctDirection;
  }
  return correctCommand;
};

export const isPlaceCommandFirst = (command) => {
  return command === COMMANDS.PLACE;
};
