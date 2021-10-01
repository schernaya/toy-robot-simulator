import {
  CHARACTERS
} from '../constants/constants.js';
import {
  isCorrectCommand,
  isPlaceCommandFirst,
  hasError,
} from '../validations/index.js';

class CommandParser {
  parseDataFromFile(dataFromFile, cb) {
    const parsedCommands = this.parseCommands(dataFromFile);

    cb(null, parsedCommands);
  };

  parseCommands(parsedLines) {
    const commands = parsedLines.split(CHARACTERS.NEW_LINE);

    const parsedCommans = commands.map((commandLine) => {
      const unifiedCommandLine = commandLine.toLowerCase().replace(CHARACTERS.CARRIAGE, '');
      const parsedCommand = this.parseCommandWithArguments(unifiedCommandLine);

      if (hasError(parsedCommand)) {
        console.info(parsedCommand.message);
      }

      return parsedCommand;
    });

    const correctCommands = parsedCommans.filter(command => !(command instanceof Error));

    return correctCommands;
  }

  parseCommandWithArguments(commandLine) {
    const commandsInLine = commandLine.split(CHARACTERS.SPACE);
    const [firstCommandInLine, commandArguments] = commandsInLine;

    const isPlaceFirst = isPlaceCommandFirst(firstCommandInLine);
    const commandObject = isPlaceFirst ? {
      command: firstCommandInLine,
      arguments: this.parsePlaceArguments(commandArguments),
    } : {
      command: commandLine
    };

    return isCorrectCommand(commandObject) ? commandObject :
      new Error(`The command ${commandsInLine} is incorrect`);
  }

  parsePlaceArguments(commandArguments) {
    const placeArguments = commandArguments.split(CHARACTERS.COMMA);
    const [x, y, direction] = placeArguments;

    const parsedX = parseInt(x);
    const parsedY = parseInt(y);

    const parsedPlaceArguments = [parsedX, parsedY, direction];

    return parsedPlaceArguments;
  };
}

export default CommandParser;
