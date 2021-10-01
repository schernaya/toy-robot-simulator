import Robot from '../robot/robot.js';
let robot;

beforeEach(() => {
  robot = new Robot();
});

describe('robot - unit tests', () => {
  test('should place robot within the the table', () => {
    robot.place([1, 1, 'south']);
    expect(robot.isPlaced).toBeTruthy;
    expect(robot.position).toEqual({ x: 1, y: 1 });
    expect(robot.direction).toEqual('south');
  });

  test('should not be placed if robot is placed out of table', () => {
    robot.place([6, 4, 'north']);
    expect(robot.isPlaced).toBeFalsy;
  });

  test('should ignore all instructions before the first place instruction', () => {
    robot.left();
    robot.move();
    robot.place([0, 0, 'south']);
    expect(robot.position).toEqual({ x: 0, y: 0 });
    expect(robot.direction).toEqual('south');
  });

  test('should ignore commands that cause robot to move fall from the table', () => {
    robot.place([5, 5, 'north']);
    robot.move();
    robot.move();
    robot.left();
    expect(robot.position).toEqual({ x: 5, y: 5 });
    expect(robot.direction).toEqual('west');
  });

  test('should report cordinates and direction', () => {
    robot.place([1, 2, 'east']);
    robot.report();
    robot.move();
    robot.right();
    robot.report();
    expect(robot.position).toEqual({ x: 2, y: 2 });
    expect(robot.direction).toEqual('south');
  });

  test('should correctly replace the robot if asked to', () => {
    robot.place([0, 1, 'north']);
    robot.move();
    robot.place([2, 2, 'east']);
    expect(robot.position).toEqual({ x: 2, y: 2 });
    expect(robot.direction).toEqual('east');
  });
})
