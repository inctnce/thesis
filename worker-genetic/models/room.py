from .model import Model


class Room(Model):

    def __init__(self, name: str, capacity: int) -> None:
        super().__init__(name)
        self.capacity = capacity

    