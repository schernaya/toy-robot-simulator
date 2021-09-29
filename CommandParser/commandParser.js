export default class CommandParser {
    parseArguments(args, cb) {
        if (!args.length) {
            return cb(new Error('Must give robot command'));
        }
        
        console.log('Commands:')
        const parsedInput = args.split('\n').map((commands) => {
                console.log(commands);
                return this.parseCommands(commands.toLowerCase().replace('\r',''));
            }).filter(x => !!x);

        cb(null, parsedInput);
    }

    parseCommands(commands) {
        const commandsList = commands.split(' ');
        const firstCommand = commandsList[0];

        const isPlaceFirst = commandsList.length && firstCommand === 'place';
        const commandsObj = isPlaceFirst ? this.initPlacement(commandsList) : this.inputCommand(commands);

        return commandsObj;
    }

    initPlacement(position) {
        const positionList = position[1].split(',');

        const x = parseInt(positionList[0]);
        const y = parseInt(positionList[1]);
        const direction = positionList[2];

        const isCorrectPlaceCommand = !isNaN(x) && !isNaN(y) && directions.includes(direction);
        const command = isCorrectPlaceCommand ? {
            command: 'place',
            args: [x, y, direction]
        } : null;
       
        return command;
    };

    inputCommand(allCommands) {
        switch (allCommands) {
            case 'move':
                return {
                    command: 'move'
                };
            case 'left':
                return {
                    command: 'rotate',
                    args: 'left'
                };
            case 'right':
                return {
                    command: 'rotate',
                    args: 'right'
                };
            case 'report':
                return {
                    command: 'report'
                };
            default:
                return null;
        }
    }
}

const directions = ['north', 'south', 'west', 'east']

// module.exports = CommandParser;
