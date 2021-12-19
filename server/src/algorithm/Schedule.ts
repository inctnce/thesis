import Data from './Data';
import randInt from '../helpers/random';
import Lesson from '../models/Lesson';
import TWorkday from '../types/TWorkday';

class Schedule {
	data: Data;
	lessons: Lesson[] = [];
	numOfConflicts: number = 0;
	lessonNumber: number = 0;

	constructor(data: Data) {
		this.data = data;
	}

	generateLessons() {
		for (let i = 0; i < this.data.disciplines.length; i++) {
			for (let j = 0; j < this.data.disciplines[i].NumOfLessons; j++) {
				this.lessons.push(
					new Lesson(
						this.lessonNumber.toString(),
						this.data.disciplines[i],
						this.data.lessonTimes[randInt(0, this.data.lessonTimes.length - 1)],
						this.data.rooms[randInt(0, this.data.rooms.length - 1)],
						this.data.disciplines[i].Teachers[randInt(0, this.data.disciplines[i].Teachers.length - 1)],
					),
				);
				this.lessonNumber++;
			}
		}
	}

	get fitness() {
		this.numOfConflicts = 0;

		for (let i = 0; i < this.lessons.length; i++) {
			if (this.lessons[i].Room.Capacity < this.lessons[i].Discipline.NumOfStudents) {
				this.numOfConflicts++;
			}
			for (let j = 0; j < this.lessons.length; j++) {
				if (j > i) {
					// console.log("Lesson 1: ", this.lessons[i]);
					// console.log("Lesson 2: ", this.lessons[j]);
					if (
						this.lessons[i].Time.interval === this.lessons[j].Time.interval &&
						this.lessons[i].ID !== this.lessons[j].ID
					) {
						if (this.lessons[i].Room.ID === this.lessons[j].Room.ID) {
							this.numOfConflicts++;
						}
						if (this.lessons[i].Teacher.ID === this.lessons[j].Teacher.ID) {
							this.numOfConflicts++;
						}
					}
				}
			}
		}

		return 1 / (this.numOfConflicts + 1);
	}

	displayRoomSchedule(roomName: string): void {
		console.table(
			this.lessons
				.filter((lesson) => lesson.Room.Name === roomName)
				.map((lesson) => ({
					Room: lesson.Room?.Name,
					Lesson: lesson?.Name,
					Time: lesson.Time.interval,
					Teacher: lesson.Teacher?.Name,
					Discipline: lesson.Discipline?.Name,
				})),
		);
	}

	displayTeacherSchedule(teacherName: string): void {
		console.table(
			this.lessons
				.filter((lesson) => lesson.Teacher.Name === teacherName)
				.map((lesson) => ({
					Teacher: lesson.Teacher?.Name,
					Lesson: lesson?.Name,
					Time: lesson.Time.interval,
					Discipline: lesson.Discipline?.Name,
					Room: lesson.Room?.Name,
				})),
		);
	}

	displayWeekSchedule(workday: TWorkday): void {}
}

export default Schedule;
