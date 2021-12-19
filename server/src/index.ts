// import Algorithm from './algorithm/Algorithm';
// import Data from './algorithm/Data';
// import Schedule from './algorithm/Schedule';

import App from './app/App';
import api from './app/routes';

// const data = new Data();
// const algorithm = new Algorithm(data);

// const schedules: Schedule[] = algorithm.solve();

// console.log('RESULTS PER ROOM');
// schedules[0].data.rooms.forEach((room) => {
// 	schedules[0].displayRoomSchedule(room.Name);
// });

const app = new App([], api);
app.listen(4000);
