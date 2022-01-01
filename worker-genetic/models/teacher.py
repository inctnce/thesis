from typing import List
from .model import Model
from .workday import Workday


class Teacher(Model):

    def __init__(self, name: str, restricted_intervals: List[Workday] = []) -> None:
        super().__init__(name)
        self.restricted_intervals = restricted_intervals
