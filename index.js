import app from './app.js';

const fileName = process.argv[2];

app.runRobotApp(fileName, (err, toyRobot) => {
  if (err) {
    console.log('ERROR:' + ' ' + (err.message));
    return;
  }

//   if (!toyRobot.isPlaced) {
//     console.log('Robot placement is unsuccessful');
//   }
});
