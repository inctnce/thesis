from prettytable import PrettyTable
from typing import List
from .model import Model
from .lesson import Lesson
from .data import Data
from random import choice, randint, random


class Timetable(Model):

    def __init__(self, data: Data) -> None:
        super().__init__()
        self.data = data
        self.rooms = data.rooms
        self.teachers = data.teachers
        self.intervals = data.intervals
        self.disciplines = data.disciplines
        self.lessons = self.__create_lessons()

    def __create_lessons(self):
        lessons: List[Lesson] = []
        lesson_number = 0

        for discipline in self.disciplines:
            for _ in range(discipline.lessons_count):
                lessons.append(Lesson(
                    str(lesson_number),
                    discipline,
                    choice(self.intervals),
                    choice(self.rooms),
                    choice(discipline.teachers)
                ))

                lesson_number += 1

        return lessons

    def crossover(self, parent: 'Timetable') -> 'Timetable':
        for i in range(len(self.lessons)):
            if randint(0, 1) == 1:
                self.lessons[i] = parent.lessons[i]

        return self

    def mutate(self, mutation_rate: float) -> 'Timetable':
        mutated = self.__class__(self.data)
        for i in range(len(self.lessons)):
            if random() > mutation_rate:
                self.lessons[i] = mutated.lessons[i]

        return self

    def fitness(self) -> float:
        conflicts_count = 0

        i, j = 0, 0
        for lesson1 in self.lessons:
            i += 1
            if lesson1.room.capacity < lesson1.discipline.students_count:
                print("Wrong capacity: ", lesson1.room.capacity, lesson1.discipline.students_count)
                conflicts_count += 1
            for lesson2 in self.lessons:
                j += 1
                if j > i and lesson1.interval == lesson2.interval and lesson1 != lesson1:
                    if lesson1.room == lesson2.room:
                        print("Same rooms: ", lesson1.room, lesson2.room)
                        conflicts_count += 1
                    if lesson1.teacher == lesson2.teacher:
                        print("Same teachers: ", lesson1.teacher, lesson2.teacher)
                        conflicts_count += 1

        return 1 / (conflicts_count + 1)

    def display_lessons(self) -> None:
        for workday in self.data.workdays:
            print(workday)

            table = PrettyTable()
            table.field_names=["Discipline", "Time", "Teacher", "Room"]

            lessons = filter(lambda x: x.interval.workday == workday, self.lessons)
            for l in lessons:
                table.add_row([l.discipline.name, l.interval.__repr__(), l.teacher.name, l.room.name])
        
            print(table)

        print(f'Fitness: {self.fitness()}')       
