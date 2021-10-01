import app from './src/app.js';

const fileName = process.argv[2];

app.runRobotApp(fileName, (err) => {
  if (err) {
    console.log('ERROR: ' + err.message);
  }
});
