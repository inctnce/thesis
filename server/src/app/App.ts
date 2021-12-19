import bodyParser from 'body-parser';
import express, {Router} from 'express';

class App {
	private app;

	constructor(whitelist: string[], router: Router) {
		this.app = express();

		this.app.use(express.json());
		this.app.use(express.urlencoded());

		this.app.use('/api', router);
	}

	listen(port: number) {
		this.app.listen(port, () => {
			console.log('Express server started on port: ' + port);
		});
	}
}

export default App;
