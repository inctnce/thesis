from .model import Model


class Workday(Model):

    def __init__(self, name: str) -> None:
        super().__init__(name)
