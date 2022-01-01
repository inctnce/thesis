from typing import Dict, List
from .model import Model
from .discipline import Discipline
from .room import Room
from .teacher import Teacher
from .interval import Interval
from .dto.room import RoomDTO
from .dto.discipline import DisciplineDTO


class Data(Model):

    def __init__(self, workdays: List[str], intervals: List[Dict[str, str]], teachers: List[str], disciplines: List[Dict], rooms: List[Dict]) -> None:
        self.workdays = workdays
        self.intervals = self.__create_intervals(workdays, intervals)
        self.teachers = self.__create_teachers(teachers)
        self.disciplines = self.__create_disciplines(disciplines)
        self.rooms = self.__create_rooms(rooms)

    def __create_rooms(self, raw_rooms: List[RoomDTO]):
        return [(Room(room["name"], room["capacity"])) for room in raw_rooms]

    def __create_teachers(self, raw_teachers: List[str]):
        return [Teacher(name) for name in raw_teachers]

    def __create_intervals(self, raw_workdays: List[str], raw_intervals: List[Dict[str, str]]) -> List[Interval]:
        intervals: List[Interval] = []
        for workday in raw_workdays:
            for interval in raw_intervals:
                intervals.append(
                    Interval(workday, interval["start"], interval["end"]))

        return intervals

    def __create_disciplines(self, raw_disciplines: List[Dict]) -> List[Discipline]:
        disciplines: List[Discipline] = []
        for discipline in raw_disciplines:
            teachers: List[Teacher] = []
            for i in range(len(self.teachers)):
                if i in discipline["teachers"]:
                    teachers.append(self.teachers[i])

            disciplines.append(Discipline(
                discipline["name"], discipline["lessons_count"], discipline["students_count"], teachers))

        return disciplines
