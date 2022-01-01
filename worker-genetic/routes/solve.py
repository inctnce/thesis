import json
from typing import Dict
from aiohttp import web
from models.data import Data
from algorithm.genetic import Genetic

routes = web.RouteTableDef()


@routes.post("/solve")
async def index(request: web.BaseRequest):

    if request.has_body:
        raw: Dict = json.loads(await request.read())
        data = Data(raw["workdays"], raw["intervals"],
                       raw["teachers"], raw["disciplines"], raw["rooms"])

        genetic = Genetic(data, 3, 3, 0.1, 10)
        genetic.solve().timetables[0].display_lessons()

        return web.json_response(data.__dict__)

    return web.json_response({"error": "body is empty"})
