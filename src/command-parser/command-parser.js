import {
  CHARACTERS
} from '../common/constants/constants.js';
import {
  isCorrectCommand,
  isPlaceCommandFirst
} from '../validations/index.js';

class CommandParser {
  parseDataFromFile(dataFromFile, cb) {
    const parsedCommands = this.parseCommands(dataFromFile);

    cb(null, parsedCommands);
  };

  parseCommands(parsedLines) {
    const parsedCommands = parsedLines.split(CHARACTERS.NEW_LINE);

    const commands = parsedCommands.map((commandLine) => {
      const unifiedCommandLine = commandLine.toLowerCase().replace(CHARACTERS.CARRIAGE, '');
      const parsedCommand = this.parseCommandWithArguments(unifiedCommandLine);

      return parsedCommand;
    });

    const correctCommands = commands.filter(command => !!command);

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

    return isCorrectCommand(commandObject) ? commandObject : null;
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
