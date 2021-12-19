import TWorkday from '../types/TWorkday';

class LessonTime {
	readonly interval: string;
	readonly workday: TWorkday;

	constructor(workday: TWorkday, interval: string) {
		this.validate(interval);

		this.workday = workday;
		this.interval = interval;
	}

	private validate(interval: string) {
		if (!/\d{2}:\d{2} - \d{2}:\d{2}/.test(interval)) throw new Error('Invalid Time Interval');
	}
}

export default LessonTime;
