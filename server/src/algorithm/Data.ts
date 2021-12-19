import Discipline from '../models/Discipline';
import LessonTime from '../models/LessonTime';
import Room from '../models/Room';
import Teacher from '../models/Teacher';
import TData from '../types/DTO/TData';
import TWorkday from '../types/TWorkday';
const util = require('util')

class Data {
	public rooms: Room[] = [];
	public teachers: Teacher[] = [];
	public lessonTimes: LessonTime[] = [];
	public disciplines: Discipline[] = [];
	public numOfLessons: number = 0;
	workdays: TWorkday[] = [];

	constructor(raw: TData) {
		this.workdays = raw.workdays as TWorkday[];
		for (const room of raw.rooms) this.rooms.push(new Room(room.name, room.capacity));
		for (const name of raw.teachers) this.teachers.push(new Teacher(name));

		for (const workday of this.workdays)
			for (const interval of raw.intervals) this.lessonTimes.push(new LessonTime(workday, interval));

		for (const discipline of raw.disciplines) {
			const teachers: Teacher[] = this.teachers.filter((_teacher, index) => discipline.teachers.includes(index));

			this.disciplines.push(
				new Discipline(discipline.name, discipline.numOfLessons, teachers, discipline.numOfStudents),
			);
		}

		this.numOfLessons = this.disciplines.reduce((prev, cur) => prev + cur.NumOfLessons, 0);

		console.log(util.inspect(this, false, null, true /* enable colors */));
	}

}

export default Data;
