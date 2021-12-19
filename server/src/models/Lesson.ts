import Discipline from './Discipline';
import LessonTime from './LessonTime';
import Model from './Model';
import Room from './Room';
import Teacher from './Teacher';

class Lesson extends Model {
	readonly Discipline: Discipline;

	readonly Time: LessonTime;

	readonly Room: Room;

	readonly Teacher: Teacher;

	constructor(name: string, discipline: Discipline, time: LessonTime, room: Room, teacher: Teacher) {
		super(name);
		this.Discipline = discipline;
		this.Time = time;
		this.Room = room;
		this.Teacher = teacher;
	}
}

export default Lesson;
