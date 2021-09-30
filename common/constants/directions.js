export const DIRECTIONS = {
  north: 'north',
  south: 'south',
  west: 'west',
  east: 'east',
};

export const DIRECTION = {
  north: {
    step: 1,
    left: 'west',
    right: 'east',
  },
  south: {
    step: -1,
    left: 'east',
    right: 'west',
  },
  west: {
    step: -1,
    left: 'south',
    right: 'north',
  },
  east: {
    step: 1,
    left: 'north',
    right: 'south',
  },
};
