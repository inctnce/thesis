import randInt from '../helpers/random';
import Data from './Data';
import Population from './Population';
import Schedule from './Schedule';

class Algorithm {
	data: Data;

	private readonly NUM_OF_ELITE_SCHEDULES: number = 1;
	private readonly TOURNAMENT_SELECTION_SIZE: number = 3;
	private readonly MUTATION_RATE: number = 0.1;
	private readonly POPULATION_SIZE: number = 10;

	constructor(data: Data) {
		this.data = data;
	}

	solve(): Schedule[] {
		let population = new Population(this.POPULATION_SIZE, this.data);
		let numOfGenerations = 0;

		population.displaySchedules();

		do {
			numOfGenerations++;

			// console.log('Generation: ', numOfGenerations);
			// population.displaySchedules();
			// console.log('#'.repeat(50));

			population = this.evolve(population);
			population.Schedules = population.Schedules.sort((s1, s2) => s1.fitness - s2.fitness).reverse();
		} while (numOfGenerations < 10000 && population.Schedules[0].fitness !== 1);

		return population.Schedules;
	}

	evolve = (population: Population): Population => this.mutatePopulation(this.crossoverPopulation(population));

	crossoverPopulation = (population: Population): Population => {
		const crossedPopulation = new Population(0, this.data);
		for (let i = 0; i < this.NUM_OF_ELITE_SCHEDULES; i++) crossedPopulation.Schedules.push(population.Schedules[i]);

		for (let i = this.NUM_OF_ELITE_SCHEDULES; i < this.POPULATION_SIZE; i++) {
			const schedule1 = this.selectTournamentPopulation(population).Schedules[0];
			const schedule2 = this.selectTournamentPopulation(population).Schedules[0];
			crossedPopulation.Schedules.push(this.crossoverSchedules(schedule1, schedule2));
		}

		return crossedPopulation;
	};

	mutatePopulation = (population: Population): Population => {
		for (let i = this.NUM_OF_ELITE_SCHEDULES; i < this.POPULATION_SIZE; i++) {
			this.mutateSchedule(population.Schedules[i]);
		}

		return population;
	};

	crossoverSchedules = (schedule1: Schedule, schedule2: Schedule): Schedule => {
		const crossedSchedule = new Schedule(this.data);
		crossedSchedule.generateLessons();

		for (let i = 0; i < crossedSchedule.lessons.length; i++) {
			if (Math.random() >= 0.5) crossedSchedule.lessons[i] = schedule1.lessons[i];
			else crossedSchedule.lessons[i] = schedule2.lessons[i];
		}

		return crossedSchedule;
	};

	mutateSchedule = (schedule: Schedule): Schedule => {
		const _schedule = new Schedule(this.data);
		_schedule.generateLessons();

		for (let i = 0; i < _schedule.lessons.length; i++) {
			if (this.MUTATION_RATE > Math.random()) schedule.lessons[i] = _schedule.lessons[i];
		}

		return schedule;
	};

	selectTournamentPopulation = (population: Population): Population => {
		const tournamentPopulation = new Population(0, this.data);

		for (let i = 0; i < this.TOURNAMENT_SELECTION_SIZE; i++)
			tournamentPopulation.Schedules.push(population.Schedules[randInt(0, population.Schedules.length - 1)]);

		tournamentPopulation.Schedules = tournamentPopulation.Schedules.sort((s1, s2) => s1.fitness - s2.fitness).reverse();

		return tournamentPopulation;
	};
}

export default Algorithm;
