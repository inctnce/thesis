from prettytable import PrettyTable
from random import choice
from typing import List
from .timetable import Timetable
from .model import Model
from .data import Data


class Population(Model):

    def __init__(self, size: int, data: Data, elite_count: int, mutation_rate: float) -> None:
        super().__init__()
        self.size = size
        self.elite_count = elite_count
        self.mutation_rate = mutation_rate
        self.data = data
        self.timetables = self.__generate_timetables()

    def __generate_timetables(self) -> List[Timetable]:
        timetables: List[Timetable] = []
        for _ in range(self.size):
            timetables.append(Timetable(self.data))

        return timetables

    def mutate(self) -> 'Population':

        for i in range(self.elite_count, self.size):
            self.timetables[i] = self.timetables[i].mutate(self.mutation_rate)

        return self

    def crossover(self) -> 'Population':
        crossed = self.__class__(self.size, self.data, self.elite_count, self.mutation_rate)
        crossed.timetables = self.timetables[:self.elite_count]

        for _ in range(self.elite_count, self.size):
            crossed.timetables.append(self.tournament().crossover(self.tournament()))

        return crossed

    def tournament(self) -> Timetable:
        return sorted([(choice(self.timetables)) for _ in range(self.elite_count)], key=lambda x: x.fitness(), reverse=True)[0]


    def display_timetables(self) -> None:
        for timetable in self.timetables:
            timetable.display_lessons()
            