import Discipline from './Discipline';
import Model from './Model';

class Group extends Model {
	readonly Disciplines: Discipline[];

	readonly NumOfStudents: number;

	constructor(name: string, disciplines: Discipline[], numOfStudents: number) {
		super(name);

		this.Disciplines = disciplines;
		this.NumOfStudents = numOfStudents;
	}
}

export default Group;
