import Data from './Data';
import randInt from '../helpers/random';
import Lesson from '../models/Lesson';

class Schedule {
	data: Data;
	lessons: Lesson[] = [];

	constructor(data: Data) {
		this.data = data;
	}

	generateLessons() {
		let lessonNumber = 0;

		for (let i = 0; i < this.data.disciplines.length; i++) {
			for (let j = 0; j < this.data.disciplines[i].NumOfLessons; j++) {
				this.lessons.push(
					new Lesson(
						lessonNumber.toString(),
						this.data.disciplines[i],
						this.data.lessonTimes[randInt(0, this.data.lessonTimes.length - 1)],
						this.data.rooms[randInt(0, this.data.rooms.length - 1)],
						this.data.disciplines[i].Teachers[randInt(0, this.data.disciplines[i].Teachers.length - 1)],
					),
				);
				lessonNumber++;
			}
		}
	}

	get fitness() {
		let numOfConflicts = 0;

		for (let i = 0; i < this.lessons.length; i++) {
			if (this.lessons[i].Room.Capacity < this.lessons[i].Discipline.NumOfStudents) {
				numOfConflicts++;
			}
			for (let j = 0; j < this.lessons.length; j++) {
				if (j > i) {
					// console.log("Lesson 1: ", this.lessons[i]);
					// console.log("Lesson 2: ", this.lessons[j]);
					if (
						this.lessons[i].Time.Interval === this.lessons[j].Time.Interval &&
						this.lessons[i].Time.Workday === this.lessons[j].Time.Workday &&
						this.lessons[i].ID !== this.lessons[j].ID
					) {
						if (this.lessons[i].Room.ID === this.lessons[j].Room.ID) {
							numOfConflicts++;
						}
						if (this.lessons[i].Teacher.ID === this.lessons[j].Teacher.ID) {
							numOfConflicts++;
						}
					}
				}
			}
		}

		return 1 / (numOfConflicts + 1);
	}

	displayRoomSchedule(roomName: string): void {
		console.table(
			this.lessons
				.filter((lesson) => lesson.Room.Name === roomName)
				.map((lesson) => ({
					Room: lesson.Room?.Name,
					Lesson: lesson?.Name,
					Time: lesson.Time.Interval,
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
					Time: lesson.Time.Interval,
					Discipline: lesson.Discipline?.Name,
					Room: lesson.Room?.Name,
				})),
		);
	}

	displayWeekSchedule(): void {
		for (const workday of this.data.workdays) {
			console.log(workday);
			for (const room of this.data.rooms) {
				console.log(room.Name);
				console.table(
					this.lessons
						.filter((lesson) => lesson.Time.Workday === workday)
						.filter((lesson) => lesson.Room.ID === room.ID)
						.map((lesson) => ({
							Time: lesson.Time.Interval,
							Discipline: lesson.Discipline.Name,
							Teacher: lesson.Teacher.Name,
						})),
				);
			}
		}
	}
}

export default Schedule;
