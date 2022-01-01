from models.population import Population
from models.data import Data


class Genetic:

    def __init__(self, data: Data, elite_count: int, tournament_selection_size: int, mutation_rate: float, population_size: int) -> None:
        self.mutation_rate = mutation_rate
        self.population_size = population_size
        self.tournament_selection_size = tournament_selection_size
        self.elite_count = elite_count
        self.data = data
        self.population = Population(
            population_size, data, elite_count, mutation_rate)

    def solve(self) -> Population:

        generation_count = 0

        while generation_count < 10000 and self.population.timetables[0].fitness() != 1:
            print(generation_count)
            self.population = self.evolve()
            generation_count += 1

        return self.population

    def evolve(self) -> Population:
        return self.population.crossover().mutate()
