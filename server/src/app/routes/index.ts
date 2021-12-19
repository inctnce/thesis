import {Router} from 'express';

const api = Router();

api.post('/solve', (req, res) => {
	console.log(req.body);

	return res.json({});
});

export default api;
