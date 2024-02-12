# Makefileの構文はタブに敏感なので、スペースの代わりにタブを使用してください

# コンテナをビルドする
build:
	docker-compose build

# コンテナをバックグラウンドで起動する
up:
	docker-compose up -d

# コンテナを停止し削除する
down:
	docker-compose down

# コンテナのログを表示する
logs:
	docker-compose logs -f

# コンテナに入る
exec:
	docker-compose exec web /bin/sh
