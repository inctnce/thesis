// import Algorithm from './algorithm/Algorithm';
// import Data from './algorithm/Data';
// import Schedule from './algorithm/Schedule';

// const data = new Data();
// const algorithm = new Algorithm(data);

// const schedules: Schedule[] = algorithm.solve();

// console.log('RESULTS PER WORKDAY');
// schedules[0].displayWeekSchedule();

import App from './app/App';
import api from './app/routes';

const app = new App([], api);
app.listen(4000);
