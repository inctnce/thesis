import json
import uuid


class Model():

    def __init__(self, name: str = "") -> None:
        self.id = str(uuid.uuid4())
        self.name = name

    def __repr__(self) -> str:
        return json.dumps(self, default=lambda o: o.__dict__, indent=4, ensure_ascii=False)

    def __eq__(self, __o: 'Model') -> bool:
        return self.id == __o.id
