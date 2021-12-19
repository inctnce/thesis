import TWorkday from '../types/TWorkday';

class LessonTime {
	readonly Interval: string;
	readonly Workday: TWorkday;

	constructor(workday: TWorkday, interval: string) {
		this.validate(interval);

		this.Workday = workday;
		this.Interval = interval;
	}

	private validate(interval: string) {
		if (!/\d{2}:\d{2} - \d{2}:\d{2}/.test(interval)) throw new Error('Invalid Time Interval');
	}
}

export default LessonTime;
