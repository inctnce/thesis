from typing import List
from ..model import Model


class DisciplineDTO(Model):

    def __init__(self, name: str, lessons_count: int, teachers: List[int], students_count: int) -> None:
        super.__init__(name)
        self.lessons_count = lessons_count
        self.teachers = teachers
        self.students_count = students_count
