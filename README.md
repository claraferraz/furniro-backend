```
    Instalação do projeto:

O projeto utiliza docker, postgreSQL no prisma, nest com typescript

- o docker compose está disponível no repositório
- o banco de dados é o postgreSQL e na construção da api, utilizei o DBeaver para checar as informações
- para rodar o projeto após a instalação

conteúdo do .env (mudar usuário e senha fora das {}):
```json
DATABASE_URL="postgresql://{usuario}:{senha}@localhost:543/furniro_db?schema=public"
JWT_KEY="asdasdqwdqwdasd"
```

```bash
$ npm install

$ npx prisma generate

$ npm run start:dev

```

para VISUALIZAR as chamadas da API com suas rotas, bodies e params:
instale o swagger e acesse:
http://localhost:3000/api

para utilizar a api recomendo o Postman pois algumas rotas são protegidas e precisam do token no authorization para serem acessadas

```bash
$ npm i bcrypt
#para encriptar as senhas no banco de dados

$ npm install -D @types/bcrypt
#para typescript

$ npx prisma migrate dev
#atualiza o banco de dados

$ npx prisma generate 
#atualiza o ts
```

## API Endpoints

### Authentication Endpoints

```
POST /users/register
Request: CreateUserDTO {
  username: string
  email: string
  password: string
}
Response: User object with JWT token

POST /users/login
Request: LoginUserDTO {
  email: string
  password: string
}
Response: User object with JWT token
```

### Product Endpoints

```
GET /products/list
Query Parameters:
  order?: 'AlphaAsc' | 'AlphaDesc' | 'PriceAsc' | 'PriceDesc'
  page?: number
  offset?: number
Response: {
  total: number
  productList: Product[]
}

GET /products/:id
Response: Product with images, details and tags

POST /products/register (Admin only)
Request: ProductRegisterDTO {
  title: string
  subtitle: string
  description: string
  price: number
  discount?: number
  new?: boolean
  category: string
  images: string[]
  tags: number[]
}
Response: Created product details

POST /products/details/:productId (Admin only)
Request: ProductDetailsDTO {
  color: string
  size: string
  stock: number
}
Response: Created product details with SKU
```

### Checkout Endpoints

```
POST /checkout/cart
Auth Required: Yes
Request: CartDTO {
  products: {
    productId: string
    detailsId: string
    amount: number
  }[]
}
Response: Created order with products

POST /checkout/shipping/:orderId
Auth Required: Yes
Request: ShippingDTO {
  companyName?: string
  zipCode: string
  region: string
  address: string
  city: string
  province: string
  addOnAddress?: string
  information?: string
}
Response: Updated order with shipping details
```

- https://www.youtube.com/watch?v=pRglv1AsrQs tutorial seguido para registro de usuário
- https://sa-east-1.console.aws.amazon.com/s3/buckets/furniroimagesc?region=sa-east-1&bucketType=general&tab=objects amazon S3 com o banco de imagens

    ```