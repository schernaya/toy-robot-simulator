import {
  TABLE_SIZE,
} from '../common/constants/constants.js';

export const isXCoordinateCorrect = (coordinate) => {
  const isXCorrect = coordinate <= TABLE_SIZE.x && coordinate >= 0;
  return isXCorrect;
};

export const isYCoordinateCorrect = (coordinate) => {
  const isYCorrect = coordinate <= TABLE_SIZE.y && coordinate >= 0;
  return isYCorrect;
};

export const isCoordinatesCorrect = (coordinates) => {
  const isXCorrect = isXCoordinateCorrect(coordinates.x);
  const isYCorrect = isYCoordinateCorrect(coordinates.y);
  return isXCorrect && isYCorrect;
};
