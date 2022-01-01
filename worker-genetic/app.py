import sys
from aiohttp import web
from routes.solve import routes


def main():
    sys.getdefaultencoding()
    app = web.Application()
    app.add_routes(routes)
    web.run_app(app)


if __name__ == "__main__":
    main()
