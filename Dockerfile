# ベースイメージとしてNode.jsを使用
FROM node:16

# アプリケーションディレクトリを作成
WORKDIR /app

# アプリケーションの依存関係ファイルをコンテナにコピー
COPY package.json yarn.lock ./

# 依存関係をインストール
RUN yarn install

# アプリケーションのソースをコンテナにコピー
COPY . .

# アプリケーションをビルド
RUN yarn build

# 3000番ポートを開放
EXPOSE 3000

# アプリケーションを起動
CMD ["yarn", "start"]
