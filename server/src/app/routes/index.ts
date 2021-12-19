import {Router} from 'express';
import Algorithm from '../../algorithm/Algorithm';
import Data from '../../algorithm/Data';
import Schedule from '../../algorithm/Schedule';

const api = Router();

api.post('/generate', (req, res) => {
	console.log(req.body);

	const data = new Data(req.body);
	const algorithm = new Algorithm(data);
	const schedules: Schedule[] = algorithm.solve();

	return res.json(schedules[0]);
});

export default api;
