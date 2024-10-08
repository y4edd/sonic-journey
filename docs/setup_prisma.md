# Prismaの環境構築

## 1．PostgreSQLのセットアップ

pgAdminでデータベースの作成

データベース名：sonic_journey_db

## 2．依存関係のインストール

プロジェクトのルートディレクトリで以下のコマンドを実行して、Prisma と必要なパッケージをインストールする。

```
$ yarn
```

## 3．PostgreSQL データベースと Prisma の接続設定

プロジェクトのルートディレクトリに、.env ファイルを作成する。
```
$ touch .env
```

.env ファイルに PostgreSQL の接続情報を設定します。
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

- USER: データベースユーザー名
- PASSWORD: データベースユーザーのパスワード
- HOSTlocalhost : ホスト名（ローカル環境ではlocalhost）
- PORT: データベースサーバーが稼働しているポート（PostgreSQLでは通常5432）
- DATABASE : データベースの名前
- SCHEMA : データベース内のスキーマの名前（PostgreSQLのデフォルトのスキーマはpublic）

## 4．マイグレーションの実行

Prisma で定義したモデルを PostgreSQL に反映させるために、マイグレーションを実行します。
```
$ yarn prisma migrate dev --name init
```

これで、データベースにテーブルが作成されます。
initの部分は変更内容にやって適宜変えてください。

## 5． Prisma クライアントの生成

マイグレーションが完了したら、Prisma クライアントを生成します。

```
$ yarn prisma generate
```
