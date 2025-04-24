
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  username: 'username',
  password: 'password',
  role: 'role'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  title: 'title',
  subtitle: 'subtitle',
  description: 'description',
  price: 'price',
  discount: 'discount',
  new: 'new',
  category: 'category'
};

exports.Prisma.ProductImagesScalarFieldEnum = {
  id: 'id',
  url: 'url',
  productId: 'productId'
};

exports.Prisma.ProductDetailsScalarFieldEnum = {
  color: 'color',
  size: 'size',
  stock: 'stock',
  detailId: 'detailId',
  productId: 'productId'
};

exports.Prisma.TagsScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.ProductTagsScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  tagId: 'tagId'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  createdAt: 'createdAt',
  total: 'total',
  shippingId: 'shippingId'
};

exports.Prisma.OrderProductScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  productDetails: 'productDetails',
  amount: 'amount',
  orderId: 'orderId'
};

exports.Prisma.ShippingScalarFieldEnum = {
  id: 'id',
  userFirstName: 'userFirstName',
  userLastName: 'userLastName',
  companyName: 'companyName',
  zipCode: 'zipCode',
  region: 'region',
  address: 'address',
  city: 'city',
  province: 'province',
  addOnAddress: 'addOnAddress',
  email: 'email',
  Information: 'Information'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.Prisma.ModelName = {
  User: 'User',
  Product: 'Product',
  ProductImages: 'ProductImages',
  ProductDetails: 'ProductDetails',
  Tags: 'Tags',
  ProductTags: 'ProductTags',
  Order: 'Order',
  OrderProduct: 'OrderProduct',
  Shipping: 'Shipping'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\clara.ferraz\\Documents\\furniro\\furniro-backend\\prisma\\app\\generated\\prisma\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "C:\\Users\\clara.ferraz\\Documents\\furniro\\furniro-backend\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../../.env"
  },
  "relativePath": "../../../..",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\"]\n  output          = \"app/generated/prisma/client\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel User {\n  id       String  @id @default(uuid())\n  email    String  @unique\n  username String\n  password String\n  role     Role    @default(USER)\n  Order    Order[]\n}\n\nmodel Product {\n  id          Int      @id @default(autoincrement())\n  title       String\n  subtitle    String\n  description String   @db.Text\n  price       Decimal  @db.Money\n  discount    Int?\n  new         Boolean? @default(false)\n  category    String\n\n  images         ProductImages[]\n  ProductDetails ProductDetails[]\n  ProductTags    ProductTags[]\n}\n\nmodel ProductImages {\n  id        Int    @id @default(autoincrement())\n  url       String\n  productId Int\n\n  product Product @relation(fields: [productId], references: [id])\n}\n\nmodel ProductDetails {\n  color        String?\n  size         String?\n  stock        Int            @default(0)\n  detailId     Int            @unique @default(autoincrement())\n  productId    Int\n  product      Product        @relation(fields: [productId], references: [id])\n  OrderProduct OrderProduct[]\n\n  @@id(name: \"sku\", [productId, detailId])\n}\n\nmodel Tags {\n  id   Int    @id @default(autoincrement())\n  name String @unique\n\n  ProductTags ProductTags[]\n}\n\nmodel ProductTags {\n  id        String @id @default(uuid())\n  productId Int\n  tagId     Int\n\n  tags    Tags    @relation(fields: [tagId], references: [id])\n  product Product @relation(fields: [productId], references: [id])\n}\n\nmodel Order {\n  id         String   @id @default(uuid())\n  userId     String\n  createdAt  DateTime @default(now())\n  total      Decimal? @db.Money\n  shippingId String?  @unique\n\n  user     User           @relation(fields: [userId], references: [id])\n  shipping Shipping?      @relation(fields: [shippingId], references: [id])\n  products OrderProduct[]\n}\n\nmodel OrderProduct {\n  id             String  @id @default(uuid())\n  productId      Int\n  productDetails Int\n  amount         Int\n  orderId        String?\n\n  order   Order?         @relation(fields: [orderId], references: [id])\n  product ProductDetails @relation(fields: [productId, productDetails], references: [productId, detailId])\n}\n\nmodel Shipping {\n  id            String  @id @default(uuid())\n  userFirstName String\n  userLastName  String\n  companyName   String?\n  zipCode       String  @db.Char(5)\n  region        String\n  address       String\n  city          String\n  province      String\n  addOnAddress  String?\n  email         String\n  Information   String? @db.Text\n  order         Order?\n}\n\nenum Role {\n  USER\n  ADMIN\n}\n",
  "inlineSchemaHash": "88d726cb5beffae7c53c002191cb78c40538e4b3e1f591a8c07d41c9531d7278",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"Role\"},{\"name\":\"Order\",\"kind\":\"object\",\"type\":\"Order\",\"relationName\":\"OrderToUser\"}],\"dbName\":null},\"Product\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"subtitle\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"discount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"new\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"category\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"images\",\"kind\":\"object\",\"type\":\"ProductImages\",\"relationName\":\"ProductToProductImages\"},{\"name\":\"ProductDetails\",\"kind\":\"object\",\"type\":\"ProductDetails\",\"relationName\":\"ProductToProductDetails\"},{\"name\":\"ProductTags\",\"kind\":\"object\",\"type\":\"ProductTags\",\"relationName\":\"ProductToProductTags\"}],\"dbName\":null},\"ProductImages\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"url\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"productId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"product\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"ProductToProductImages\"}],\"dbName\":null},\"ProductDetails\":{\"fields\":[{\"name\":\"color\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"size\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stock\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"detailId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"productId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"product\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"ProductToProductDetails\"},{\"name\":\"OrderProduct\",\"kind\":\"object\",\"type\":\"OrderProduct\",\"relationName\":\"OrderProductToProductDetails\"}],\"dbName\":null},\"Tags\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ProductTags\",\"kind\":\"object\",\"type\":\"ProductTags\",\"relationName\":\"ProductTagsToTags\"}],\"dbName\":null},\"ProductTags\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"productId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"tagId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"tags\",\"kind\":\"object\",\"type\":\"Tags\",\"relationName\":\"ProductTagsToTags\"},{\"name\":\"product\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"ProductToProductTags\"}],\"dbName\":null},\"Order\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"total\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"shippingId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"OrderToUser\"},{\"name\":\"shipping\",\"kind\":\"object\",\"type\":\"Shipping\",\"relationName\":\"OrderToShipping\"},{\"name\":\"products\",\"kind\":\"object\",\"type\":\"OrderProduct\",\"relationName\":\"OrderToOrderProduct\"}],\"dbName\":null},\"OrderProduct\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"productId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"productDetails\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"amount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"orderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"order\",\"kind\":\"object\",\"type\":\"Order\",\"relationName\":\"OrderToOrderProduct\"},{\"name\":\"product\",\"kind\":\"object\",\"type\":\"ProductDetails\",\"relationName\":\"OrderProductToProductDetails\"}],\"dbName\":null},\"Shipping\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userFirstName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userLastName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"companyName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"zipCode\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"region\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"address\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"city\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"province\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"addOnAddress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"Information\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"order\",\"kind\":\"object\",\"type\":\"Order\",\"relationName\":\"OrderToShipping\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: async () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine
  }
}
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

