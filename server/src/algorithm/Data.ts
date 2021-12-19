import Discipline from '../models/Discipline';
import LessonTime from '../models/LessonTime';
import Room from '../models/Room';
import Teacher from '../models/Teacher';
import TWorkday from '../types/TWorkday';

class Data {
	public rooms: Room[];
	public teachers: Teacher[];
	public lessonTimes: LessonTime[];
	public disciplines: Discipline[];
	public numOfLessons: number;

	constructor() {
		this.rooms = [new Room('R1', 25), new Room('R2', 45), new Room('R3', 35)];
		this.teachers = [
			new Teacher('Андрей Герасимов'),
			new Teacher('Наталья Савельева'),
			new Teacher('Сергей Толстой'),
			new Teacher('Ирина Сидорова'),
		];

		const workdays: TWorkday[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
		const intervals: string[] = ['09:30 - 11:05', '11:15 - 12:50', '13:40 - 15:15', '15:25 - 17:00'];
		this.lessonTimes = [];
		workdays.forEach((workday) => {
			intervals.forEach((interval) => {
				this.lessonTimes.push(new LessonTime(workday, interval));
			});
		});

		this.disciplines = [
			new Discipline('Алгебра', 1, [this.teachers[0], this.teachers[1]], 30),
			new Discipline('Физика', 1, [this.teachers[0], this.teachers[1], this.teachers[2]], 25),
			new Discipline('Математический анализ', 1, [this.teachers[0], this.teachers[1]], 20),
			new Discipline('Дискретная математика', 1, [this.teachers[2], this.teachers[3]], 40),
			new Discipline('Теория графов', 1, [this.teachers[3]], 25),
			new Discipline('Программирование', 1, [this.teachers[0], this.teachers[2]], 30),
			new Discipline('Статистика', 1, [this.teachers[1], this.teachers[3]], 20),
		];

		this.numOfLessons = this.disciplines.reduce((prev, cur) => prev + cur.NumOfLessons, 0);
	}
}

export default Data;
