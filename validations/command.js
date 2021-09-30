import {
  COMMANDS,
  DIRECTIONS,
} from '../common/constants/constants.js';

export const isCorrectPlaceCommand = (placeArguments) => {
  const [x, y, direction] = placeArguments;
  const directions = Object.keys(DIRECTIONS);
  return !isNaN(x) && !isNaN(y) && directions.includes(direction);
};

export const isCorrectCommand = (command) => {
  const commands = Object.values(COMMANDS);
  return commands.includes(command.command);
};

export const isPlaceCommandFirst = (command) => {
  return command === COMMANDS.PLACE;
};

export const isDirectionCorrect = (direction) => {
  return command === COMMANDS.PLACE;
};
