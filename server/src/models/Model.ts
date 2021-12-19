import {v4 as uuidv4} from 'uuid';

class Model {
	public readonly ID: string;

	public readonly Name: string;

	constructor(name: string) {
		this.ID = uuidv4();
		this.Name = name;
	}
}

export default Model;
