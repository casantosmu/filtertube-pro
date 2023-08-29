dev:
	docker compose run --rm web yarn
	docker compose up -d web
	docker compose logs --tail=100 -f web
