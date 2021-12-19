import Schedule from './Schedule';
import Data from './Data';

class Population {
	readonly Size: number;
	readonly Data: Data;
	Schedules: Schedule[] = [];

	constructor(size: number, data: Data) {
		this.Size = size;
		this.Data = data;

		for (let i = 0; i < size; i++) {
			const schedule = new Schedule(data);
			schedule.generateLessons();

			this.Schedules.push(schedule);
		}
	}

	displaySchedules() {
		this.Schedules.forEach((schedule) => {
			console.table(
				schedule.lessons.map((lesson) => ({
					Name: lesson.Name,
					Time: lesson.Time.Interval,
					Teacher: lesson.Teacher.Name,
					Discipline: lesson.Discipline.Name,
					Room: lesson.Room.Name,
				})),
			);
			console.log('Fitness: ', schedule.fitness);
		});
	}
}

export default Population;
