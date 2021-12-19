import Discipline from './Discipline';
import Model from './Model';

class Room extends Model {
	readonly Capacity: number;

	public Disciplines: Discipline[] = [];

	constructor(name: string, capacity: number) {
		super(name);

		this.Capacity = capacity;
	}
}

export default Room;
