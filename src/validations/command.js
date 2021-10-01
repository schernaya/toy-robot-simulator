import {
  COMMANDS,
  DIRECTIONS,
} from '../common/constants/constants.js';
import { isCoordinatesCorrect } from './robot.js';

export const isCorrectArguments = (placeArguments) => {
  const [x, y, direction] = placeArguments;
  const correctDirection = isDirectionCorrect(direction);
  const correctCoordinates = isCoordinatesCorrect({ x, y });

  return correctCoordinates && correctDirection;
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
    const correctArguments = isCorrectArguments(command.arguments);
    return correctArguments;
  }
  return correctCommand;
};

export const isPlaceCommandFirst = (command) => {
  return command === COMMANDS.PLACE;
};
