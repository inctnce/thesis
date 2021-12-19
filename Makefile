#!make

dev-run:
	docker-compose -f docker-compose.yml up -d
dev-build:
	docker-compose -f docker-compose.yml build --no-cache
dev-down:
	docker-compose -f docker-compose.yml down

prod-run:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
prod-build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache
prod-down:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down

push:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml push
pull:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull

clean:
	docker rmi $(docker images) -f