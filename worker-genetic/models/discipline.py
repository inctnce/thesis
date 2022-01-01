from typing import List
from .model import Model
from .teacher import Teacher


class Discipline(Model):

    def __init__(self, name: str, lessons_count: int, students_count: int, teachers: List[Teacher]) -> None:
        super().__init__(name)
        self.lessons_count = lessons_count
        self.students_count = students_count
        self.teachers = teachers
