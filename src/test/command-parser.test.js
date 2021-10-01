import CommandParser from '../command-parser/command-parser.js';
let parser;

beforeEach(() => {
  parser = new CommandParser();
});

describe('command parser - unit tests', () => {
  test('should parse commands correctly', () => {
    const input = 'PLACE 1,1,SOUTH\nMOVE\nRIGHT\nRIGHT\nMOVE\nLEFT\nREPORT';
    const output = [{
      command: 'place',
      arguments: [1, 1, 'south']
    }, {
      command: 'move'
    }, {
      command: 'right',
    }, {
      command: 'right',
    }, {
      command: 'move'
    }, {
      command: 'left',
    }, {
      command: 'report'
    }];

    parser.parseCommands(input, (err, commandsList) => {
      expect(commandsList).toEqual(output);
    });
  });

  test('should ignore unknown commands', () => {
    const input = 'PLACE 1,1,SOUTH\nMOVE\ntest-command\nLEFT\nREPORT';
    const output = [{
      command: 'place',
      arguments: [1, 1, 'south']
    }, {
      command: 'move'
    }, {
      command: 'left',
    }, {
      command: 'report'
    }];

    parser.parseCommands(input, (err, commandsList) => {
      expect(commandsList).toEqual(output);
    });
  });

  test('should ignore place commands with incorrect coordinates', () => {
    const input = 'PLACE -1,1,SOUTH\nMOVE\nLEFT\nREPORT';
    const output = [{
      command: 'move'
    }, {
      command: 'left',
    }, {
      command: 'report'
    }];

    parser.parseCommands(input, (err, commandsList) => {
      expect(commandsList).toEqual(output);
    });
  });

  
  test('should ignore place commands with incorrect direction', () => {
    const input = 'PLACE 1,1,SOUH\nMOVE\nLEFT\nREPORT';
    const output = [{
      command: 'move'
    }, {
      command: 'left',
    }, {
      command: 'report'
    }];

    parser.parseCommands(input, (err, commandsList) => {
      expect(commandsList).toEqual(output);
    });
  });
})
