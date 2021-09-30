class CommandParser {
  parseArguments(args, cb) {
    const parsedInput = args.split('\n').map((commandLine) => {
      const unifiedCommandLine = commandLine.toLowerCase().replace('\r', '');
      const parsedCommand = this.parseCommandWithArguments(unifiedCommandLine);

      return parsedCommand;
    });

    const correctCommands = parsedInput.filter(command => !!command);
    cb(null, correctCommands);
  }

  parseCommandWithArguments(commandLine) {
    const commandsInLine = commandLine.split(' ');
    const [firstCommandInLine, commandArguments] = commandsInLine;

    const isPlaceFirst = commandsInLine.length && firstCommandInLine === 'place';
    const commandObject = isPlaceFirst ? {
      command: firstCommandInLine,
      arguments: this.parsePlaceArguments(commandArguments),
    } : {
      command: commandLine
    };

    return commandObject;
  }

  parsePlaceArguments(commandArguments) {
    const placeArguments = commandArguments.split(',');
    const [x, y, direction] = placeArguments;

    const parsedX = parseInt(x);
    const parsedY = parseInt(y);

    const isCorrectPlaceCommand = !isNaN(parsedX) && !isNaN(parsedY) && directions.includes(direction);
    const validatedPlaceArguments = isCorrectPlaceCommand ? [parsedX, parsedY, direction] : null;

    return validatedPlaceArguments;
  };
}

const directions = ['north', 'south', 'west', 'east'];

export default CommandParser;
