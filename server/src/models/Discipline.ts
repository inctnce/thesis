import Model from './Model';
import Teacher from './Teacher';

class Discipline extends Model {
	readonly NumOfLessons: number;

	readonly Teachers: Teacher[];

	readonly NumOfStudents: number;

	constructor(name: string, numOfLessons: number, teachers: Teacher[], numOfStudents: number) {
		super(name);
		this.NumOfLessons = numOfLessons;
		this.Teachers = teachers;
		this.NumOfStudents = numOfStudents;
	}
}

export default Discipline;
