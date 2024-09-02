Instalação do projeto:

O projeto utiliza docker, postgreSQL no prisma, nest com typescript

- o docker compose está disponível no repositório
- o banco de dados é o postgreSQL e na construção da api, utilizei o DBeaver para checar as informações
- para rodar o projeto após a instalação

```bash

$ npm run start:dev

```

conteúdo do .env:
DATABASE_URL="postgresql://usuario:123456789@localhost:5433/furniro?schema=public"
JWT_KEY="asdasdqwdqwdasd"

para VISUALIZAR as chamadas da API com suas rotas, bodies e params:
instale o swagger e acesse:
http://localhost:3000/api

para utilizar a api recomendo o Postman pois algumas rotas são protegidas e precisam do token no authorization para serem acessadas

npm i bcrypt - para encriptar as senhas no banco de dados
npm install -D @types/bcrypt - para typescript

npx prisma migrate dev --name - atualiza o banco de dados
npx prisma generate - atualiza o ts

https://www.youtube.com/watch?v=pRglv1AsrQs tutorial seguido para registro de usuário
https://sa-east-1.console.aws.amazon.com/s3/buckets/furniroimagesc?region=sa-east-1&bucketType=general&tab=objects amazon S3 com o banco de imagens
