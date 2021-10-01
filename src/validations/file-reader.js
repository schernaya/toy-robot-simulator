import {
  EXTENSIONS
} from '../common/constants/constants.js';

export const isCorrectExtension = (fileName) => {
  const fileExtension = fileName.split('.').pop();
  const extensions = Object.values(EXTENSIONS);
  return extensions.includes(fileExtension);
};
