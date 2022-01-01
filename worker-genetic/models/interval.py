from .workday import Workday
from .model import Model


class Interval(Model):
    def __init__(self, workday: Workday, start_time: str, end_time: str) -> None:
        super().__init__(self.__repr__)
        self.workday = workday
        self.start_time = start_time
        self.end_time = end_time

    def __repr__(self) -> str:
        return f'{self.workday} {self.start_time} – {self.end_time}'
