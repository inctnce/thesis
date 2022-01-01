from .discipline import Discipline
from .interval import Interval
from .room import Room
from .teacher import Teacher
from .model import Model


class Lesson(Model):

    def __init__(self, name: str, discipline: Discipline, interval: Interval, room: Room, teacher: Teacher) -> None:
        super().__init__(name)

        self.discipline = discipline
        self.interval = interval
        self.room = room
        self.teacher = teacher
