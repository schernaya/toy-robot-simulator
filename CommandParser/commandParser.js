import { DIRECTIONS, COMMANDS, CHARACTERS } from '../common/constants/constants.js';

class CommandParser {
  parseArguments(args, cb) {
    const parsedInput = args.split(CHARACTERS.NEW_LINE).map((commandLine) => {
      const unifiedCommandLine = commandLine.toLowerCase().replace(CHARACTERS.CARRIAGE, '');
      const parsedCommand = this.parseCommandWithArguments(unifiedCommandLine);

      return parsedCommand;
    });

    const commands = Object.values(COMMANDS);
    const correctCommands = parsedInput.filter(command => commands.includes(command.command));

    cb(null, correctCommands);
  }

  parseCommandWithArguments(commandLine) {
    const commandsInLine = commandLine.split(CHARACTERS.SPACE);
    const [firstCommandInLine, commandArguments] = commandsInLine;

    const isPlaceFirst = commandsInLine.length && firstCommandInLine === COMMANDS.PLACE;
    const commandObject = isPlaceFirst ? {
      command: firstCommandInLine,
      arguments: this.parsePlaceArguments(commandArguments),
    } : {
      command: commandLine
    };

    return commandObject;
  }

  parsePlaceArguments(commandArguments) {
    const placeArguments = commandArguments.split(CHARACTERS.COMMA);
    const [x, y, direction] = placeArguments;

    const parsedX = parseInt(x);
    const parsedY = parseInt(y);

    const directions = Object.keys(DIRECTIONS);
    const isCorrectPlaceCommand = !isNaN(parsedX) && !isNaN(parsedY) && directions.includes(direction);
    const validatedPlaceArguments = isCorrectPlaceCommand ? [parsedX, parsedY, direction] : null;

    return validatedPlaceArguments;
  };
}

export default CommandParser;
