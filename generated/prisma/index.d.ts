
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model TextChunk
 * 
 */
export type TextChunk = $Result.DefaultSelection<Prisma.$TextChunkPayload>
/**
 * Model AudioChunk
 * 
 */
export type AudioChunk = $Result.DefaultSelection<Prisma.$AudioChunkPayload>
/**
 * Model PlaybackProgress
 * 
 */
export type PlaybackProgress = $Result.DefaultSelection<Prisma.$PlaybackProgressPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProcessingMode: {
  FULL_TEXT: 'FULL_TEXT',
  SUMMARY: 'SUMMARY',
  PODCAST: 'PODCAST'
};

export type ProcessingMode = (typeof ProcessingMode)[keyof typeof ProcessingMode]


export const DocumentStatus: {
  UPLOADED: 'UPLOADED',
  EXTRACTING: 'EXTRACTING',
  CHUNKING: 'CHUNKING',
  REWRITING: 'REWRITING',
  GENERATING: 'GENERATING',
  PARTIALLY_READY: 'PARTIALLY_READY',
  READY: 'READY',
  ERROR: 'ERROR'
};

export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus]


export const ChunkStatus: {
  PENDING: 'PENDING',
  GENERATING_AUDIO: 'GENERATING_AUDIO',
  DONE: 'DONE',
  ERROR: 'ERROR'
};

export type ChunkStatus = (typeof ChunkStatus)[keyof typeof ChunkStatus]

}

export type ProcessingMode = $Enums.ProcessingMode

export const ProcessingMode: typeof $Enums.ProcessingMode

export type DocumentStatus = $Enums.DocumentStatus

export const DocumentStatus: typeof $Enums.DocumentStatus

export type ChunkStatus = $Enums.ChunkStatus

export const ChunkStatus: typeof $Enums.ChunkStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.textChunk`: Exposes CRUD operations for the **TextChunk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TextChunks
    * const textChunks = await prisma.textChunk.findMany()
    * ```
    */
  get textChunk(): Prisma.TextChunkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.audioChunk`: Exposes CRUD operations for the **AudioChunk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AudioChunks
    * const audioChunks = await prisma.audioChunk.findMany()
    * ```
    */
  get audioChunk(): Prisma.AudioChunkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playbackProgress`: Exposes CRUD operations for the **PlaybackProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlaybackProgresses
    * const playbackProgresses = await prisma.playbackProgress.findMany()
    * ```
    */
  get playbackProgress(): Prisma.PlaybackProgressDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Document: 'Document',
    TextChunk: 'TextChunk',
    AudioChunk: 'AudioChunk',
    PlaybackProgress: 'PlaybackProgress'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "document" | "textChunk" | "audioChunk" | "playbackProgress"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      TextChunk: {
        payload: Prisma.$TextChunkPayload<ExtArgs>
        fields: Prisma.TextChunkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TextChunkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextChunkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TextChunkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextChunkPayload>
          }
          findFirst: {
            args: Prisma.TextChunkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextChunkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TextChunkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextChunkPayload>
          }
          findMany: {
            args: Prisma.TextChunkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextChunkPayload>[]
          }
          create: {
            args: Prisma.TextChunkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextChunkPayload>
          }
          createMany: {
            args: Prisma.TextChunkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TextChunkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextChunkPayload>[]
          }
          delete: {
            args: Prisma.TextChunkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextChunkPayload>
          }
          update: {
            args: Prisma.TextChunkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextChunkPayload>
          }
          deleteMany: {
            args: Prisma.TextChunkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TextChunkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TextChunkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextChunkPayload>[]
          }
          upsert: {
            args: Prisma.TextChunkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextChunkPayload>
          }
          aggregate: {
            args: Prisma.TextChunkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTextChunk>
          }
          groupBy: {
            args: Prisma.TextChunkGroupByArgs<ExtArgs>
            result: $Utils.Optional<TextChunkGroupByOutputType>[]
          }
          count: {
            args: Prisma.TextChunkCountArgs<ExtArgs>
            result: $Utils.Optional<TextChunkCountAggregateOutputType> | number
          }
        }
      }
      AudioChunk: {
        payload: Prisma.$AudioChunkPayload<ExtArgs>
        fields: Prisma.AudioChunkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AudioChunkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioChunkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AudioChunkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioChunkPayload>
          }
          findFirst: {
            args: Prisma.AudioChunkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioChunkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AudioChunkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioChunkPayload>
          }
          findMany: {
            args: Prisma.AudioChunkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioChunkPayload>[]
          }
          create: {
            args: Prisma.AudioChunkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioChunkPayload>
          }
          createMany: {
            args: Prisma.AudioChunkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AudioChunkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioChunkPayload>[]
          }
          delete: {
            args: Prisma.AudioChunkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioChunkPayload>
          }
          update: {
            args: Prisma.AudioChunkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioChunkPayload>
          }
          deleteMany: {
            args: Prisma.AudioChunkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AudioChunkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AudioChunkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioChunkPayload>[]
          }
          upsert: {
            args: Prisma.AudioChunkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AudioChunkPayload>
          }
          aggregate: {
            args: Prisma.AudioChunkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAudioChunk>
          }
          groupBy: {
            args: Prisma.AudioChunkGroupByArgs<ExtArgs>
            result: $Utils.Optional<AudioChunkGroupByOutputType>[]
          }
          count: {
            args: Prisma.AudioChunkCountArgs<ExtArgs>
            result: $Utils.Optional<AudioChunkCountAggregateOutputType> | number
          }
        }
      }
      PlaybackProgress: {
        payload: Prisma.$PlaybackProgressPayload<ExtArgs>
        fields: Prisma.PlaybackProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlaybackProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybackProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlaybackProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybackProgressPayload>
          }
          findFirst: {
            args: Prisma.PlaybackProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybackProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlaybackProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybackProgressPayload>
          }
          findMany: {
            args: Prisma.PlaybackProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybackProgressPayload>[]
          }
          create: {
            args: Prisma.PlaybackProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybackProgressPayload>
          }
          createMany: {
            args: Prisma.PlaybackProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlaybackProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybackProgressPayload>[]
          }
          delete: {
            args: Prisma.PlaybackProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybackProgressPayload>
          }
          update: {
            args: Prisma.PlaybackProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybackProgressPayload>
          }
          deleteMany: {
            args: Prisma.PlaybackProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlaybackProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlaybackProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybackProgressPayload>[]
          }
          upsert: {
            args: Prisma.PlaybackProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaybackProgressPayload>
          }
          aggregate: {
            args: Prisma.PlaybackProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaybackProgress>
          }
          groupBy: {
            args: Prisma.PlaybackProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaybackProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlaybackProgressCountArgs<ExtArgs>
            result: $Utils.Optional<PlaybackProgressCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    document?: DocumentOmit
    textChunk?: TextChunkOmit
    audioChunk?: AudioChunkOmit
    playbackProgress?: PlaybackProgressOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    documents: number
    playbackProgress: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | UserCountOutputTypeCountDocumentsArgs
    playbackProgress?: boolean | UserCountOutputTypeCountPlaybackProgressArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPlaybackProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaybackProgressWhereInput
  }


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    chunks: number
    audioChunks: number
    playbackProgress: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | DocumentCountOutputTypeCountChunksArgs
    audioChunks?: boolean | DocumentCountOutputTypeCountAudioChunksArgs
    playbackProgress?: boolean | DocumentCountOutputTypeCountPlaybackProgressArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TextChunkWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountAudioChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AudioChunkWhereInput
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountPlaybackProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaybackProgressWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    isPremium: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    isPremium: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    isPremium: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    isPremium?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    isPremium?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    isPremium?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    isPremium: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    isPremium?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    documents?: boolean | User$documentsArgs<ExtArgs>
    playbackProgress?: boolean | User$playbackProgressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    isPremium?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    isPremium?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    isPremium?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "isPremium" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | User$documentsArgs<ExtArgs>
    playbackProgress?: boolean | User$playbackProgressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      playbackProgress: Prisma.$PlaybackProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      isPremium: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documents<T extends User$documentsArgs<ExtArgs> = {}>(args?: Subset<T, User$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    playbackProgress<T extends User$playbackProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$playbackProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly isPremium: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.documents
   */
  export type User$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * User.playbackProgress
   */
  export type User$playbackProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressInclude<ExtArgs> | null
    where?: PlaybackProgressWhereInput
    orderBy?: PlaybackProgressOrderByWithRelationInput | PlaybackProgressOrderByWithRelationInput[]
    cursor?: PlaybackProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaybackProgressScalarFieldEnum | PlaybackProgressScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    fileSize: number | null
    pageCount: number | null
    audioDuration: number | null
    totalChunks: number | null
    processedChunks: number | null
  }

  export type DocumentSumAggregateOutputType = {
    fileSize: number | null
    pageCount: number | null
    audioDuration: number | null
    totalChunks: number | null
    processedChunks: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    title: string | null
    fileName: string | null
    fileUrl: string | null
    fileSize: number | null
    pageCount: number | null
    extractedText: string | null
    language: string | null
    status: $Enums.DocumentStatus | null
    audioDuration: number | null
    totalChunks: number | null
    processedChunks: number | null
    createdAt: Date | null
    updatedAt: Date | null
    errorMessage: string | null
    errorCode: string | null
    failedAt: Date | null
    userId: string | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    title: string | null
    fileName: string | null
    fileUrl: string | null
    fileSize: number | null
    pageCount: number | null
    extractedText: string | null
    language: string | null
    status: $Enums.DocumentStatus | null
    audioDuration: number | null
    totalChunks: number | null
    processedChunks: number | null
    createdAt: Date | null
    updatedAt: Date | null
    errorMessage: string | null
    errorCode: string | null
    failedAt: Date | null
    userId: string | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    title: number
    fileName: number
    fileUrl: number
    fileSize: number
    pageCount: number
    extractedText: number
    language: number
    status: number
    audioDuration: number
    totalChunks: number
    processedChunks: number
    createdAt: number
    updatedAt: number
    errorMessage: number
    errorCode: number
    failedAt: number
    userId: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    fileSize?: true
    pageCount?: true
    audioDuration?: true
    totalChunks?: true
    processedChunks?: true
  }

  export type DocumentSumAggregateInputType = {
    fileSize?: true
    pageCount?: true
    audioDuration?: true
    totalChunks?: true
    processedChunks?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    title?: true
    fileName?: true
    fileUrl?: true
    fileSize?: true
    pageCount?: true
    extractedText?: true
    language?: true
    status?: true
    audioDuration?: true
    totalChunks?: true
    processedChunks?: true
    createdAt?: true
    updatedAt?: true
    errorMessage?: true
    errorCode?: true
    failedAt?: true
    userId?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    title?: true
    fileName?: true
    fileUrl?: true
    fileSize?: true
    pageCount?: true
    extractedText?: true
    language?: true
    status?: true
    audioDuration?: true
    totalChunks?: true
    processedChunks?: true
    createdAt?: true
    updatedAt?: true
    errorMessage?: true
    errorCode?: true
    failedAt?: true
    userId?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    title?: true
    fileName?: true
    fileUrl?: true
    fileSize?: true
    pageCount?: true
    extractedText?: true
    language?: true
    status?: true
    audioDuration?: true
    totalChunks?: true
    processedChunks?: true
    createdAt?: true
    updatedAt?: true
    errorMessage?: true
    errorCode?: true
    failedAt?: true
    userId?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    title: string
    fileName: string
    fileUrl: string
    fileSize: number | null
    pageCount: number | null
    extractedText: string | null
    language: string
    status: $Enums.DocumentStatus
    audioDuration: number | null
    totalChunks: number
    processedChunks: number
    createdAt: Date
    updatedAt: Date
    errorMessage: string | null
    errorCode: string | null
    failedAt: Date | null
    userId: string
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    pageCount?: boolean
    extractedText?: boolean
    language?: boolean
    status?: boolean
    audioDuration?: boolean
    totalChunks?: boolean
    processedChunks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    errorMessage?: boolean
    errorCode?: boolean
    failedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    chunks?: boolean | Document$chunksArgs<ExtArgs>
    audioChunks?: boolean | Document$audioChunksArgs<ExtArgs>
    playbackProgress?: boolean | Document$playbackProgressArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    pageCount?: boolean
    extractedText?: boolean
    language?: boolean
    status?: boolean
    audioDuration?: boolean
    totalChunks?: boolean
    processedChunks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    errorMessage?: boolean
    errorCode?: boolean
    failedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    pageCount?: boolean
    extractedText?: boolean
    language?: boolean
    status?: boolean
    audioDuration?: boolean
    totalChunks?: boolean
    processedChunks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    errorMessage?: boolean
    errorCode?: boolean
    failedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    title?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    pageCount?: boolean
    extractedText?: boolean
    language?: boolean
    status?: boolean
    audioDuration?: boolean
    totalChunks?: boolean
    processedChunks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    errorMessage?: boolean
    errorCode?: boolean
    failedAt?: boolean
    userId?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "fileName" | "fileUrl" | "fileSize" | "pageCount" | "extractedText" | "language" | "status" | "audioDuration" | "totalChunks" | "processedChunks" | "createdAt" | "updatedAt" | "errorMessage" | "errorCode" | "failedAt" | "userId", ExtArgs["result"]["document"]>
  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    chunks?: boolean | Document$chunksArgs<ExtArgs>
    audioChunks?: boolean | Document$audioChunksArgs<ExtArgs>
    playbackProgress?: boolean | Document$playbackProgressArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      chunks: Prisma.$TextChunkPayload<ExtArgs>[]
      audioChunks: Prisma.$AudioChunkPayload<ExtArgs>[]
      playbackProgress: Prisma.$PlaybackProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      fileName: string
      fileUrl: string
      fileSize: number | null
      pageCount: number | null
      extractedText: string | null
      language: string
      status: $Enums.DocumentStatus
      audioDuration: number | null
      totalChunks: number
      processedChunks: number
      createdAt: Date
      updatedAt: Date
      errorMessage: string | null
      errorCode: string | null
      failedAt: Date | null
      userId: string
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    chunks<T extends Document$chunksArgs<ExtArgs> = {}>(args?: Subset<T, Document$chunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    audioChunks<T extends Document$audioChunksArgs<ExtArgs> = {}>(args?: Subset<T, Document$audioChunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudioChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    playbackProgress<T extends Document$playbackProgressArgs<ExtArgs> = {}>(args?: Subset<T, Document$playbackProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly title: FieldRef<"Document", 'String'>
    readonly fileName: FieldRef<"Document", 'String'>
    readonly fileUrl: FieldRef<"Document", 'String'>
    readonly fileSize: FieldRef<"Document", 'Int'>
    readonly pageCount: FieldRef<"Document", 'Int'>
    readonly extractedText: FieldRef<"Document", 'String'>
    readonly language: FieldRef<"Document", 'String'>
    readonly status: FieldRef<"Document", 'DocumentStatus'>
    readonly audioDuration: FieldRef<"Document", 'Float'>
    readonly totalChunks: FieldRef<"Document", 'Int'>
    readonly processedChunks: FieldRef<"Document", 'Int'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
    readonly errorMessage: FieldRef<"Document", 'String'>
    readonly errorCode: FieldRef<"Document", 'String'>
    readonly failedAt: FieldRef<"Document", 'DateTime'>
    readonly userId: FieldRef<"Document", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document.chunks
   */
  export type Document$chunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkInclude<ExtArgs> | null
    where?: TextChunkWhereInput
    orderBy?: TextChunkOrderByWithRelationInput | TextChunkOrderByWithRelationInput[]
    cursor?: TextChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TextChunkScalarFieldEnum | TextChunkScalarFieldEnum[]
  }

  /**
   * Document.audioChunks
   */
  export type Document$audioChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkInclude<ExtArgs> | null
    where?: AudioChunkWhereInput
    orderBy?: AudioChunkOrderByWithRelationInput | AudioChunkOrderByWithRelationInput[]
    cursor?: AudioChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AudioChunkScalarFieldEnum | AudioChunkScalarFieldEnum[]
  }

  /**
   * Document.playbackProgress
   */
  export type Document$playbackProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressInclude<ExtArgs> | null
    where?: PlaybackProgressWhereInput
    orderBy?: PlaybackProgressOrderByWithRelationInput | PlaybackProgressOrderByWithRelationInput[]
    cursor?: PlaybackProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaybackProgressScalarFieldEnum | PlaybackProgressScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model TextChunk
   */

  export type AggregateTextChunk = {
    _count: TextChunkCountAggregateOutputType | null
    _avg: TextChunkAvgAggregateOutputType | null
    _sum: TextChunkSumAggregateOutputType | null
    _min: TextChunkMinAggregateOutputType | null
    _max: TextChunkMaxAggregateOutputType | null
  }

  export type TextChunkAvgAggregateOutputType = {
    index: number | null
    tokenCount: number | null
    audioDuration: number | null
  }

  export type TextChunkSumAggregateOutputType = {
    index: number | null
    tokenCount: number | null
    audioDuration: number | null
  }

  export type TextChunkMinAggregateOutputType = {
    id: string | null
    index: number | null
    text: string | null
    tokenCount: number | null
    mode: $Enums.ProcessingMode | null
    processed: string | null
    audioPath: string | null
    audioDuration: number | null
    status: $Enums.ChunkStatus | null
    createdAt: Date | null
    documentId: string | null
  }

  export type TextChunkMaxAggregateOutputType = {
    id: string | null
    index: number | null
    text: string | null
    tokenCount: number | null
    mode: $Enums.ProcessingMode | null
    processed: string | null
    audioPath: string | null
    audioDuration: number | null
    status: $Enums.ChunkStatus | null
    createdAt: Date | null
    documentId: string | null
  }

  export type TextChunkCountAggregateOutputType = {
    id: number
    index: number
    text: number
    tokenCount: number
    mode: number
    processed: number
    audioPath: number
    audioDuration: number
    status: number
    createdAt: number
    documentId: number
    _all: number
  }


  export type TextChunkAvgAggregateInputType = {
    index?: true
    tokenCount?: true
    audioDuration?: true
  }

  export type TextChunkSumAggregateInputType = {
    index?: true
    tokenCount?: true
    audioDuration?: true
  }

  export type TextChunkMinAggregateInputType = {
    id?: true
    index?: true
    text?: true
    tokenCount?: true
    mode?: true
    processed?: true
    audioPath?: true
    audioDuration?: true
    status?: true
    createdAt?: true
    documentId?: true
  }

  export type TextChunkMaxAggregateInputType = {
    id?: true
    index?: true
    text?: true
    tokenCount?: true
    mode?: true
    processed?: true
    audioPath?: true
    audioDuration?: true
    status?: true
    createdAt?: true
    documentId?: true
  }

  export type TextChunkCountAggregateInputType = {
    id?: true
    index?: true
    text?: true
    tokenCount?: true
    mode?: true
    processed?: true
    audioPath?: true
    audioDuration?: true
    status?: true
    createdAt?: true
    documentId?: true
    _all?: true
  }

  export type TextChunkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TextChunk to aggregate.
     */
    where?: TextChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TextChunks to fetch.
     */
    orderBy?: TextChunkOrderByWithRelationInput | TextChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TextChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TextChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TextChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TextChunks
    **/
    _count?: true | TextChunkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TextChunkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TextChunkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TextChunkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TextChunkMaxAggregateInputType
  }

  export type GetTextChunkAggregateType<T extends TextChunkAggregateArgs> = {
        [P in keyof T & keyof AggregateTextChunk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTextChunk[P]>
      : GetScalarType<T[P], AggregateTextChunk[P]>
  }




  export type TextChunkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TextChunkWhereInput
    orderBy?: TextChunkOrderByWithAggregationInput | TextChunkOrderByWithAggregationInput[]
    by: TextChunkScalarFieldEnum[] | TextChunkScalarFieldEnum
    having?: TextChunkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TextChunkCountAggregateInputType | true
    _avg?: TextChunkAvgAggregateInputType
    _sum?: TextChunkSumAggregateInputType
    _min?: TextChunkMinAggregateInputType
    _max?: TextChunkMaxAggregateInputType
  }

  export type TextChunkGroupByOutputType = {
    id: string
    index: number
    text: string
    tokenCount: number | null
    mode: $Enums.ProcessingMode
    processed: string | null
    audioPath: string | null
    audioDuration: number | null
    status: $Enums.ChunkStatus
    createdAt: Date
    documentId: string
    _count: TextChunkCountAggregateOutputType | null
    _avg: TextChunkAvgAggregateOutputType | null
    _sum: TextChunkSumAggregateOutputType | null
    _min: TextChunkMinAggregateOutputType | null
    _max: TextChunkMaxAggregateOutputType | null
  }

  type GetTextChunkGroupByPayload<T extends TextChunkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TextChunkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TextChunkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TextChunkGroupByOutputType[P]>
            : GetScalarType<T[P], TextChunkGroupByOutputType[P]>
        }
      >
    >


  export type TextChunkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    index?: boolean
    text?: boolean
    tokenCount?: boolean
    mode?: boolean
    processed?: boolean
    audioPath?: boolean
    audioDuration?: boolean
    status?: boolean
    createdAt?: boolean
    documentId?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["textChunk"]>

  export type TextChunkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    index?: boolean
    text?: boolean
    tokenCount?: boolean
    mode?: boolean
    processed?: boolean
    audioPath?: boolean
    audioDuration?: boolean
    status?: boolean
    createdAt?: boolean
    documentId?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["textChunk"]>

  export type TextChunkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    index?: boolean
    text?: boolean
    tokenCount?: boolean
    mode?: boolean
    processed?: boolean
    audioPath?: boolean
    audioDuration?: boolean
    status?: boolean
    createdAt?: boolean
    documentId?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["textChunk"]>

  export type TextChunkSelectScalar = {
    id?: boolean
    index?: boolean
    text?: boolean
    tokenCount?: boolean
    mode?: boolean
    processed?: boolean
    audioPath?: boolean
    audioDuration?: boolean
    status?: boolean
    createdAt?: boolean
    documentId?: boolean
  }

  export type TextChunkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "index" | "text" | "tokenCount" | "mode" | "processed" | "audioPath" | "audioDuration" | "status" | "createdAt" | "documentId", ExtArgs["result"]["textChunk"]>
  export type TextChunkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type TextChunkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type TextChunkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $TextChunkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TextChunk"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      index: number
      text: string
      tokenCount: number | null
      mode: $Enums.ProcessingMode
      processed: string | null
      audioPath: string | null
      audioDuration: number | null
      status: $Enums.ChunkStatus
      createdAt: Date
      documentId: string
    }, ExtArgs["result"]["textChunk"]>
    composites: {}
  }

  type TextChunkGetPayload<S extends boolean | null | undefined | TextChunkDefaultArgs> = $Result.GetResult<Prisma.$TextChunkPayload, S>

  type TextChunkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TextChunkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TextChunkCountAggregateInputType | true
    }

  export interface TextChunkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TextChunk'], meta: { name: 'TextChunk' } }
    /**
     * Find zero or one TextChunk that matches the filter.
     * @param {TextChunkFindUniqueArgs} args - Arguments to find a TextChunk
     * @example
     * // Get one TextChunk
     * const textChunk = await prisma.textChunk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TextChunkFindUniqueArgs>(args: SelectSubset<T, TextChunkFindUniqueArgs<ExtArgs>>): Prisma__TextChunkClient<$Result.GetResult<Prisma.$TextChunkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TextChunk that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TextChunkFindUniqueOrThrowArgs} args - Arguments to find a TextChunk
     * @example
     * // Get one TextChunk
     * const textChunk = await prisma.textChunk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TextChunkFindUniqueOrThrowArgs>(args: SelectSubset<T, TextChunkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TextChunkClient<$Result.GetResult<Prisma.$TextChunkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TextChunk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextChunkFindFirstArgs} args - Arguments to find a TextChunk
     * @example
     * // Get one TextChunk
     * const textChunk = await prisma.textChunk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TextChunkFindFirstArgs>(args?: SelectSubset<T, TextChunkFindFirstArgs<ExtArgs>>): Prisma__TextChunkClient<$Result.GetResult<Prisma.$TextChunkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TextChunk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextChunkFindFirstOrThrowArgs} args - Arguments to find a TextChunk
     * @example
     * // Get one TextChunk
     * const textChunk = await prisma.textChunk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TextChunkFindFirstOrThrowArgs>(args?: SelectSubset<T, TextChunkFindFirstOrThrowArgs<ExtArgs>>): Prisma__TextChunkClient<$Result.GetResult<Prisma.$TextChunkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TextChunks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextChunkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TextChunks
     * const textChunks = await prisma.textChunk.findMany()
     * 
     * // Get first 10 TextChunks
     * const textChunks = await prisma.textChunk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const textChunkWithIdOnly = await prisma.textChunk.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TextChunkFindManyArgs>(args?: SelectSubset<T, TextChunkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TextChunk.
     * @param {TextChunkCreateArgs} args - Arguments to create a TextChunk.
     * @example
     * // Create one TextChunk
     * const TextChunk = await prisma.textChunk.create({
     *   data: {
     *     // ... data to create a TextChunk
     *   }
     * })
     * 
     */
    create<T extends TextChunkCreateArgs>(args: SelectSubset<T, TextChunkCreateArgs<ExtArgs>>): Prisma__TextChunkClient<$Result.GetResult<Prisma.$TextChunkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TextChunks.
     * @param {TextChunkCreateManyArgs} args - Arguments to create many TextChunks.
     * @example
     * // Create many TextChunks
     * const textChunk = await prisma.textChunk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TextChunkCreateManyArgs>(args?: SelectSubset<T, TextChunkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TextChunks and returns the data saved in the database.
     * @param {TextChunkCreateManyAndReturnArgs} args - Arguments to create many TextChunks.
     * @example
     * // Create many TextChunks
     * const textChunk = await prisma.textChunk.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TextChunks and only return the `id`
     * const textChunkWithIdOnly = await prisma.textChunk.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TextChunkCreateManyAndReturnArgs>(args?: SelectSubset<T, TextChunkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextChunkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TextChunk.
     * @param {TextChunkDeleteArgs} args - Arguments to delete one TextChunk.
     * @example
     * // Delete one TextChunk
     * const TextChunk = await prisma.textChunk.delete({
     *   where: {
     *     // ... filter to delete one TextChunk
     *   }
     * })
     * 
     */
    delete<T extends TextChunkDeleteArgs>(args: SelectSubset<T, TextChunkDeleteArgs<ExtArgs>>): Prisma__TextChunkClient<$Result.GetResult<Prisma.$TextChunkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TextChunk.
     * @param {TextChunkUpdateArgs} args - Arguments to update one TextChunk.
     * @example
     * // Update one TextChunk
     * const textChunk = await prisma.textChunk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TextChunkUpdateArgs>(args: SelectSubset<T, TextChunkUpdateArgs<ExtArgs>>): Prisma__TextChunkClient<$Result.GetResult<Prisma.$TextChunkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TextChunks.
     * @param {TextChunkDeleteManyArgs} args - Arguments to filter TextChunks to delete.
     * @example
     * // Delete a few TextChunks
     * const { count } = await prisma.textChunk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TextChunkDeleteManyArgs>(args?: SelectSubset<T, TextChunkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TextChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextChunkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TextChunks
     * const textChunk = await prisma.textChunk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TextChunkUpdateManyArgs>(args: SelectSubset<T, TextChunkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TextChunks and returns the data updated in the database.
     * @param {TextChunkUpdateManyAndReturnArgs} args - Arguments to update many TextChunks.
     * @example
     * // Update many TextChunks
     * const textChunk = await prisma.textChunk.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TextChunks and only return the `id`
     * const textChunkWithIdOnly = await prisma.textChunk.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TextChunkUpdateManyAndReturnArgs>(args: SelectSubset<T, TextChunkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextChunkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TextChunk.
     * @param {TextChunkUpsertArgs} args - Arguments to update or create a TextChunk.
     * @example
     * // Update or create a TextChunk
     * const textChunk = await prisma.textChunk.upsert({
     *   create: {
     *     // ... data to create a TextChunk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TextChunk we want to update
     *   }
     * })
     */
    upsert<T extends TextChunkUpsertArgs>(args: SelectSubset<T, TextChunkUpsertArgs<ExtArgs>>): Prisma__TextChunkClient<$Result.GetResult<Prisma.$TextChunkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TextChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextChunkCountArgs} args - Arguments to filter TextChunks to count.
     * @example
     * // Count the number of TextChunks
     * const count = await prisma.textChunk.count({
     *   where: {
     *     // ... the filter for the TextChunks we want to count
     *   }
     * })
    **/
    count<T extends TextChunkCountArgs>(
      args?: Subset<T, TextChunkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TextChunkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TextChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextChunkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TextChunkAggregateArgs>(args: Subset<T, TextChunkAggregateArgs>): Prisma.PrismaPromise<GetTextChunkAggregateType<T>>

    /**
     * Group by TextChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextChunkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TextChunkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TextChunkGroupByArgs['orderBy'] }
        : { orderBy?: TextChunkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TextChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTextChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TextChunk model
   */
  readonly fields: TextChunkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TextChunk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TextChunkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TextChunk model
   */
  interface TextChunkFieldRefs {
    readonly id: FieldRef<"TextChunk", 'String'>
    readonly index: FieldRef<"TextChunk", 'Int'>
    readonly text: FieldRef<"TextChunk", 'String'>
    readonly tokenCount: FieldRef<"TextChunk", 'Int'>
    readonly mode: FieldRef<"TextChunk", 'ProcessingMode'>
    readonly processed: FieldRef<"TextChunk", 'String'>
    readonly audioPath: FieldRef<"TextChunk", 'String'>
    readonly audioDuration: FieldRef<"TextChunk", 'Float'>
    readonly status: FieldRef<"TextChunk", 'ChunkStatus'>
    readonly createdAt: FieldRef<"TextChunk", 'DateTime'>
    readonly documentId: FieldRef<"TextChunk", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TextChunk findUnique
   */
  export type TextChunkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkInclude<ExtArgs> | null
    /**
     * Filter, which TextChunk to fetch.
     */
    where: TextChunkWhereUniqueInput
  }

  /**
   * TextChunk findUniqueOrThrow
   */
  export type TextChunkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkInclude<ExtArgs> | null
    /**
     * Filter, which TextChunk to fetch.
     */
    where: TextChunkWhereUniqueInput
  }

  /**
   * TextChunk findFirst
   */
  export type TextChunkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkInclude<ExtArgs> | null
    /**
     * Filter, which TextChunk to fetch.
     */
    where?: TextChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TextChunks to fetch.
     */
    orderBy?: TextChunkOrderByWithRelationInput | TextChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TextChunks.
     */
    cursor?: TextChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TextChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TextChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TextChunks.
     */
    distinct?: TextChunkScalarFieldEnum | TextChunkScalarFieldEnum[]
  }

  /**
   * TextChunk findFirstOrThrow
   */
  export type TextChunkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkInclude<ExtArgs> | null
    /**
     * Filter, which TextChunk to fetch.
     */
    where?: TextChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TextChunks to fetch.
     */
    orderBy?: TextChunkOrderByWithRelationInput | TextChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TextChunks.
     */
    cursor?: TextChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TextChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TextChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TextChunks.
     */
    distinct?: TextChunkScalarFieldEnum | TextChunkScalarFieldEnum[]
  }

  /**
   * TextChunk findMany
   */
  export type TextChunkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkInclude<ExtArgs> | null
    /**
     * Filter, which TextChunks to fetch.
     */
    where?: TextChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TextChunks to fetch.
     */
    orderBy?: TextChunkOrderByWithRelationInput | TextChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TextChunks.
     */
    cursor?: TextChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TextChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TextChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TextChunks.
     */
    distinct?: TextChunkScalarFieldEnum | TextChunkScalarFieldEnum[]
  }

  /**
   * TextChunk create
   */
  export type TextChunkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkInclude<ExtArgs> | null
    /**
     * The data needed to create a TextChunk.
     */
    data: XOR<TextChunkCreateInput, TextChunkUncheckedCreateInput>
  }

  /**
   * TextChunk createMany
   */
  export type TextChunkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TextChunks.
     */
    data: TextChunkCreateManyInput | TextChunkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TextChunk createManyAndReturn
   */
  export type TextChunkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * The data used to create many TextChunks.
     */
    data: TextChunkCreateManyInput | TextChunkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TextChunk update
   */
  export type TextChunkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkInclude<ExtArgs> | null
    /**
     * The data needed to update a TextChunk.
     */
    data: XOR<TextChunkUpdateInput, TextChunkUncheckedUpdateInput>
    /**
     * Choose, which TextChunk to update.
     */
    where: TextChunkWhereUniqueInput
  }

  /**
   * TextChunk updateMany
   */
  export type TextChunkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TextChunks.
     */
    data: XOR<TextChunkUpdateManyMutationInput, TextChunkUncheckedUpdateManyInput>
    /**
     * Filter which TextChunks to update
     */
    where?: TextChunkWhereInput
    /**
     * Limit how many TextChunks to update.
     */
    limit?: number
  }

  /**
   * TextChunk updateManyAndReturn
   */
  export type TextChunkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * The data used to update TextChunks.
     */
    data: XOR<TextChunkUpdateManyMutationInput, TextChunkUncheckedUpdateManyInput>
    /**
     * Filter which TextChunks to update
     */
    where?: TextChunkWhereInput
    /**
     * Limit how many TextChunks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TextChunk upsert
   */
  export type TextChunkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkInclude<ExtArgs> | null
    /**
     * The filter to search for the TextChunk to update in case it exists.
     */
    where: TextChunkWhereUniqueInput
    /**
     * In case the TextChunk found by the `where` argument doesn't exist, create a new TextChunk with this data.
     */
    create: XOR<TextChunkCreateInput, TextChunkUncheckedCreateInput>
    /**
     * In case the TextChunk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TextChunkUpdateInput, TextChunkUncheckedUpdateInput>
  }

  /**
   * TextChunk delete
   */
  export type TextChunkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkInclude<ExtArgs> | null
    /**
     * Filter which TextChunk to delete.
     */
    where: TextChunkWhereUniqueInput
  }

  /**
   * TextChunk deleteMany
   */
  export type TextChunkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TextChunks to delete
     */
    where?: TextChunkWhereInput
    /**
     * Limit how many TextChunks to delete.
     */
    limit?: number
  }

  /**
   * TextChunk without action
   */
  export type TextChunkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextChunk
     */
    select?: TextChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextChunk
     */
    omit?: TextChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextChunkInclude<ExtArgs> | null
  }


  /**
   * Model AudioChunk
   */

  export type AggregateAudioChunk = {
    _count: AudioChunkCountAggregateOutputType | null
    _avg: AudioChunkAvgAggregateOutputType | null
    _sum: AudioChunkSumAggregateOutputType | null
    _min: AudioChunkMinAggregateOutputType | null
    _max: AudioChunkMaxAggregateOutputType | null
  }

  export type AudioChunkAvgAggregateOutputType = {
    duration: number | null
    chunkIndex: number | null
  }

  export type AudioChunkSumAggregateOutputType = {
    duration: number | null
    chunkIndex: number | null
  }

  export type AudioChunkMinAggregateOutputType = {
    id: string | null
    s3Key: string | null
    s3Url: string | null
    duration: number | null
    textHash: string | null
    createdAt: Date | null
    documentId: string | null
    chunkIndex: number | null
  }

  export type AudioChunkMaxAggregateOutputType = {
    id: string | null
    s3Key: string | null
    s3Url: string | null
    duration: number | null
    textHash: string | null
    createdAt: Date | null
    documentId: string | null
    chunkIndex: number | null
  }

  export type AudioChunkCountAggregateOutputType = {
    id: number
    s3Key: number
    s3Url: number
    duration: number
    textHash: number
    createdAt: number
    documentId: number
    chunkIndex: number
    _all: number
  }


  export type AudioChunkAvgAggregateInputType = {
    duration?: true
    chunkIndex?: true
  }

  export type AudioChunkSumAggregateInputType = {
    duration?: true
    chunkIndex?: true
  }

  export type AudioChunkMinAggregateInputType = {
    id?: true
    s3Key?: true
    s3Url?: true
    duration?: true
    textHash?: true
    createdAt?: true
    documentId?: true
    chunkIndex?: true
  }

  export type AudioChunkMaxAggregateInputType = {
    id?: true
    s3Key?: true
    s3Url?: true
    duration?: true
    textHash?: true
    createdAt?: true
    documentId?: true
    chunkIndex?: true
  }

  export type AudioChunkCountAggregateInputType = {
    id?: true
    s3Key?: true
    s3Url?: true
    duration?: true
    textHash?: true
    createdAt?: true
    documentId?: true
    chunkIndex?: true
    _all?: true
  }

  export type AudioChunkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AudioChunk to aggregate.
     */
    where?: AudioChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AudioChunks to fetch.
     */
    orderBy?: AudioChunkOrderByWithRelationInput | AudioChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AudioChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AudioChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AudioChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AudioChunks
    **/
    _count?: true | AudioChunkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AudioChunkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AudioChunkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AudioChunkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AudioChunkMaxAggregateInputType
  }

  export type GetAudioChunkAggregateType<T extends AudioChunkAggregateArgs> = {
        [P in keyof T & keyof AggregateAudioChunk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAudioChunk[P]>
      : GetScalarType<T[P], AggregateAudioChunk[P]>
  }




  export type AudioChunkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AudioChunkWhereInput
    orderBy?: AudioChunkOrderByWithAggregationInput | AudioChunkOrderByWithAggregationInput[]
    by: AudioChunkScalarFieldEnum[] | AudioChunkScalarFieldEnum
    having?: AudioChunkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AudioChunkCountAggregateInputType | true
    _avg?: AudioChunkAvgAggregateInputType
    _sum?: AudioChunkSumAggregateInputType
    _min?: AudioChunkMinAggregateInputType
    _max?: AudioChunkMaxAggregateInputType
  }

  export type AudioChunkGroupByOutputType = {
    id: string
    s3Key: string
    s3Url: string
    duration: number | null
    textHash: string | null
    createdAt: Date
    documentId: string
    chunkIndex: number
    _count: AudioChunkCountAggregateOutputType | null
    _avg: AudioChunkAvgAggregateOutputType | null
    _sum: AudioChunkSumAggregateOutputType | null
    _min: AudioChunkMinAggregateOutputType | null
    _max: AudioChunkMaxAggregateOutputType | null
  }

  type GetAudioChunkGroupByPayload<T extends AudioChunkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AudioChunkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AudioChunkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AudioChunkGroupByOutputType[P]>
            : GetScalarType<T[P], AudioChunkGroupByOutputType[P]>
        }
      >
    >


  export type AudioChunkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    s3Key?: boolean
    s3Url?: boolean
    duration?: boolean
    textHash?: boolean
    createdAt?: boolean
    documentId?: boolean
    chunkIndex?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audioChunk"]>

  export type AudioChunkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    s3Key?: boolean
    s3Url?: boolean
    duration?: boolean
    textHash?: boolean
    createdAt?: boolean
    documentId?: boolean
    chunkIndex?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audioChunk"]>

  export type AudioChunkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    s3Key?: boolean
    s3Url?: boolean
    duration?: boolean
    textHash?: boolean
    createdAt?: boolean
    documentId?: boolean
    chunkIndex?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["audioChunk"]>

  export type AudioChunkSelectScalar = {
    id?: boolean
    s3Key?: boolean
    s3Url?: boolean
    duration?: boolean
    textHash?: boolean
    createdAt?: boolean
    documentId?: boolean
    chunkIndex?: boolean
  }

  export type AudioChunkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "s3Key" | "s3Url" | "duration" | "textHash" | "createdAt" | "documentId" | "chunkIndex", ExtArgs["result"]["audioChunk"]>
  export type AudioChunkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type AudioChunkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type AudioChunkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $AudioChunkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AudioChunk"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      s3Key: string
      s3Url: string
      duration: number | null
      textHash: string | null
      createdAt: Date
      documentId: string
      chunkIndex: number
    }, ExtArgs["result"]["audioChunk"]>
    composites: {}
  }

  type AudioChunkGetPayload<S extends boolean | null | undefined | AudioChunkDefaultArgs> = $Result.GetResult<Prisma.$AudioChunkPayload, S>

  type AudioChunkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AudioChunkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AudioChunkCountAggregateInputType | true
    }

  export interface AudioChunkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AudioChunk'], meta: { name: 'AudioChunk' } }
    /**
     * Find zero or one AudioChunk that matches the filter.
     * @param {AudioChunkFindUniqueArgs} args - Arguments to find a AudioChunk
     * @example
     * // Get one AudioChunk
     * const audioChunk = await prisma.audioChunk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AudioChunkFindUniqueArgs>(args: SelectSubset<T, AudioChunkFindUniqueArgs<ExtArgs>>): Prisma__AudioChunkClient<$Result.GetResult<Prisma.$AudioChunkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AudioChunk that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AudioChunkFindUniqueOrThrowArgs} args - Arguments to find a AudioChunk
     * @example
     * // Get one AudioChunk
     * const audioChunk = await prisma.audioChunk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AudioChunkFindUniqueOrThrowArgs>(args: SelectSubset<T, AudioChunkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AudioChunkClient<$Result.GetResult<Prisma.$AudioChunkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AudioChunk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioChunkFindFirstArgs} args - Arguments to find a AudioChunk
     * @example
     * // Get one AudioChunk
     * const audioChunk = await prisma.audioChunk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AudioChunkFindFirstArgs>(args?: SelectSubset<T, AudioChunkFindFirstArgs<ExtArgs>>): Prisma__AudioChunkClient<$Result.GetResult<Prisma.$AudioChunkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AudioChunk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioChunkFindFirstOrThrowArgs} args - Arguments to find a AudioChunk
     * @example
     * // Get one AudioChunk
     * const audioChunk = await prisma.audioChunk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AudioChunkFindFirstOrThrowArgs>(args?: SelectSubset<T, AudioChunkFindFirstOrThrowArgs<ExtArgs>>): Prisma__AudioChunkClient<$Result.GetResult<Prisma.$AudioChunkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AudioChunks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioChunkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AudioChunks
     * const audioChunks = await prisma.audioChunk.findMany()
     * 
     * // Get first 10 AudioChunks
     * const audioChunks = await prisma.audioChunk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const audioChunkWithIdOnly = await prisma.audioChunk.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AudioChunkFindManyArgs>(args?: SelectSubset<T, AudioChunkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudioChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AudioChunk.
     * @param {AudioChunkCreateArgs} args - Arguments to create a AudioChunk.
     * @example
     * // Create one AudioChunk
     * const AudioChunk = await prisma.audioChunk.create({
     *   data: {
     *     // ... data to create a AudioChunk
     *   }
     * })
     * 
     */
    create<T extends AudioChunkCreateArgs>(args: SelectSubset<T, AudioChunkCreateArgs<ExtArgs>>): Prisma__AudioChunkClient<$Result.GetResult<Prisma.$AudioChunkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AudioChunks.
     * @param {AudioChunkCreateManyArgs} args - Arguments to create many AudioChunks.
     * @example
     * // Create many AudioChunks
     * const audioChunk = await prisma.audioChunk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AudioChunkCreateManyArgs>(args?: SelectSubset<T, AudioChunkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AudioChunks and returns the data saved in the database.
     * @param {AudioChunkCreateManyAndReturnArgs} args - Arguments to create many AudioChunks.
     * @example
     * // Create many AudioChunks
     * const audioChunk = await prisma.audioChunk.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AudioChunks and only return the `id`
     * const audioChunkWithIdOnly = await prisma.audioChunk.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AudioChunkCreateManyAndReturnArgs>(args?: SelectSubset<T, AudioChunkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudioChunkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AudioChunk.
     * @param {AudioChunkDeleteArgs} args - Arguments to delete one AudioChunk.
     * @example
     * // Delete one AudioChunk
     * const AudioChunk = await prisma.audioChunk.delete({
     *   where: {
     *     // ... filter to delete one AudioChunk
     *   }
     * })
     * 
     */
    delete<T extends AudioChunkDeleteArgs>(args: SelectSubset<T, AudioChunkDeleteArgs<ExtArgs>>): Prisma__AudioChunkClient<$Result.GetResult<Prisma.$AudioChunkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AudioChunk.
     * @param {AudioChunkUpdateArgs} args - Arguments to update one AudioChunk.
     * @example
     * // Update one AudioChunk
     * const audioChunk = await prisma.audioChunk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AudioChunkUpdateArgs>(args: SelectSubset<T, AudioChunkUpdateArgs<ExtArgs>>): Prisma__AudioChunkClient<$Result.GetResult<Prisma.$AudioChunkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AudioChunks.
     * @param {AudioChunkDeleteManyArgs} args - Arguments to filter AudioChunks to delete.
     * @example
     * // Delete a few AudioChunks
     * const { count } = await prisma.audioChunk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AudioChunkDeleteManyArgs>(args?: SelectSubset<T, AudioChunkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AudioChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioChunkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AudioChunks
     * const audioChunk = await prisma.audioChunk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AudioChunkUpdateManyArgs>(args: SelectSubset<T, AudioChunkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AudioChunks and returns the data updated in the database.
     * @param {AudioChunkUpdateManyAndReturnArgs} args - Arguments to update many AudioChunks.
     * @example
     * // Update many AudioChunks
     * const audioChunk = await prisma.audioChunk.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AudioChunks and only return the `id`
     * const audioChunkWithIdOnly = await prisma.audioChunk.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AudioChunkUpdateManyAndReturnArgs>(args: SelectSubset<T, AudioChunkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AudioChunkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AudioChunk.
     * @param {AudioChunkUpsertArgs} args - Arguments to update or create a AudioChunk.
     * @example
     * // Update or create a AudioChunk
     * const audioChunk = await prisma.audioChunk.upsert({
     *   create: {
     *     // ... data to create a AudioChunk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AudioChunk we want to update
     *   }
     * })
     */
    upsert<T extends AudioChunkUpsertArgs>(args: SelectSubset<T, AudioChunkUpsertArgs<ExtArgs>>): Prisma__AudioChunkClient<$Result.GetResult<Prisma.$AudioChunkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AudioChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioChunkCountArgs} args - Arguments to filter AudioChunks to count.
     * @example
     * // Count the number of AudioChunks
     * const count = await prisma.audioChunk.count({
     *   where: {
     *     // ... the filter for the AudioChunks we want to count
     *   }
     * })
    **/
    count<T extends AudioChunkCountArgs>(
      args?: Subset<T, AudioChunkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AudioChunkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AudioChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioChunkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AudioChunkAggregateArgs>(args: Subset<T, AudioChunkAggregateArgs>): Prisma.PrismaPromise<GetAudioChunkAggregateType<T>>

    /**
     * Group by AudioChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AudioChunkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AudioChunkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AudioChunkGroupByArgs['orderBy'] }
        : { orderBy?: AudioChunkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AudioChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAudioChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AudioChunk model
   */
  readonly fields: AudioChunkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AudioChunk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AudioChunkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AudioChunk model
   */
  interface AudioChunkFieldRefs {
    readonly id: FieldRef<"AudioChunk", 'String'>
    readonly s3Key: FieldRef<"AudioChunk", 'String'>
    readonly s3Url: FieldRef<"AudioChunk", 'String'>
    readonly duration: FieldRef<"AudioChunk", 'Float'>
    readonly textHash: FieldRef<"AudioChunk", 'String'>
    readonly createdAt: FieldRef<"AudioChunk", 'DateTime'>
    readonly documentId: FieldRef<"AudioChunk", 'String'>
    readonly chunkIndex: FieldRef<"AudioChunk", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AudioChunk findUnique
   */
  export type AudioChunkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkInclude<ExtArgs> | null
    /**
     * Filter, which AudioChunk to fetch.
     */
    where: AudioChunkWhereUniqueInput
  }

  /**
   * AudioChunk findUniqueOrThrow
   */
  export type AudioChunkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkInclude<ExtArgs> | null
    /**
     * Filter, which AudioChunk to fetch.
     */
    where: AudioChunkWhereUniqueInput
  }

  /**
   * AudioChunk findFirst
   */
  export type AudioChunkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkInclude<ExtArgs> | null
    /**
     * Filter, which AudioChunk to fetch.
     */
    where?: AudioChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AudioChunks to fetch.
     */
    orderBy?: AudioChunkOrderByWithRelationInput | AudioChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AudioChunks.
     */
    cursor?: AudioChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AudioChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AudioChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AudioChunks.
     */
    distinct?: AudioChunkScalarFieldEnum | AudioChunkScalarFieldEnum[]
  }

  /**
   * AudioChunk findFirstOrThrow
   */
  export type AudioChunkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkInclude<ExtArgs> | null
    /**
     * Filter, which AudioChunk to fetch.
     */
    where?: AudioChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AudioChunks to fetch.
     */
    orderBy?: AudioChunkOrderByWithRelationInput | AudioChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AudioChunks.
     */
    cursor?: AudioChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AudioChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AudioChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AudioChunks.
     */
    distinct?: AudioChunkScalarFieldEnum | AudioChunkScalarFieldEnum[]
  }

  /**
   * AudioChunk findMany
   */
  export type AudioChunkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkInclude<ExtArgs> | null
    /**
     * Filter, which AudioChunks to fetch.
     */
    where?: AudioChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AudioChunks to fetch.
     */
    orderBy?: AudioChunkOrderByWithRelationInput | AudioChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AudioChunks.
     */
    cursor?: AudioChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AudioChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AudioChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AudioChunks.
     */
    distinct?: AudioChunkScalarFieldEnum | AudioChunkScalarFieldEnum[]
  }

  /**
   * AudioChunk create
   */
  export type AudioChunkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkInclude<ExtArgs> | null
    /**
     * The data needed to create a AudioChunk.
     */
    data: XOR<AudioChunkCreateInput, AudioChunkUncheckedCreateInput>
  }

  /**
   * AudioChunk createMany
   */
  export type AudioChunkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AudioChunks.
     */
    data: AudioChunkCreateManyInput | AudioChunkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AudioChunk createManyAndReturn
   */
  export type AudioChunkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * The data used to create many AudioChunks.
     */
    data: AudioChunkCreateManyInput | AudioChunkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AudioChunk update
   */
  export type AudioChunkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkInclude<ExtArgs> | null
    /**
     * The data needed to update a AudioChunk.
     */
    data: XOR<AudioChunkUpdateInput, AudioChunkUncheckedUpdateInput>
    /**
     * Choose, which AudioChunk to update.
     */
    where: AudioChunkWhereUniqueInput
  }

  /**
   * AudioChunk updateMany
   */
  export type AudioChunkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AudioChunks.
     */
    data: XOR<AudioChunkUpdateManyMutationInput, AudioChunkUncheckedUpdateManyInput>
    /**
     * Filter which AudioChunks to update
     */
    where?: AudioChunkWhereInput
    /**
     * Limit how many AudioChunks to update.
     */
    limit?: number
  }

  /**
   * AudioChunk updateManyAndReturn
   */
  export type AudioChunkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * The data used to update AudioChunks.
     */
    data: XOR<AudioChunkUpdateManyMutationInput, AudioChunkUncheckedUpdateManyInput>
    /**
     * Filter which AudioChunks to update
     */
    where?: AudioChunkWhereInput
    /**
     * Limit how many AudioChunks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AudioChunk upsert
   */
  export type AudioChunkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkInclude<ExtArgs> | null
    /**
     * The filter to search for the AudioChunk to update in case it exists.
     */
    where: AudioChunkWhereUniqueInput
    /**
     * In case the AudioChunk found by the `where` argument doesn't exist, create a new AudioChunk with this data.
     */
    create: XOR<AudioChunkCreateInput, AudioChunkUncheckedCreateInput>
    /**
     * In case the AudioChunk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AudioChunkUpdateInput, AudioChunkUncheckedUpdateInput>
  }

  /**
   * AudioChunk delete
   */
  export type AudioChunkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkInclude<ExtArgs> | null
    /**
     * Filter which AudioChunk to delete.
     */
    where: AudioChunkWhereUniqueInput
  }

  /**
   * AudioChunk deleteMany
   */
  export type AudioChunkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AudioChunks to delete
     */
    where?: AudioChunkWhereInput
    /**
     * Limit how many AudioChunks to delete.
     */
    limit?: number
  }

  /**
   * AudioChunk without action
   */
  export type AudioChunkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AudioChunk
     */
    select?: AudioChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AudioChunk
     */
    omit?: AudioChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AudioChunkInclude<ExtArgs> | null
  }


  /**
   * Model PlaybackProgress
   */

  export type AggregatePlaybackProgress = {
    _count: PlaybackProgressCountAggregateOutputType | null
    _avg: PlaybackProgressAvgAggregateOutputType | null
    _sum: PlaybackProgressSumAggregateOutputType | null
    _min: PlaybackProgressMinAggregateOutputType | null
    _max: PlaybackProgressMaxAggregateOutputType | null
  }

  export type PlaybackProgressAvgAggregateOutputType = {
    time: number | null
    chunkIndex: number | null
  }

  export type PlaybackProgressSumAggregateOutputType = {
    time: number | null
    chunkIndex: number | null
  }

  export type PlaybackProgressMinAggregateOutputType = {
    id: string | null
    time: number | null
    chunkIndex: number | null
    mode: $Enums.ProcessingMode | null
    updatedAt: Date | null
    userId: string | null
    documentId: string | null
  }

  export type PlaybackProgressMaxAggregateOutputType = {
    id: string | null
    time: number | null
    chunkIndex: number | null
    mode: $Enums.ProcessingMode | null
    updatedAt: Date | null
    userId: string | null
    documentId: string | null
  }

  export type PlaybackProgressCountAggregateOutputType = {
    id: number
    time: number
    chunkIndex: number
    mode: number
    updatedAt: number
    userId: number
    documentId: number
    _all: number
  }


  export type PlaybackProgressAvgAggregateInputType = {
    time?: true
    chunkIndex?: true
  }

  export type PlaybackProgressSumAggregateInputType = {
    time?: true
    chunkIndex?: true
  }

  export type PlaybackProgressMinAggregateInputType = {
    id?: true
    time?: true
    chunkIndex?: true
    mode?: true
    updatedAt?: true
    userId?: true
    documentId?: true
  }

  export type PlaybackProgressMaxAggregateInputType = {
    id?: true
    time?: true
    chunkIndex?: true
    mode?: true
    updatedAt?: true
    userId?: true
    documentId?: true
  }

  export type PlaybackProgressCountAggregateInputType = {
    id?: true
    time?: true
    chunkIndex?: true
    mode?: true
    updatedAt?: true
    userId?: true
    documentId?: true
    _all?: true
  }

  export type PlaybackProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlaybackProgress to aggregate.
     */
    where?: PlaybackProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaybackProgresses to fetch.
     */
    orderBy?: PlaybackProgressOrderByWithRelationInput | PlaybackProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlaybackProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaybackProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaybackProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlaybackProgresses
    **/
    _count?: true | PlaybackProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlaybackProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlaybackProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaybackProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaybackProgressMaxAggregateInputType
  }

  export type GetPlaybackProgressAggregateType<T extends PlaybackProgressAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaybackProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaybackProgress[P]>
      : GetScalarType<T[P], AggregatePlaybackProgress[P]>
  }




  export type PlaybackProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaybackProgressWhereInput
    orderBy?: PlaybackProgressOrderByWithAggregationInput | PlaybackProgressOrderByWithAggregationInput[]
    by: PlaybackProgressScalarFieldEnum[] | PlaybackProgressScalarFieldEnum
    having?: PlaybackProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaybackProgressCountAggregateInputType | true
    _avg?: PlaybackProgressAvgAggregateInputType
    _sum?: PlaybackProgressSumAggregateInputType
    _min?: PlaybackProgressMinAggregateInputType
    _max?: PlaybackProgressMaxAggregateInputType
  }

  export type PlaybackProgressGroupByOutputType = {
    id: string
    time: number
    chunkIndex: number
    mode: $Enums.ProcessingMode
    updatedAt: Date
    userId: string
    documentId: string
    _count: PlaybackProgressCountAggregateOutputType | null
    _avg: PlaybackProgressAvgAggregateOutputType | null
    _sum: PlaybackProgressSumAggregateOutputType | null
    _min: PlaybackProgressMinAggregateOutputType | null
    _max: PlaybackProgressMaxAggregateOutputType | null
  }

  type GetPlaybackProgressGroupByPayload<T extends PlaybackProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaybackProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaybackProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaybackProgressGroupByOutputType[P]>
            : GetScalarType<T[P], PlaybackProgressGroupByOutputType[P]>
        }
      >
    >


  export type PlaybackProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    time?: boolean
    chunkIndex?: boolean
    mode?: boolean
    updatedAt?: boolean
    userId?: boolean
    documentId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playbackProgress"]>

  export type PlaybackProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    time?: boolean
    chunkIndex?: boolean
    mode?: boolean
    updatedAt?: boolean
    userId?: boolean
    documentId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playbackProgress"]>

  export type PlaybackProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    time?: boolean
    chunkIndex?: boolean
    mode?: boolean
    updatedAt?: boolean
    userId?: boolean
    documentId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playbackProgress"]>

  export type PlaybackProgressSelectScalar = {
    id?: boolean
    time?: boolean
    chunkIndex?: boolean
    mode?: boolean
    updatedAt?: boolean
    userId?: boolean
    documentId?: boolean
  }

  export type PlaybackProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "time" | "chunkIndex" | "mode" | "updatedAt" | "userId" | "documentId", ExtArgs["result"]["playbackProgress"]>
  export type PlaybackProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type PlaybackProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type PlaybackProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $PlaybackProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlaybackProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      document: Prisma.$DocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      time: number
      chunkIndex: number
      mode: $Enums.ProcessingMode
      updatedAt: Date
      userId: string
      documentId: string
    }, ExtArgs["result"]["playbackProgress"]>
    composites: {}
  }

  type PlaybackProgressGetPayload<S extends boolean | null | undefined | PlaybackProgressDefaultArgs> = $Result.GetResult<Prisma.$PlaybackProgressPayload, S>

  type PlaybackProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlaybackProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlaybackProgressCountAggregateInputType | true
    }

  export interface PlaybackProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlaybackProgress'], meta: { name: 'PlaybackProgress' } }
    /**
     * Find zero or one PlaybackProgress that matches the filter.
     * @param {PlaybackProgressFindUniqueArgs} args - Arguments to find a PlaybackProgress
     * @example
     * // Get one PlaybackProgress
     * const playbackProgress = await prisma.playbackProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlaybackProgressFindUniqueArgs>(args: SelectSubset<T, PlaybackProgressFindUniqueArgs<ExtArgs>>): Prisma__PlaybackProgressClient<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlaybackProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlaybackProgressFindUniqueOrThrowArgs} args - Arguments to find a PlaybackProgress
     * @example
     * // Get one PlaybackProgress
     * const playbackProgress = await prisma.playbackProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlaybackProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, PlaybackProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlaybackProgressClient<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlaybackProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybackProgressFindFirstArgs} args - Arguments to find a PlaybackProgress
     * @example
     * // Get one PlaybackProgress
     * const playbackProgress = await prisma.playbackProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlaybackProgressFindFirstArgs>(args?: SelectSubset<T, PlaybackProgressFindFirstArgs<ExtArgs>>): Prisma__PlaybackProgressClient<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlaybackProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybackProgressFindFirstOrThrowArgs} args - Arguments to find a PlaybackProgress
     * @example
     * // Get one PlaybackProgress
     * const playbackProgress = await prisma.playbackProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlaybackProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, PlaybackProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlaybackProgressClient<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlaybackProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybackProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlaybackProgresses
     * const playbackProgresses = await prisma.playbackProgress.findMany()
     * 
     * // Get first 10 PlaybackProgresses
     * const playbackProgresses = await prisma.playbackProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playbackProgressWithIdOnly = await prisma.playbackProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlaybackProgressFindManyArgs>(args?: SelectSubset<T, PlaybackProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlaybackProgress.
     * @param {PlaybackProgressCreateArgs} args - Arguments to create a PlaybackProgress.
     * @example
     * // Create one PlaybackProgress
     * const PlaybackProgress = await prisma.playbackProgress.create({
     *   data: {
     *     // ... data to create a PlaybackProgress
     *   }
     * })
     * 
     */
    create<T extends PlaybackProgressCreateArgs>(args: SelectSubset<T, PlaybackProgressCreateArgs<ExtArgs>>): Prisma__PlaybackProgressClient<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlaybackProgresses.
     * @param {PlaybackProgressCreateManyArgs} args - Arguments to create many PlaybackProgresses.
     * @example
     * // Create many PlaybackProgresses
     * const playbackProgress = await prisma.playbackProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlaybackProgressCreateManyArgs>(args?: SelectSubset<T, PlaybackProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlaybackProgresses and returns the data saved in the database.
     * @param {PlaybackProgressCreateManyAndReturnArgs} args - Arguments to create many PlaybackProgresses.
     * @example
     * // Create many PlaybackProgresses
     * const playbackProgress = await prisma.playbackProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlaybackProgresses and only return the `id`
     * const playbackProgressWithIdOnly = await prisma.playbackProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlaybackProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, PlaybackProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlaybackProgress.
     * @param {PlaybackProgressDeleteArgs} args - Arguments to delete one PlaybackProgress.
     * @example
     * // Delete one PlaybackProgress
     * const PlaybackProgress = await prisma.playbackProgress.delete({
     *   where: {
     *     // ... filter to delete one PlaybackProgress
     *   }
     * })
     * 
     */
    delete<T extends PlaybackProgressDeleteArgs>(args: SelectSubset<T, PlaybackProgressDeleteArgs<ExtArgs>>): Prisma__PlaybackProgressClient<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlaybackProgress.
     * @param {PlaybackProgressUpdateArgs} args - Arguments to update one PlaybackProgress.
     * @example
     * // Update one PlaybackProgress
     * const playbackProgress = await prisma.playbackProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlaybackProgressUpdateArgs>(args: SelectSubset<T, PlaybackProgressUpdateArgs<ExtArgs>>): Prisma__PlaybackProgressClient<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlaybackProgresses.
     * @param {PlaybackProgressDeleteManyArgs} args - Arguments to filter PlaybackProgresses to delete.
     * @example
     * // Delete a few PlaybackProgresses
     * const { count } = await prisma.playbackProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlaybackProgressDeleteManyArgs>(args?: SelectSubset<T, PlaybackProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlaybackProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybackProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlaybackProgresses
     * const playbackProgress = await prisma.playbackProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlaybackProgressUpdateManyArgs>(args: SelectSubset<T, PlaybackProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlaybackProgresses and returns the data updated in the database.
     * @param {PlaybackProgressUpdateManyAndReturnArgs} args - Arguments to update many PlaybackProgresses.
     * @example
     * // Update many PlaybackProgresses
     * const playbackProgress = await prisma.playbackProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlaybackProgresses and only return the `id`
     * const playbackProgressWithIdOnly = await prisma.playbackProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlaybackProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, PlaybackProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlaybackProgress.
     * @param {PlaybackProgressUpsertArgs} args - Arguments to update or create a PlaybackProgress.
     * @example
     * // Update or create a PlaybackProgress
     * const playbackProgress = await prisma.playbackProgress.upsert({
     *   create: {
     *     // ... data to create a PlaybackProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlaybackProgress we want to update
     *   }
     * })
     */
    upsert<T extends PlaybackProgressUpsertArgs>(args: SelectSubset<T, PlaybackProgressUpsertArgs<ExtArgs>>): Prisma__PlaybackProgressClient<$Result.GetResult<Prisma.$PlaybackProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlaybackProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybackProgressCountArgs} args - Arguments to filter PlaybackProgresses to count.
     * @example
     * // Count the number of PlaybackProgresses
     * const count = await prisma.playbackProgress.count({
     *   where: {
     *     // ... the filter for the PlaybackProgresses we want to count
     *   }
     * })
    **/
    count<T extends PlaybackProgressCountArgs>(
      args?: Subset<T, PlaybackProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaybackProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlaybackProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybackProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlaybackProgressAggregateArgs>(args: Subset<T, PlaybackProgressAggregateArgs>): Prisma.PrismaPromise<GetPlaybackProgressAggregateType<T>>

    /**
     * Group by PlaybackProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaybackProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlaybackProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlaybackProgressGroupByArgs['orderBy'] }
        : { orderBy?: PlaybackProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlaybackProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaybackProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlaybackProgress model
   */
  readonly fields: PlaybackProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlaybackProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlaybackProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlaybackProgress model
   */
  interface PlaybackProgressFieldRefs {
    readonly id: FieldRef<"PlaybackProgress", 'String'>
    readonly time: FieldRef<"PlaybackProgress", 'Float'>
    readonly chunkIndex: FieldRef<"PlaybackProgress", 'Int'>
    readonly mode: FieldRef<"PlaybackProgress", 'ProcessingMode'>
    readonly updatedAt: FieldRef<"PlaybackProgress", 'DateTime'>
    readonly userId: FieldRef<"PlaybackProgress", 'String'>
    readonly documentId: FieldRef<"PlaybackProgress", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PlaybackProgress findUnique
   */
  export type PlaybackProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressInclude<ExtArgs> | null
    /**
     * Filter, which PlaybackProgress to fetch.
     */
    where: PlaybackProgressWhereUniqueInput
  }

  /**
   * PlaybackProgress findUniqueOrThrow
   */
  export type PlaybackProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressInclude<ExtArgs> | null
    /**
     * Filter, which PlaybackProgress to fetch.
     */
    where: PlaybackProgressWhereUniqueInput
  }

  /**
   * PlaybackProgress findFirst
   */
  export type PlaybackProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressInclude<ExtArgs> | null
    /**
     * Filter, which PlaybackProgress to fetch.
     */
    where?: PlaybackProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaybackProgresses to fetch.
     */
    orderBy?: PlaybackProgressOrderByWithRelationInput | PlaybackProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlaybackProgresses.
     */
    cursor?: PlaybackProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaybackProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaybackProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaybackProgresses.
     */
    distinct?: PlaybackProgressScalarFieldEnum | PlaybackProgressScalarFieldEnum[]
  }

  /**
   * PlaybackProgress findFirstOrThrow
   */
  export type PlaybackProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressInclude<ExtArgs> | null
    /**
     * Filter, which PlaybackProgress to fetch.
     */
    where?: PlaybackProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaybackProgresses to fetch.
     */
    orderBy?: PlaybackProgressOrderByWithRelationInput | PlaybackProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlaybackProgresses.
     */
    cursor?: PlaybackProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaybackProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaybackProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaybackProgresses.
     */
    distinct?: PlaybackProgressScalarFieldEnum | PlaybackProgressScalarFieldEnum[]
  }

  /**
   * PlaybackProgress findMany
   */
  export type PlaybackProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressInclude<ExtArgs> | null
    /**
     * Filter, which PlaybackProgresses to fetch.
     */
    where?: PlaybackProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlaybackProgresses to fetch.
     */
    orderBy?: PlaybackProgressOrderByWithRelationInput | PlaybackProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlaybackProgresses.
     */
    cursor?: PlaybackProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlaybackProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlaybackProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlaybackProgresses.
     */
    distinct?: PlaybackProgressScalarFieldEnum | PlaybackProgressScalarFieldEnum[]
  }

  /**
   * PlaybackProgress create
   */
  export type PlaybackProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a PlaybackProgress.
     */
    data: XOR<PlaybackProgressCreateInput, PlaybackProgressUncheckedCreateInput>
  }

  /**
   * PlaybackProgress createMany
   */
  export type PlaybackProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlaybackProgresses.
     */
    data: PlaybackProgressCreateManyInput | PlaybackProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlaybackProgress createManyAndReturn
   */
  export type PlaybackProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * The data used to create many PlaybackProgresses.
     */
    data: PlaybackProgressCreateManyInput | PlaybackProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlaybackProgress update
   */
  export type PlaybackProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a PlaybackProgress.
     */
    data: XOR<PlaybackProgressUpdateInput, PlaybackProgressUncheckedUpdateInput>
    /**
     * Choose, which PlaybackProgress to update.
     */
    where: PlaybackProgressWhereUniqueInput
  }

  /**
   * PlaybackProgress updateMany
   */
  export type PlaybackProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlaybackProgresses.
     */
    data: XOR<PlaybackProgressUpdateManyMutationInput, PlaybackProgressUncheckedUpdateManyInput>
    /**
     * Filter which PlaybackProgresses to update
     */
    where?: PlaybackProgressWhereInput
    /**
     * Limit how many PlaybackProgresses to update.
     */
    limit?: number
  }

  /**
   * PlaybackProgress updateManyAndReturn
   */
  export type PlaybackProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * The data used to update PlaybackProgresses.
     */
    data: XOR<PlaybackProgressUpdateManyMutationInput, PlaybackProgressUncheckedUpdateManyInput>
    /**
     * Filter which PlaybackProgresses to update
     */
    where?: PlaybackProgressWhereInput
    /**
     * Limit how many PlaybackProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlaybackProgress upsert
   */
  export type PlaybackProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the PlaybackProgress to update in case it exists.
     */
    where: PlaybackProgressWhereUniqueInput
    /**
     * In case the PlaybackProgress found by the `where` argument doesn't exist, create a new PlaybackProgress with this data.
     */
    create: XOR<PlaybackProgressCreateInput, PlaybackProgressUncheckedCreateInput>
    /**
     * In case the PlaybackProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlaybackProgressUpdateInput, PlaybackProgressUncheckedUpdateInput>
  }

  /**
   * PlaybackProgress delete
   */
  export type PlaybackProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressInclude<ExtArgs> | null
    /**
     * Filter which PlaybackProgress to delete.
     */
    where: PlaybackProgressWhereUniqueInput
  }

  /**
   * PlaybackProgress deleteMany
   */
  export type PlaybackProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlaybackProgresses to delete
     */
    where?: PlaybackProgressWhereInput
    /**
     * Limit how many PlaybackProgresses to delete.
     */
    limit?: number
  }

  /**
   * PlaybackProgress without action
   */
  export type PlaybackProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaybackProgress
     */
    select?: PlaybackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlaybackProgress
     */
    omit?: PlaybackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaybackProgressInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    isPremium: 'isPremium',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    fileName: 'fileName',
    fileUrl: 'fileUrl',
    fileSize: 'fileSize',
    pageCount: 'pageCount',
    extractedText: 'extractedText',
    language: 'language',
    status: 'status',
    audioDuration: 'audioDuration',
    totalChunks: 'totalChunks',
    processedChunks: 'processedChunks',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    errorMessage: 'errorMessage',
    errorCode: 'errorCode',
    failedAt: 'failedAt',
    userId: 'userId'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const TextChunkScalarFieldEnum: {
    id: 'id',
    index: 'index',
    text: 'text',
    tokenCount: 'tokenCount',
    mode: 'mode',
    processed: 'processed',
    audioPath: 'audioPath',
    audioDuration: 'audioDuration',
    status: 'status',
    createdAt: 'createdAt',
    documentId: 'documentId'
  };

  export type TextChunkScalarFieldEnum = (typeof TextChunkScalarFieldEnum)[keyof typeof TextChunkScalarFieldEnum]


  export const AudioChunkScalarFieldEnum: {
    id: 'id',
    s3Key: 's3Key',
    s3Url: 's3Url',
    duration: 'duration',
    textHash: 'textHash',
    createdAt: 'createdAt',
    documentId: 'documentId',
    chunkIndex: 'chunkIndex'
  };

  export type AudioChunkScalarFieldEnum = (typeof AudioChunkScalarFieldEnum)[keyof typeof AudioChunkScalarFieldEnum]


  export const PlaybackProgressScalarFieldEnum: {
    id: 'id',
    time: 'time',
    chunkIndex: 'chunkIndex',
    mode: 'mode',
    updatedAt: 'updatedAt',
    userId: 'userId',
    documentId: 'documentId'
  };

  export type PlaybackProgressScalarFieldEnum = (typeof PlaybackProgressScalarFieldEnum)[keyof typeof PlaybackProgressScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DocumentStatus'
   */
  export type EnumDocumentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatus'>
    


  /**
   * Reference to a field of type 'DocumentStatus[]'
   */
  export type ListEnumDocumentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'ProcessingMode'
   */
  export type EnumProcessingModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProcessingMode'>
    


  /**
   * Reference to a field of type 'ProcessingMode[]'
   */
  export type ListEnumProcessingModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProcessingMode[]'>
    


  /**
   * Reference to a field of type 'ChunkStatus'
   */
  export type EnumChunkStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChunkStatus'>
    


  /**
   * Reference to a field of type 'ChunkStatus[]'
   */
  export type ListEnumChunkStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChunkStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    isPremium?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    documents?: DocumentListRelationFilter
    playbackProgress?: PlaybackProgressListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    isPremium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    documents?: DocumentOrderByRelationAggregateInput
    playbackProgress?: PlaybackProgressOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    isPremium?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    documents?: DocumentListRelationFilter
    playbackProgress?: PlaybackProgressListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    isPremium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    isPremium?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    title?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    fileUrl?: StringFilter<"Document"> | string
    fileSize?: IntNullableFilter<"Document"> | number | null
    pageCount?: IntNullableFilter<"Document"> | number | null
    extractedText?: StringNullableFilter<"Document"> | string | null
    language?: StringFilter<"Document"> | string
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    audioDuration?: FloatNullableFilter<"Document"> | number | null
    totalChunks?: IntFilter<"Document"> | number
    processedChunks?: IntFilter<"Document"> | number
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    errorMessage?: StringNullableFilter<"Document"> | string | null
    errorCode?: StringNullableFilter<"Document"> | string | null
    failedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    userId?: StringFilter<"Document"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    chunks?: TextChunkListRelationFilter
    audioChunks?: AudioChunkListRelationFilter
    playbackProgress?: PlaybackProgressListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrderInput | SortOrder
    pageCount?: SortOrderInput | SortOrder
    extractedText?: SortOrderInput | SortOrder
    language?: SortOrder
    status?: SortOrder
    audioDuration?: SortOrderInput | SortOrder
    totalChunks?: SortOrder
    processedChunks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    errorCode?: SortOrderInput | SortOrder
    failedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    chunks?: TextChunkOrderByRelationAggregateInput
    audioChunks?: AudioChunkOrderByRelationAggregateInput
    playbackProgress?: PlaybackProgressOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    title?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    fileUrl?: StringFilter<"Document"> | string
    fileSize?: IntNullableFilter<"Document"> | number | null
    pageCount?: IntNullableFilter<"Document"> | number | null
    extractedText?: StringNullableFilter<"Document"> | string | null
    language?: StringFilter<"Document"> | string
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    audioDuration?: FloatNullableFilter<"Document"> | number | null
    totalChunks?: IntFilter<"Document"> | number
    processedChunks?: IntFilter<"Document"> | number
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    errorMessage?: StringNullableFilter<"Document"> | string | null
    errorCode?: StringNullableFilter<"Document"> | string | null
    failedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    userId?: StringFilter<"Document"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    chunks?: TextChunkListRelationFilter
    audioChunks?: AudioChunkListRelationFilter
    playbackProgress?: PlaybackProgressListRelationFilter
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrderInput | SortOrder
    pageCount?: SortOrderInput | SortOrder
    extractedText?: SortOrderInput | SortOrder
    language?: SortOrder
    status?: SortOrder
    audioDuration?: SortOrderInput | SortOrder
    totalChunks?: SortOrder
    processedChunks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    errorCode?: SortOrderInput | SortOrder
    failedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    title?: StringWithAggregatesFilter<"Document"> | string
    fileName?: StringWithAggregatesFilter<"Document"> | string
    fileUrl?: StringWithAggregatesFilter<"Document"> | string
    fileSize?: IntNullableWithAggregatesFilter<"Document"> | number | null
    pageCount?: IntNullableWithAggregatesFilter<"Document"> | number | null
    extractedText?: StringNullableWithAggregatesFilter<"Document"> | string | null
    language?: StringWithAggregatesFilter<"Document"> | string
    status?: EnumDocumentStatusWithAggregatesFilter<"Document"> | $Enums.DocumentStatus
    audioDuration?: FloatNullableWithAggregatesFilter<"Document"> | number | null
    totalChunks?: IntWithAggregatesFilter<"Document"> | number
    processedChunks?: IntWithAggregatesFilter<"Document"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    errorMessage?: StringNullableWithAggregatesFilter<"Document"> | string | null
    errorCode?: StringNullableWithAggregatesFilter<"Document"> | string | null
    failedAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
    userId?: StringWithAggregatesFilter<"Document"> | string
  }

  export type TextChunkWhereInput = {
    AND?: TextChunkWhereInput | TextChunkWhereInput[]
    OR?: TextChunkWhereInput[]
    NOT?: TextChunkWhereInput | TextChunkWhereInput[]
    id?: StringFilter<"TextChunk"> | string
    index?: IntFilter<"TextChunk"> | number
    text?: StringFilter<"TextChunk"> | string
    tokenCount?: IntNullableFilter<"TextChunk"> | number | null
    mode?: EnumProcessingModeFilter<"TextChunk"> | $Enums.ProcessingMode
    processed?: StringNullableFilter<"TextChunk"> | string | null
    audioPath?: StringNullableFilter<"TextChunk"> | string | null
    audioDuration?: FloatNullableFilter<"TextChunk"> | number | null
    status?: EnumChunkStatusFilter<"TextChunk"> | $Enums.ChunkStatus
    createdAt?: DateTimeFilter<"TextChunk"> | Date | string
    documentId?: StringFilter<"TextChunk"> | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }

  export type TextChunkOrderByWithRelationInput = {
    id?: SortOrder
    index?: SortOrder
    text?: SortOrder
    tokenCount?: SortOrderInput | SortOrder
    mode?: SortOrder
    processed?: SortOrderInput | SortOrder
    audioPath?: SortOrderInput | SortOrder
    audioDuration?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    documentId?: SortOrder
    document?: DocumentOrderByWithRelationInput
  }

  export type TextChunkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    documentId_index_mode?: TextChunkDocumentIdIndexModeCompoundUniqueInput
    AND?: TextChunkWhereInput | TextChunkWhereInput[]
    OR?: TextChunkWhereInput[]
    NOT?: TextChunkWhereInput | TextChunkWhereInput[]
    index?: IntFilter<"TextChunk"> | number
    text?: StringFilter<"TextChunk"> | string
    tokenCount?: IntNullableFilter<"TextChunk"> | number | null
    mode?: EnumProcessingModeFilter<"TextChunk"> | $Enums.ProcessingMode
    processed?: StringNullableFilter<"TextChunk"> | string | null
    audioPath?: StringNullableFilter<"TextChunk"> | string | null
    audioDuration?: FloatNullableFilter<"TextChunk"> | number | null
    status?: EnumChunkStatusFilter<"TextChunk"> | $Enums.ChunkStatus
    createdAt?: DateTimeFilter<"TextChunk"> | Date | string
    documentId?: StringFilter<"TextChunk"> | string
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }, "id" | "documentId_index_mode">

  export type TextChunkOrderByWithAggregationInput = {
    id?: SortOrder
    index?: SortOrder
    text?: SortOrder
    tokenCount?: SortOrderInput | SortOrder
    mode?: SortOrder
    processed?: SortOrderInput | SortOrder
    audioPath?: SortOrderInput | SortOrder
    audioDuration?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    documentId?: SortOrder
    _count?: TextChunkCountOrderByAggregateInput
    _avg?: TextChunkAvgOrderByAggregateInput
    _max?: TextChunkMaxOrderByAggregateInput
    _min?: TextChunkMinOrderByAggregateInput
    _sum?: TextChunkSumOrderByAggregateInput
  }

  export type TextChunkScalarWhereWithAggregatesInput = {
    AND?: TextChunkScalarWhereWithAggregatesInput | TextChunkScalarWhereWithAggregatesInput[]
    OR?: TextChunkScalarWhereWithAggregatesInput[]
    NOT?: TextChunkScalarWhereWithAggregatesInput | TextChunkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TextChunk"> | string
    index?: IntWithAggregatesFilter<"TextChunk"> | number
    text?: StringWithAggregatesFilter<"TextChunk"> | string
    tokenCount?: IntNullableWithAggregatesFilter<"TextChunk"> | number | null
    mode?: EnumProcessingModeWithAggregatesFilter<"TextChunk"> | $Enums.ProcessingMode
    processed?: StringNullableWithAggregatesFilter<"TextChunk"> | string | null
    audioPath?: StringNullableWithAggregatesFilter<"TextChunk"> | string | null
    audioDuration?: FloatNullableWithAggregatesFilter<"TextChunk"> | number | null
    status?: EnumChunkStatusWithAggregatesFilter<"TextChunk"> | $Enums.ChunkStatus
    createdAt?: DateTimeWithAggregatesFilter<"TextChunk"> | Date | string
    documentId?: StringWithAggregatesFilter<"TextChunk"> | string
  }

  export type AudioChunkWhereInput = {
    AND?: AudioChunkWhereInput | AudioChunkWhereInput[]
    OR?: AudioChunkWhereInput[]
    NOT?: AudioChunkWhereInput | AudioChunkWhereInput[]
    id?: StringFilter<"AudioChunk"> | string
    s3Key?: StringFilter<"AudioChunk"> | string
    s3Url?: StringFilter<"AudioChunk"> | string
    duration?: FloatNullableFilter<"AudioChunk"> | number | null
    textHash?: StringNullableFilter<"AudioChunk"> | string | null
    createdAt?: DateTimeFilter<"AudioChunk"> | Date | string
    documentId?: StringFilter<"AudioChunk"> | string
    chunkIndex?: IntFilter<"AudioChunk"> | number
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }

  export type AudioChunkOrderByWithRelationInput = {
    id?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    duration?: SortOrderInput | SortOrder
    textHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    documentId?: SortOrder
    chunkIndex?: SortOrder
    document?: DocumentOrderByWithRelationInput
  }

  export type AudioChunkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    documentId_chunkIndex?: AudioChunkDocumentIdChunkIndexCompoundUniqueInput
    AND?: AudioChunkWhereInput | AudioChunkWhereInput[]
    OR?: AudioChunkWhereInput[]
    NOT?: AudioChunkWhereInput | AudioChunkWhereInput[]
    s3Key?: StringFilter<"AudioChunk"> | string
    s3Url?: StringFilter<"AudioChunk"> | string
    duration?: FloatNullableFilter<"AudioChunk"> | number | null
    textHash?: StringNullableFilter<"AudioChunk"> | string | null
    createdAt?: DateTimeFilter<"AudioChunk"> | Date | string
    documentId?: StringFilter<"AudioChunk"> | string
    chunkIndex?: IntFilter<"AudioChunk"> | number
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }, "id" | "documentId_chunkIndex">

  export type AudioChunkOrderByWithAggregationInput = {
    id?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    duration?: SortOrderInput | SortOrder
    textHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    documentId?: SortOrder
    chunkIndex?: SortOrder
    _count?: AudioChunkCountOrderByAggregateInput
    _avg?: AudioChunkAvgOrderByAggregateInput
    _max?: AudioChunkMaxOrderByAggregateInput
    _min?: AudioChunkMinOrderByAggregateInput
    _sum?: AudioChunkSumOrderByAggregateInput
  }

  export type AudioChunkScalarWhereWithAggregatesInput = {
    AND?: AudioChunkScalarWhereWithAggregatesInput | AudioChunkScalarWhereWithAggregatesInput[]
    OR?: AudioChunkScalarWhereWithAggregatesInput[]
    NOT?: AudioChunkScalarWhereWithAggregatesInput | AudioChunkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AudioChunk"> | string
    s3Key?: StringWithAggregatesFilter<"AudioChunk"> | string
    s3Url?: StringWithAggregatesFilter<"AudioChunk"> | string
    duration?: FloatNullableWithAggregatesFilter<"AudioChunk"> | number | null
    textHash?: StringNullableWithAggregatesFilter<"AudioChunk"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AudioChunk"> | Date | string
    documentId?: StringWithAggregatesFilter<"AudioChunk"> | string
    chunkIndex?: IntWithAggregatesFilter<"AudioChunk"> | number
  }

  export type PlaybackProgressWhereInput = {
    AND?: PlaybackProgressWhereInput | PlaybackProgressWhereInput[]
    OR?: PlaybackProgressWhereInput[]
    NOT?: PlaybackProgressWhereInput | PlaybackProgressWhereInput[]
    id?: StringFilter<"PlaybackProgress"> | string
    time?: FloatFilter<"PlaybackProgress"> | number
    chunkIndex?: IntFilter<"PlaybackProgress"> | number
    mode?: EnumProcessingModeFilter<"PlaybackProgress"> | $Enums.ProcessingMode
    updatedAt?: DateTimeFilter<"PlaybackProgress"> | Date | string
    userId?: StringFilter<"PlaybackProgress"> | string
    documentId?: StringFilter<"PlaybackProgress"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }

  export type PlaybackProgressOrderByWithRelationInput = {
    id?: SortOrder
    time?: SortOrder
    chunkIndex?: SortOrder
    mode?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
    user?: UserOrderByWithRelationInput
    document?: DocumentOrderByWithRelationInput
  }

  export type PlaybackProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_documentId?: PlaybackProgressUserIdDocumentIdCompoundUniqueInput
    AND?: PlaybackProgressWhereInput | PlaybackProgressWhereInput[]
    OR?: PlaybackProgressWhereInput[]
    NOT?: PlaybackProgressWhereInput | PlaybackProgressWhereInput[]
    time?: FloatFilter<"PlaybackProgress"> | number
    chunkIndex?: IntFilter<"PlaybackProgress"> | number
    mode?: EnumProcessingModeFilter<"PlaybackProgress"> | $Enums.ProcessingMode
    updatedAt?: DateTimeFilter<"PlaybackProgress"> | Date | string
    userId?: StringFilter<"PlaybackProgress"> | string
    documentId?: StringFilter<"PlaybackProgress"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>
  }, "id" | "userId_documentId">

  export type PlaybackProgressOrderByWithAggregationInput = {
    id?: SortOrder
    time?: SortOrder
    chunkIndex?: SortOrder
    mode?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
    _count?: PlaybackProgressCountOrderByAggregateInput
    _avg?: PlaybackProgressAvgOrderByAggregateInput
    _max?: PlaybackProgressMaxOrderByAggregateInput
    _min?: PlaybackProgressMinOrderByAggregateInput
    _sum?: PlaybackProgressSumOrderByAggregateInput
  }

  export type PlaybackProgressScalarWhereWithAggregatesInput = {
    AND?: PlaybackProgressScalarWhereWithAggregatesInput | PlaybackProgressScalarWhereWithAggregatesInput[]
    OR?: PlaybackProgressScalarWhereWithAggregatesInput[]
    NOT?: PlaybackProgressScalarWhereWithAggregatesInput | PlaybackProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlaybackProgress"> | string
    time?: FloatWithAggregatesFilter<"PlaybackProgress"> | number
    chunkIndex?: IntWithAggregatesFilter<"PlaybackProgress"> | number
    mode?: EnumProcessingModeWithAggregatesFilter<"PlaybackProgress"> | $Enums.ProcessingMode
    updatedAt?: DateTimeWithAggregatesFilter<"PlaybackProgress"> | Date | string
    userId?: StringWithAggregatesFilter<"PlaybackProgress"> | string
    documentId?: StringWithAggregatesFilter<"PlaybackProgress"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    isPremium?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutUserInput
    playbackProgress?: PlaybackProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    isPremium?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
    playbackProgress?: PlaybackProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutUserNestedInput
    playbackProgress?: PlaybackProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
    playbackProgress?: PlaybackProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    isPremium?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    pageCount?: number | null
    extractedText?: string | null
    language?: string
    status?: $Enums.DocumentStatus
    audioDuration?: number | null
    totalChunks?: number
    processedChunks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    errorMessage?: string | null
    errorCode?: string | null
    failedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDocumentsInput
    chunks?: TextChunkCreateNestedManyWithoutDocumentInput
    audioChunks?: AudioChunkCreateNestedManyWithoutDocumentInput
    playbackProgress?: PlaybackProgressCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    pageCount?: number | null
    extractedText?: string | null
    language?: string
    status?: $Enums.DocumentStatus
    audioDuration?: number | null
    totalChunks?: number
    processedChunks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    errorMessage?: string | null
    errorCode?: string | null
    failedAt?: Date | string | null
    userId: string
    chunks?: TextChunkUncheckedCreateNestedManyWithoutDocumentInput
    audioChunks?: AudioChunkUncheckedCreateNestedManyWithoutDocumentInput
    playbackProgress?: PlaybackProgressUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    chunks?: TextChunkUpdateManyWithoutDocumentNestedInput
    audioChunks?: AudioChunkUpdateManyWithoutDocumentNestedInput
    playbackProgress?: PlaybackProgressUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    chunks?: TextChunkUncheckedUpdateManyWithoutDocumentNestedInput
    audioChunks?: AudioChunkUncheckedUpdateManyWithoutDocumentNestedInput
    playbackProgress?: PlaybackProgressUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    pageCount?: number | null
    extractedText?: string | null
    language?: string
    status?: $Enums.DocumentStatus
    audioDuration?: number | null
    totalChunks?: number
    processedChunks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    errorMessage?: string | null
    errorCode?: string | null
    failedAt?: Date | string | null
    userId: string
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TextChunkCreateInput = {
    id?: string
    index: number
    text: string
    tokenCount?: number | null
    mode?: $Enums.ProcessingMode
    processed?: string | null
    audioPath?: string | null
    audioDuration?: number | null
    status?: $Enums.ChunkStatus
    createdAt?: Date | string
    document: DocumentCreateNestedOneWithoutChunksInput
  }

  export type TextChunkUncheckedCreateInput = {
    id?: string
    index: number
    text: string
    tokenCount?: number | null
    mode?: $Enums.ProcessingMode
    processed?: string | null
    audioPath?: string | null
    audioDuration?: number | null
    status?: $Enums.ChunkStatus
    createdAt?: Date | string
    documentId: string
  }

  export type TextChunkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    processed?: NullableStringFieldUpdateOperationsInput | string | null
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumChunkStatusFieldUpdateOperationsInput | $Enums.ChunkStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutChunksNestedInput
  }

  export type TextChunkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    processed?: NullableStringFieldUpdateOperationsInput | string | null
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumChunkStatusFieldUpdateOperationsInput | $Enums.ChunkStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentId?: StringFieldUpdateOperationsInput | string
  }

  export type TextChunkCreateManyInput = {
    id?: string
    index: number
    text: string
    tokenCount?: number | null
    mode?: $Enums.ProcessingMode
    processed?: string | null
    audioPath?: string | null
    audioDuration?: number | null
    status?: $Enums.ChunkStatus
    createdAt?: Date | string
    documentId: string
  }

  export type TextChunkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    processed?: NullableStringFieldUpdateOperationsInput | string | null
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumChunkStatusFieldUpdateOperationsInput | $Enums.ChunkStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TextChunkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    processed?: NullableStringFieldUpdateOperationsInput | string | null
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumChunkStatusFieldUpdateOperationsInput | $Enums.ChunkStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentId?: StringFieldUpdateOperationsInput | string
  }

  export type AudioChunkCreateInput = {
    id?: string
    s3Key: string
    s3Url: string
    duration?: number | null
    textHash?: string | null
    createdAt?: Date | string
    chunkIndex: number
    document: DocumentCreateNestedOneWithoutAudioChunksInput
  }

  export type AudioChunkUncheckedCreateInput = {
    id?: string
    s3Key: string
    s3Url: string
    duration?: number | null
    textHash?: string | null
    createdAt?: Date | string
    documentId: string
    chunkIndex: number
  }

  export type AudioChunkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    textHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
    document?: DocumentUpdateOneRequiredWithoutAudioChunksNestedInput
  }

  export type AudioChunkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    textHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentId?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
  }

  export type AudioChunkCreateManyInput = {
    id?: string
    s3Key: string
    s3Url: string
    duration?: number | null
    textHash?: string | null
    createdAt?: Date | string
    documentId: string
    chunkIndex: number
  }

  export type AudioChunkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    textHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
  }

  export type AudioChunkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    textHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentId?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
  }

  export type PlaybackProgressCreateInput = {
    id?: string
    time: number
    chunkIndex?: number
    mode?: $Enums.ProcessingMode
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPlaybackProgressInput
    document: DocumentCreateNestedOneWithoutPlaybackProgressInput
  }

  export type PlaybackProgressUncheckedCreateInput = {
    id?: string
    time: number
    chunkIndex?: number
    mode?: $Enums.ProcessingMode
    updatedAt?: Date | string
    userId: string
    documentId: string
  }

  export type PlaybackProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: FloatFieldUpdateOperationsInput | number
    chunkIndex?: IntFieldUpdateOperationsInput | number
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPlaybackProgressNestedInput
    document?: DocumentUpdateOneRequiredWithoutPlaybackProgressNestedInput
  }

  export type PlaybackProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: FloatFieldUpdateOperationsInput | number
    chunkIndex?: IntFieldUpdateOperationsInput | number
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybackProgressCreateManyInput = {
    id?: string
    time: number
    chunkIndex?: number
    mode?: $Enums.ProcessingMode
    updatedAt?: Date | string
    userId: string
    documentId: string
  }

  export type PlaybackProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: FloatFieldUpdateOperationsInput | number
    chunkIndex?: IntFieldUpdateOperationsInput | number
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaybackProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: FloatFieldUpdateOperationsInput | number
    chunkIndex?: IntFieldUpdateOperationsInput | number
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type PlaybackProgressListRelationFilter = {
    every?: PlaybackProgressWhereInput
    some?: PlaybackProgressWhereInput
    none?: PlaybackProgressWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlaybackProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    isPremium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    isPremium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    isPremium?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TextChunkListRelationFilter = {
    every?: TextChunkWhereInput
    some?: TextChunkWhereInput
    none?: TextChunkWhereInput
  }

  export type AudioChunkListRelationFilter = {
    every?: AudioChunkWhereInput
    some?: AudioChunkWhereInput
    none?: AudioChunkWhereInput
  }

  export type TextChunkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AudioChunkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    pageCount?: SortOrder
    extractedText?: SortOrder
    language?: SortOrder
    status?: SortOrder
    audioDuration?: SortOrder
    totalChunks?: SortOrder
    processedChunks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    errorMessage?: SortOrder
    errorCode?: SortOrder
    failedAt?: SortOrder
    userId?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
    pageCount?: SortOrder
    audioDuration?: SortOrder
    totalChunks?: SortOrder
    processedChunks?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    pageCount?: SortOrder
    extractedText?: SortOrder
    language?: SortOrder
    status?: SortOrder
    audioDuration?: SortOrder
    totalChunks?: SortOrder
    processedChunks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    errorMessage?: SortOrder
    errorCode?: SortOrder
    failedAt?: SortOrder
    userId?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    pageCount?: SortOrder
    extractedText?: SortOrder
    language?: SortOrder
    status?: SortOrder
    audioDuration?: SortOrder
    totalChunks?: SortOrder
    processedChunks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    errorMessage?: SortOrder
    errorCode?: SortOrder
    failedAt?: SortOrder
    userId?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    fileSize?: SortOrder
    pageCount?: SortOrder
    audioDuration?: SortOrder
    totalChunks?: SortOrder
    processedChunks?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatusFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatusFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumProcessingModeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingMode | EnumProcessingModeFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingMode[] | ListEnumProcessingModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingMode[] | ListEnumProcessingModeFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingModeFilter<$PrismaModel> | $Enums.ProcessingMode
  }

  export type EnumChunkStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChunkStatus | EnumChunkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChunkStatus[] | ListEnumChunkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChunkStatus[] | ListEnumChunkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChunkStatusFilter<$PrismaModel> | $Enums.ChunkStatus
  }

  export type DocumentScalarRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type TextChunkDocumentIdIndexModeCompoundUniqueInput = {
    documentId: string
    index: number
    mode: $Enums.ProcessingMode
  }

  export type TextChunkCountOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
    text?: SortOrder
    tokenCount?: SortOrder
    mode?: SortOrder
    processed?: SortOrder
    audioPath?: SortOrder
    audioDuration?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    documentId?: SortOrder
  }

  export type TextChunkAvgOrderByAggregateInput = {
    index?: SortOrder
    tokenCount?: SortOrder
    audioDuration?: SortOrder
  }

  export type TextChunkMaxOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
    text?: SortOrder
    tokenCount?: SortOrder
    mode?: SortOrder
    processed?: SortOrder
    audioPath?: SortOrder
    audioDuration?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    documentId?: SortOrder
  }

  export type TextChunkMinOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
    text?: SortOrder
    tokenCount?: SortOrder
    mode?: SortOrder
    processed?: SortOrder
    audioPath?: SortOrder
    audioDuration?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    documentId?: SortOrder
  }

  export type TextChunkSumOrderByAggregateInput = {
    index?: SortOrder
    tokenCount?: SortOrder
    audioDuration?: SortOrder
  }

  export type EnumProcessingModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingMode | EnumProcessingModeFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingMode[] | ListEnumProcessingModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingMode[] | ListEnumProcessingModeFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingModeWithAggregatesFilter<$PrismaModel> | $Enums.ProcessingMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProcessingModeFilter<$PrismaModel>
    _max?: NestedEnumProcessingModeFilter<$PrismaModel>
  }

  export type EnumChunkStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChunkStatus | EnumChunkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChunkStatus[] | ListEnumChunkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChunkStatus[] | ListEnumChunkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChunkStatusWithAggregatesFilter<$PrismaModel> | $Enums.ChunkStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChunkStatusFilter<$PrismaModel>
    _max?: NestedEnumChunkStatusFilter<$PrismaModel>
  }

  export type AudioChunkDocumentIdChunkIndexCompoundUniqueInput = {
    documentId: string
    chunkIndex: number
  }

  export type AudioChunkCountOrderByAggregateInput = {
    id?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    duration?: SortOrder
    textHash?: SortOrder
    createdAt?: SortOrder
    documentId?: SortOrder
    chunkIndex?: SortOrder
  }

  export type AudioChunkAvgOrderByAggregateInput = {
    duration?: SortOrder
    chunkIndex?: SortOrder
  }

  export type AudioChunkMaxOrderByAggregateInput = {
    id?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    duration?: SortOrder
    textHash?: SortOrder
    createdAt?: SortOrder
    documentId?: SortOrder
    chunkIndex?: SortOrder
  }

  export type AudioChunkMinOrderByAggregateInput = {
    id?: SortOrder
    s3Key?: SortOrder
    s3Url?: SortOrder
    duration?: SortOrder
    textHash?: SortOrder
    createdAt?: SortOrder
    documentId?: SortOrder
    chunkIndex?: SortOrder
  }

  export type AudioChunkSumOrderByAggregateInput = {
    duration?: SortOrder
    chunkIndex?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PlaybackProgressUserIdDocumentIdCompoundUniqueInput = {
    userId: string
    documentId: string
  }

  export type PlaybackProgressCountOrderByAggregateInput = {
    id?: SortOrder
    time?: SortOrder
    chunkIndex?: SortOrder
    mode?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
  }

  export type PlaybackProgressAvgOrderByAggregateInput = {
    time?: SortOrder
    chunkIndex?: SortOrder
  }

  export type PlaybackProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    time?: SortOrder
    chunkIndex?: SortOrder
    mode?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
  }

  export type PlaybackProgressMinOrderByAggregateInput = {
    id?: SortOrder
    time?: SortOrder
    chunkIndex?: SortOrder
    mode?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    documentId?: SortOrder
  }

  export type PlaybackProgressSumOrderByAggregateInput = {
    time?: SortOrder
    chunkIndex?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DocumentCreateNestedManyWithoutUserInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type PlaybackProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<PlaybackProgressCreateWithoutUserInput, PlaybackProgressUncheckedCreateWithoutUserInput> | PlaybackProgressCreateWithoutUserInput[] | PlaybackProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlaybackProgressCreateOrConnectWithoutUserInput | PlaybackProgressCreateOrConnectWithoutUserInput[]
    createMany?: PlaybackProgressCreateManyUserInputEnvelope
    connect?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type PlaybackProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PlaybackProgressCreateWithoutUserInput, PlaybackProgressUncheckedCreateWithoutUserInput> | PlaybackProgressCreateWithoutUserInput[] | PlaybackProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlaybackProgressCreateOrConnectWithoutUserInput | PlaybackProgressCreateOrConnectWithoutUserInput[]
    createMany?: PlaybackProgressCreateManyUserInputEnvelope
    connect?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DocumentUpdateManyWithoutUserNestedInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutUserInput | DocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutUserInput | DocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutUserInput | DocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type PlaybackProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<PlaybackProgressCreateWithoutUserInput, PlaybackProgressUncheckedCreateWithoutUserInput> | PlaybackProgressCreateWithoutUserInput[] | PlaybackProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlaybackProgressCreateOrConnectWithoutUserInput | PlaybackProgressCreateOrConnectWithoutUserInput[]
    upsert?: PlaybackProgressUpsertWithWhereUniqueWithoutUserInput | PlaybackProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PlaybackProgressCreateManyUserInputEnvelope
    set?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    disconnect?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    delete?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    connect?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    update?: PlaybackProgressUpdateWithWhereUniqueWithoutUserInput | PlaybackProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PlaybackProgressUpdateManyWithWhereWithoutUserInput | PlaybackProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PlaybackProgressScalarWhereInput | PlaybackProgressScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput> | DocumentCreateWithoutUserInput[] | DocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutUserInput | DocumentCreateOrConnectWithoutUserInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutUserInput | DocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DocumentCreateManyUserInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutUserInput | DocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutUserInput | DocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type PlaybackProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PlaybackProgressCreateWithoutUserInput, PlaybackProgressUncheckedCreateWithoutUserInput> | PlaybackProgressCreateWithoutUserInput[] | PlaybackProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlaybackProgressCreateOrConnectWithoutUserInput | PlaybackProgressCreateOrConnectWithoutUserInput[]
    upsert?: PlaybackProgressUpsertWithWhereUniqueWithoutUserInput | PlaybackProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PlaybackProgressCreateManyUserInputEnvelope
    set?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    disconnect?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    delete?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    connect?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    update?: PlaybackProgressUpdateWithWhereUniqueWithoutUserInput | PlaybackProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PlaybackProgressUpdateManyWithWhereWithoutUserInput | PlaybackProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PlaybackProgressScalarWhereInput | PlaybackProgressScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    connect?: UserWhereUniqueInput
  }

  export type TextChunkCreateNestedManyWithoutDocumentInput = {
    create?: XOR<TextChunkCreateWithoutDocumentInput, TextChunkUncheckedCreateWithoutDocumentInput> | TextChunkCreateWithoutDocumentInput[] | TextChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: TextChunkCreateOrConnectWithoutDocumentInput | TextChunkCreateOrConnectWithoutDocumentInput[]
    createMany?: TextChunkCreateManyDocumentInputEnvelope
    connect?: TextChunkWhereUniqueInput | TextChunkWhereUniqueInput[]
  }

  export type AudioChunkCreateNestedManyWithoutDocumentInput = {
    create?: XOR<AudioChunkCreateWithoutDocumentInput, AudioChunkUncheckedCreateWithoutDocumentInput> | AudioChunkCreateWithoutDocumentInput[] | AudioChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AudioChunkCreateOrConnectWithoutDocumentInput | AudioChunkCreateOrConnectWithoutDocumentInput[]
    createMany?: AudioChunkCreateManyDocumentInputEnvelope
    connect?: AudioChunkWhereUniqueInput | AudioChunkWhereUniqueInput[]
  }

  export type PlaybackProgressCreateNestedManyWithoutDocumentInput = {
    create?: XOR<PlaybackProgressCreateWithoutDocumentInput, PlaybackProgressUncheckedCreateWithoutDocumentInput> | PlaybackProgressCreateWithoutDocumentInput[] | PlaybackProgressUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: PlaybackProgressCreateOrConnectWithoutDocumentInput | PlaybackProgressCreateOrConnectWithoutDocumentInput[]
    createMany?: PlaybackProgressCreateManyDocumentInputEnvelope
    connect?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
  }

  export type TextChunkUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<TextChunkCreateWithoutDocumentInput, TextChunkUncheckedCreateWithoutDocumentInput> | TextChunkCreateWithoutDocumentInput[] | TextChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: TextChunkCreateOrConnectWithoutDocumentInput | TextChunkCreateOrConnectWithoutDocumentInput[]
    createMany?: TextChunkCreateManyDocumentInputEnvelope
    connect?: TextChunkWhereUniqueInput | TextChunkWhereUniqueInput[]
  }

  export type AudioChunkUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<AudioChunkCreateWithoutDocumentInput, AudioChunkUncheckedCreateWithoutDocumentInput> | AudioChunkCreateWithoutDocumentInput[] | AudioChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AudioChunkCreateOrConnectWithoutDocumentInput | AudioChunkCreateOrConnectWithoutDocumentInput[]
    createMany?: AudioChunkCreateManyDocumentInputEnvelope
    connect?: AudioChunkWhereUniqueInput | AudioChunkWhereUniqueInput[]
  }

  export type PlaybackProgressUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<PlaybackProgressCreateWithoutDocumentInput, PlaybackProgressUncheckedCreateWithoutDocumentInput> | PlaybackProgressCreateWithoutDocumentInput[] | PlaybackProgressUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: PlaybackProgressCreateOrConnectWithoutDocumentInput | PlaybackProgressCreateOrConnectWithoutDocumentInput[]
    createMany?: PlaybackProgressCreateManyDocumentInputEnvelope
    connect?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumDocumentStatusFieldUpdateOperationsInput = {
    set?: $Enums.DocumentStatus
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    upsert?: UserUpsertWithoutDocumentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDocumentsInput, UserUpdateWithoutDocumentsInput>, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type TextChunkUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<TextChunkCreateWithoutDocumentInput, TextChunkUncheckedCreateWithoutDocumentInput> | TextChunkCreateWithoutDocumentInput[] | TextChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: TextChunkCreateOrConnectWithoutDocumentInput | TextChunkCreateOrConnectWithoutDocumentInput[]
    upsert?: TextChunkUpsertWithWhereUniqueWithoutDocumentInput | TextChunkUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: TextChunkCreateManyDocumentInputEnvelope
    set?: TextChunkWhereUniqueInput | TextChunkWhereUniqueInput[]
    disconnect?: TextChunkWhereUniqueInput | TextChunkWhereUniqueInput[]
    delete?: TextChunkWhereUniqueInput | TextChunkWhereUniqueInput[]
    connect?: TextChunkWhereUniqueInput | TextChunkWhereUniqueInput[]
    update?: TextChunkUpdateWithWhereUniqueWithoutDocumentInput | TextChunkUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: TextChunkUpdateManyWithWhereWithoutDocumentInput | TextChunkUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: TextChunkScalarWhereInput | TextChunkScalarWhereInput[]
  }

  export type AudioChunkUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<AudioChunkCreateWithoutDocumentInput, AudioChunkUncheckedCreateWithoutDocumentInput> | AudioChunkCreateWithoutDocumentInput[] | AudioChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AudioChunkCreateOrConnectWithoutDocumentInput | AudioChunkCreateOrConnectWithoutDocumentInput[]
    upsert?: AudioChunkUpsertWithWhereUniqueWithoutDocumentInput | AudioChunkUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: AudioChunkCreateManyDocumentInputEnvelope
    set?: AudioChunkWhereUniqueInput | AudioChunkWhereUniqueInput[]
    disconnect?: AudioChunkWhereUniqueInput | AudioChunkWhereUniqueInput[]
    delete?: AudioChunkWhereUniqueInput | AudioChunkWhereUniqueInput[]
    connect?: AudioChunkWhereUniqueInput | AudioChunkWhereUniqueInput[]
    update?: AudioChunkUpdateWithWhereUniqueWithoutDocumentInput | AudioChunkUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: AudioChunkUpdateManyWithWhereWithoutDocumentInput | AudioChunkUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: AudioChunkScalarWhereInput | AudioChunkScalarWhereInput[]
  }

  export type PlaybackProgressUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<PlaybackProgressCreateWithoutDocumentInput, PlaybackProgressUncheckedCreateWithoutDocumentInput> | PlaybackProgressCreateWithoutDocumentInput[] | PlaybackProgressUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: PlaybackProgressCreateOrConnectWithoutDocumentInput | PlaybackProgressCreateOrConnectWithoutDocumentInput[]
    upsert?: PlaybackProgressUpsertWithWhereUniqueWithoutDocumentInput | PlaybackProgressUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: PlaybackProgressCreateManyDocumentInputEnvelope
    set?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    disconnect?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    delete?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    connect?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    update?: PlaybackProgressUpdateWithWhereUniqueWithoutDocumentInput | PlaybackProgressUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: PlaybackProgressUpdateManyWithWhereWithoutDocumentInput | PlaybackProgressUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: PlaybackProgressScalarWhereInput | PlaybackProgressScalarWhereInput[]
  }

  export type TextChunkUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<TextChunkCreateWithoutDocumentInput, TextChunkUncheckedCreateWithoutDocumentInput> | TextChunkCreateWithoutDocumentInput[] | TextChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: TextChunkCreateOrConnectWithoutDocumentInput | TextChunkCreateOrConnectWithoutDocumentInput[]
    upsert?: TextChunkUpsertWithWhereUniqueWithoutDocumentInput | TextChunkUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: TextChunkCreateManyDocumentInputEnvelope
    set?: TextChunkWhereUniqueInput | TextChunkWhereUniqueInput[]
    disconnect?: TextChunkWhereUniqueInput | TextChunkWhereUniqueInput[]
    delete?: TextChunkWhereUniqueInput | TextChunkWhereUniqueInput[]
    connect?: TextChunkWhereUniqueInput | TextChunkWhereUniqueInput[]
    update?: TextChunkUpdateWithWhereUniqueWithoutDocumentInput | TextChunkUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: TextChunkUpdateManyWithWhereWithoutDocumentInput | TextChunkUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: TextChunkScalarWhereInput | TextChunkScalarWhereInput[]
  }

  export type AudioChunkUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<AudioChunkCreateWithoutDocumentInput, AudioChunkUncheckedCreateWithoutDocumentInput> | AudioChunkCreateWithoutDocumentInput[] | AudioChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: AudioChunkCreateOrConnectWithoutDocumentInput | AudioChunkCreateOrConnectWithoutDocumentInput[]
    upsert?: AudioChunkUpsertWithWhereUniqueWithoutDocumentInput | AudioChunkUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: AudioChunkCreateManyDocumentInputEnvelope
    set?: AudioChunkWhereUniqueInput | AudioChunkWhereUniqueInput[]
    disconnect?: AudioChunkWhereUniqueInput | AudioChunkWhereUniqueInput[]
    delete?: AudioChunkWhereUniqueInput | AudioChunkWhereUniqueInput[]
    connect?: AudioChunkWhereUniqueInput | AudioChunkWhereUniqueInput[]
    update?: AudioChunkUpdateWithWhereUniqueWithoutDocumentInput | AudioChunkUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: AudioChunkUpdateManyWithWhereWithoutDocumentInput | AudioChunkUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: AudioChunkScalarWhereInput | AudioChunkScalarWhereInput[]
  }

  export type PlaybackProgressUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<PlaybackProgressCreateWithoutDocumentInput, PlaybackProgressUncheckedCreateWithoutDocumentInput> | PlaybackProgressCreateWithoutDocumentInput[] | PlaybackProgressUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: PlaybackProgressCreateOrConnectWithoutDocumentInput | PlaybackProgressCreateOrConnectWithoutDocumentInput[]
    upsert?: PlaybackProgressUpsertWithWhereUniqueWithoutDocumentInput | PlaybackProgressUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: PlaybackProgressCreateManyDocumentInputEnvelope
    set?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    disconnect?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    delete?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    connect?: PlaybackProgressWhereUniqueInput | PlaybackProgressWhereUniqueInput[]
    update?: PlaybackProgressUpdateWithWhereUniqueWithoutDocumentInput | PlaybackProgressUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: PlaybackProgressUpdateManyWithWhereWithoutDocumentInput | PlaybackProgressUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: PlaybackProgressScalarWhereInput | PlaybackProgressScalarWhereInput[]
  }

  export type DocumentCreateNestedOneWithoutChunksInput = {
    create?: XOR<DocumentCreateWithoutChunksInput, DocumentUncheckedCreateWithoutChunksInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutChunksInput
    connect?: DocumentWhereUniqueInput
  }

  export type EnumProcessingModeFieldUpdateOperationsInput = {
    set?: $Enums.ProcessingMode
  }

  export type EnumChunkStatusFieldUpdateOperationsInput = {
    set?: $Enums.ChunkStatus
  }

  export type DocumentUpdateOneRequiredWithoutChunksNestedInput = {
    create?: XOR<DocumentCreateWithoutChunksInput, DocumentUncheckedCreateWithoutChunksInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutChunksInput
    upsert?: DocumentUpsertWithoutChunksInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutChunksInput, DocumentUpdateWithoutChunksInput>, DocumentUncheckedUpdateWithoutChunksInput>
  }

  export type DocumentCreateNestedOneWithoutAudioChunksInput = {
    create?: XOR<DocumentCreateWithoutAudioChunksInput, DocumentUncheckedCreateWithoutAudioChunksInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutAudioChunksInput
    connect?: DocumentWhereUniqueInput
  }

  export type DocumentUpdateOneRequiredWithoutAudioChunksNestedInput = {
    create?: XOR<DocumentCreateWithoutAudioChunksInput, DocumentUncheckedCreateWithoutAudioChunksInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutAudioChunksInput
    upsert?: DocumentUpsertWithoutAudioChunksInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutAudioChunksInput, DocumentUpdateWithoutAudioChunksInput>, DocumentUncheckedUpdateWithoutAudioChunksInput>
  }

  export type UserCreateNestedOneWithoutPlaybackProgressInput = {
    create?: XOR<UserCreateWithoutPlaybackProgressInput, UserUncheckedCreateWithoutPlaybackProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlaybackProgressInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentCreateNestedOneWithoutPlaybackProgressInput = {
    create?: XOR<DocumentCreateWithoutPlaybackProgressInput, DocumentUncheckedCreateWithoutPlaybackProgressInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutPlaybackProgressInput
    connect?: DocumentWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutPlaybackProgressNestedInput = {
    create?: XOR<UserCreateWithoutPlaybackProgressInput, UserUncheckedCreateWithoutPlaybackProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlaybackProgressInput
    upsert?: UserUpsertWithoutPlaybackProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPlaybackProgressInput, UserUpdateWithoutPlaybackProgressInput>, UserUncheckedUpdateWithoutPlaybackProgressInput>
  }

  export type DocumentUpdateOneRequiredWithoutPlaybackProgressNestedInput = {
    create?: XOR<DocumentCreateWithoutPlaybackProgressInput, DocumentUncheckedCreateWithoutPlaybackProgressInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutPlaybackProgressInput
    upsert?: DocumentUpsertWithoutPlaybackProgressInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutPlaybackProgressInput, DocumentUpdateWithoutPlaybackProgressInput>, DocumentUncheckedUpdateWithoutPlaybackProgressInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatusFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatusFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumProcessingModeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingMode | EnumProcessingModeFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingMode[] | ListEnumProcessingModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingMode[] | ListEnumProcessingModeFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingModeFilter<$PrismaModel> | $Enums.ProcessingMode
  }

  export type NestedEnumChunkStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChunkStatus | EnumChunkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChunkStatus[] | ListEnumChunkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChunkStatus[] | ListEnumChunkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChunkStatusFilter<$PrismaModel> | $Enums.ChunkStatus
  }

  export type NestedEnumProcessingModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingMode | EnumProcessingModeFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingMode[] | ListEnumProcessingModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingMode[] | ListEnumProcessingModeFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingModeWithAggregatesFilter<$PrismaModel> | $Enums.ProcessingMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProcessingModeFilter<$PrismaModel>
    _max?: NestedEnumProcessingModeFilter<$PrismaModel>
  }

  export type NestedEnumChunkStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChunkStatus | EnumChunkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChunkStatus[] | ListEnumChunkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChunkStatus[] | ListEnumChunkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChunkStatusWithAggregatesFilter<$PrismaModel> | $Enums.ChunkStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChunkStatusFilter<$PrismaModel>
    _max?: NestedEnumChunkStatusFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DocumentCreateWithoutUserInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    pageCount?: number | null
    extractedText?: string | null
    language?: string
    status?: $Enums.DocumentStatus
    audioDuration?: number | null
    totalChunks?: number
    processedChunks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    errorMessage?: string | null
    errorCode?: string | null
    failedAt?: Date | string | null
    chunks?: TextChunkCreateNestedManyWithoutDocumentInput
    audioChunks?: AudioChunkCreateNestedManyWithoutDocumentInput
    playbackProgress?: PlaybackProgressCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    pageCount?: number | null
    extractedText?: string | null
    language?: string
    status?: $Enums.DocumentStatus
    audioDuration?: number | null
    totalChunks?: number
    processedChunks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    errorMessage?: string | null
    errorCode?: string | null
    failedAt?: Date | string | null
    chunks?: TextChunkUncheckedCreateNestedManyWithoutDocumentInput
    audioChunks?: AudioChunkUncheckedCreateNestedManyWithoutDocumentInput
    playbackProgress?: PlaybackProgressUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutUserInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput>
  }

  export type DocumentCreateManyUserInputEnvelope = {
    data: DocumentCreateManyUserInput | DocumentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PlaybackProgressCreateWithoutUserInput = {
    id?: string
    time: number
    chunkIndex?: number
    mode?: $Enums.ProcessingMode
    updatedAt?: Date | string
    document: DocumentCreateNestedOneWithoutPlaybackProgressInput
  }

  export type PlaybackProgressUncheckedCreateWithoutUserInput = {
    id?: string
    time: number
    chunkIndex?: number
    mode?: $Enums.ProcessingMode
    updatedAt?: Date | string
    documentId: string
  }

  export type PlaybackProgressCreateOrConnectWithoutUserInput = {
    where: PlaybackProgressWhereUniqueInput
    create: XOR<PlaybackProgressCreateWithoutUserInput, PlaybackProgressUncheckedCreateWithoutUserInput>
  }

  export type PlaybackProgressCreateManyUserInputEnvelope = {
    data: PlaybackProgressCreateManyUserInput | PlaybackProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DocumentUpsertWithWhereUniqueWithoutUserInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutUserInput, DocumentUncheckedUpdateWithoutUserInput>
    create: XOR<DocumentCreateWithoutUserInput, DocumentUncheckedCreateWithoutUserInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutUserInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutUserInput, DocumentUncheckedUpdateWithoutUserInput>
  }

  export type DocumentUpdateManyWithWhereWithoutUserInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutUserInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    title?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    fileUrl?: StringFilter<"Document"> | string
    fileSize?: IntNullableFilter<"Document"> | number | null
    pageCount?: IntNullableFilter<"Document"> | number | null
    extractedText?: StringNullableFilter<"Document"> | string | null
    language?: StringFilter<"Document"> | string
    status?: EnumDocumentStatusFilter<"Document"> | $Enums.DocumentStatus
    audioDuration?: FloatNullableFilter<"Document"> | number | null
    totalChunks?: IntFilter<"Document"> | number
    processedChunks?: IntFilter<"Document"> | number
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    errorMessage?: StringNullableFilter<"Document"> | string | null
    errorCode?: StringNullableFilter<"Document"> | string | null
    failedAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    userId?: StringFilter<"Document"> | string
  }

  export type PlaybackProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: PlaybackProgressWhereUniqueInput
    update: XOR<PlaybackProgressUpdateWithoutUserInput, PlaybackProgressUncheckedUpdateWithoutUserInput>
    create: XOR<PlaybackProgressCreateWithoutUserInput, PlaybackProgressUncheckedCreateWithoutUserInput>
  }

  export type PlaybackProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: PlaybackProgressWhereUniqueInput
    data: XOR<PlaybackProgressUpdateWithoutUserInput, PlaybackProgressUncheckedUpdateWithoutUserInput>
  }

  export type PlaybackProgressUpdateManyWithWhereWithoutUserInput = {
    where: PlaybackProgressScalarWhereInput
    data: XOR<PlaybackProgressUpdateManyMutationInput, PlaybackProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type PlaybackProgressScalarWhereInput = {
    AND?: PlaybackProgressScalarWhereInput | PlaybackProgressScalarWhereInput[]
    OR?: PlaybackProgressScalarWhereInput[]
    NOT?: PlaybackProgressScalarWhereInput | PlaybackProgressScalarWhereInput[]
    id?: StringFilter<"PlaybackProgress"> | string
    time?: FloatFilter<"PlaybackProgress"> | number
    chunkIndex?: IntFilter<"PlaybackProgress"> | number
    mode?: EnumProcessingModeFilter<"PlaybackProgress"> | $Enums.ProcessingMode
    updatedAt?: DateTimeFilter<"PlaybackProgress"> | Date | string
    userId?: StringFilter<"PlaybackProgress"> | string
    documentId?: StringFilter<"PlaybackProgress"> | string
  }

  export type UserCreateWithoutDocumentsInput = {
    id?: string
    email: string
    name?: string | null
    isPremium?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    playbackProgress?: PlaybackProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDocumentsInput = {
    id?: string
    email: string
    name?: string | null
    isPremium?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    playbackProgress?: PlaybackProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDocumentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
  }

  export type TextChunkCreateWithoutDocumentInput = {
    id?: string
    index: number
    text: string
    tokenCount?: number | null
    mode?: $Enums.ProcessingMode
    processed?: string | null
    audioPath?: string | null
    audioDuration?: number | null
    status?: $Enums.ChunkStatus
    createdAt?: Date | string
  }

  export type TextChunkUncheckedCreateWithoutDocumentInput = {
    id?: string
    index: number
    text: string
    tokenCount?: number | null
    mode?: $Enums.ProcessingMode
    processed?: string | null
    audioPath?: string | null
    audioDuration?: number | null
    status?: $Enums.ChunkStatus
    createdAt?: Date | string
  }

  export type TextChunkCreateOrConnectWithoutDocumentInput = {
    where: TextChunkWhereUniqueInput
    create: XOR<TextChunkCreateWithoutDocumentInput, TextChunkUncheckedCreateWithoutDocumentInput>
  }

  export type TextChunkCreateManyDocumentInputEnvelope = {
    data: TextChunkCreateManyDocumentInput | TextChunkCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type AudioChunkCreateWithoutDocumentInput = {
    id?: string
    s3Key: string
    s3Url: string
    duration?: number | null
    textHash?: string | null
    createdAt?: Date | string
    chunkIndex: number
  }

  export type AudioChunkUncheckedCreateWithoutDocumentInput = {
    id?: string
    s3Key: string
    s3Url: string
    duration?: number | null
    textHash?: string | null
    createdAt?: Date | string
    chunkIndex: number
  }

  export type AudioChunkCreateOrConnectWithoutDocumentInput = {
    where: AudioChunkWhereUniqueInput
    create: XOR<AudioChunkCreateWithoutDocumentInput, AudioChunkUncheckedCreateWithoutDocumentInput>
  }

  export type AudioChunkCreateManyDocumentInputEnvelope = {
    data: AudioChunkCreateManyDocumentInput | AudioChunkCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type PlaybackProgressCreateWithoutDocumentInput = {
    id?: string
    time: number
    chunkIndex?: number
    mode?: $Enums.ProcessingMode
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPlaybackProgressInput
  }

  export type PlaybackProgressUncheckedCreateWithoutDocumentInput = {
    id?: string
    time: number
    chunkIndex?: number
    mode?: $Enums.ProcessingMode
    updatedAt?: Date | string
    userId: string
  }

  export type PlaybackProgressCreateOrConnectWithoutDocumentInput = {
    where: PlaybackProgressWhereUniqueInput
    create: XOR<PlaybackProgressCreateWithoutDocumentInput, PlaybackProgressUncheckedCreateWithoutDocumentInput>
  }

  export type PlaybackProgressCreateManyDocumentInputEnvelope = {
    data: PlaybackProgressCreateManyDocumentInput | PlaybackProgressCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDocumentsInput = {
    update: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playbackProgress?: PlaybackProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playbackProgress?: PlaybackProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TextChunkUpsertWithWhereUniqueWithoutDocumentInput = {
    where: TextChunkWhereUniqueInput
    update: XOR<TextChunkUpdateWithoutDocumentInput, TextChunkUncheckedUpdateWithoutDocumentInput>
    create: XOR<TextChunkCreateWithoutDocumentInput, TextChunkUncheckedCreateWithoutDocumentInput>
  }

  export type TextChunkUpdateWithWhereUniqueWithoutDocumentInput = {
    where: TextChunkWhereUniqueInput
    data: XOR<TextChunkUpdateWithoutDocumentInput, TextChunkUncheckedUpdateWithoutDocumentInput>
  }

  export type TextChunkUpdateManyWithWhereWithoutDocumentInput = {
    where: TextChunkScalarWhereInput
    data: XOR<TextChunkUpdateManyMutationInput, TextChunkUncheckedUpdateManyWithoutDocumentInput>
  }

  export type TextChunkScalarWhereInput = {
    AND?: TextChunkScalarWhereInput | TextChunkScalarWhereInput[]
    OR?: TextChunkScalarWhereInput[]
    NOT?: TextChunkScalarWhereInput | TextChunkScalarWhereInput[]
    id?: StringFilter<"TextChunk"> | string
    index?: IntFilter<"TextChunk"> | number
    text?: StringFilter<"TextChunk"> | string
    tokenCount?: IntNullableFilter<"TextChunk"> | number | null
    mode?: EnumProcessingModeFilter<"TextChunk"> | $Enums.ProcessingMode
    processed?: StringNullableFilter<"TextChunk"> | string | null
    audioPath?: StringNullableFilter<"TextChunk"> | string | null
    audioDuration?: FloatNullableFilter<"TextChunk"> | number | null
    status?: EnumChunkStatusFilter<"TextChunk"> | $Enums.ChunkStatus
    createdAt?: DateTimeFilter<"TextChunk"> | Date | string
    documentId?: StringFilter<"TextChunk"> | string
  }

  export type AudioChunkUpsertWithWhereUniqueWithoutDocumentInput = {
    where: AudioChunkWhereUniqueInput
    update: XOR<AudioChunkUpdateWithoutDocumentInput, AudioChunkUncheckedUpdateWithoutDocumentInput>
    create: XOR<AudioChunkCreateWithoutDocumentInput, AudioChunkUncheckedCreateWithoutDocumentInput>
  }

  export type AudioChunkUpdateWithWhereUniqueWithoutDocumentInput = {
    where: AudioChunkWhereUniqueInput
    data: XOR<AudioChunkUpdateWithoutDocumentInput, AudioChunkUncheckedUpdateWithoutDocumentInput>
  }

  export type AudioChunkUpdateManyWithWhereWithoutDocumentInput = {
    where: AudioChunkScalarWhereInput
    data: XOR<AudioChunkUpdateManyMutationInput, AudioChunkUncheckedUpdateManyWithoutDocumentInput>
  }

  export type AudioChunkScalarWhereInput = {
    AND?: AudioChunkScalarWhereInput | AudioChunkScalarWhereInput[]
    OR?: AudioChunkScalarWhereInput[]
    NOT?: AudioChunkScalarWhereInput | AudioChunkScalarWhereInput[]
    id?: StringFilter<"AudioChunk"> | string
    s3Key?: StringFilter<"AudioChunk"> | string
    s3Url?: StringFilter<"AudioChunk"> | string
    duration?: FloatNullableFilter<"AudioChunk"> | number | null
    textHash?: StringNullableFilter<"AudioChunk"> | string | null
    createdAt?: DateTimeFilter<"AudioChunk"> | Date | string
    documentId?: StringFilter<"AudioChunk"> | string
    chunkIndex?: IntFilter<"AudioChunk"> | number
  }

  export type PlaybackProgressUpsertWithWhereUniqueWithoutDocumentInput = {
    where: PlaybackProgressWhereUniqueInput
    update: XOR<PlaybackProgressUpdateWithoutDocumentInput, PlaybackProgressUncheckedUpdateWithoutDocumentInput>
    create: XOR<PlaybackProgressCreateWithoutDocumentInput, PlaybackProgressUncheckedCreateWithoutDocumentInput>
  }

  export type PlaybackProgressUpdateWithWhereUniqueWithoutDocumentInput = {
    where: PlaybackProgressWhereUniqueInput
    data: XOR<PlaybackProgressUpdateWithoutDocumentInput, PlaybackProgressUncheckedUpdateWithoutDocumentInput>
  }

  export type PlaybackProgressUpdateManyWithWhereWithoutDocumentInput = {
    where: PlaybackProgressScalarWhereInput
    data: XOR<PlaybackProgressUpdateManyMutationInput, PlaybackProgressUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DocumentCreateWithoutChunksInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    pageCount?: number | null
    extractedText?: string | null
    language?: string
    status?: $Enums.DocumentStatus
    audioDuration?: number | null
    totalChunks?: number
    processedChunks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    errorMessage?: string | null
    errorCode?: string | null
    failedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDocumentsInput
    audioChunks?: AudioChunkCreateNestedManyWithoutDocumentInput
    playbackProgress?: PlaybackProgressCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutChunksInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    pageCount?: number | null
    extractedText?: string | null
    language?: string
    status?: $Enums.DocumentStatus
    audioDuration?: number | null
    totalChunks?: number
    processedChunks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    errorMessage?: string | null
    errorCode?: string | null
    failedAt?: Date | string | null
    userId: string
    audioChunks?: AudioChunkUncheckedCreateNestedManyWithoutDocumentInput
    playbackProgress?: PlaybackProgressUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutChunksInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutChunksInput, DocumentUncheckedCreateWithoutChunksInput>
  }

  export type DocumentUpsertWithoutChunksInput = {
    update: XOR<DocumentUpdateWithoutChunksInput, DocumentUncheckedUpdateWithoutChunksInput>
    create: XOR<DocumentCreateWithoutChunksInput, DocumentUncheckedCreateWithoutChunksInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutChunksInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutChunksInput, DocumentUncheckedUpdateWithoutChunksInput>
  }

  export type DocumentUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    audioChunks?: AudioChunkUpdateManyWithoutDocumentNestedInput
    playbackProgress?: PlaybackProgressUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    audioChunks?: AudioChunkUncheckedUpdateManyWithoutDocumentNestedInput
    playbackProgress?: PlaybackProgressUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateWithoutAudioChunksInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    pageCount?: number | null
    extractedText?: string | null
    language?: string
    status?: $Enums.DocumentStatus
    audioDuration?: number | null
    totalChunks?: number
    processedChunks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    errorMessage?: string | null
    errorCode?: string | null
    failedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDocumentsInput
    chunks?: TextChunkCreateNestedManyWithoutDocumentInput
    playbackProgress?: PlaybackProgressCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutAudioChunksInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    pageCount?: number | null
    extractedText?: string | null
    language?: string
    status?: $Enums.DocumentStatus
    audioDuration?: number | null
    totalChunks?: number
    processedChunks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    errorMessage?: string | null
    errorCode?: string | null
    failedAt?: Date | string | null
    userId: string
    chunks?: TextChunkUncheckedCreateNestedManyWithoutDocumentInput
    playbackProgress?: PlaybackProgressUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutAudioChunksInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutAudioChunksInput, DocumentUncheckedCreateWithoutAudioChunksInput>
  }

  export type DocumentUpsertWithoutAudioChunksInput = {
    update: XOR<DocumentUpdateWithoutAudioChunksInput, DocumentUncheckedUpdateWithoutAudioChunksInput>
    create: XOR<DocumentCreateWithoutAudioChunksInput, DocumentUncheckedCreateWithoutAudioChunksInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutAudioChunksInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutAudioChunksInput, DocumentUncheckedUpdateWithoutAudioChunksInput>
  }

  export type DocumentUpdateWithoutAudioChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    chunks?: TextChunkUpdateManyWithoutDocumentNestedInput
    playbackProgress?: PlaybackProgressUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutAudioChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    chunks?: TextChunkUncheckedUpdateManyWithoutDocumentNestedInput
    playbackProgress?: PlaybackProgressUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type UserCreateWithoutPlaybackProgressInput = {
    id?: string
    email: string
    name?: string | null
    isPremium?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPlaybackProgressInput = {
    id?: string
    email: string
    name?: string | null
    isPremium?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPlaybackProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPlaybackProgressInput, UserUncheckedCreateWithoutPlaybackProgressInput>
  }

  export type DocumentCreateWithoutPlaybackProgressInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    pageCount?: number | null
    extractedText?: string | null
    language?: string
    status?: $Enums.DocumentStatus
    audioDuration?: number | null
    totalChunks?: number
    processedChunks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    errorMessage?: string | null
    errorCode?: string | null
    failedAt?: Date | string | null
    user: UserCreateNestedOneWithoutDocumentsInput
    chunks?: TextChunkCreateNestedManyWithoutDocumentInput
    audioChunks?: AudioChunkCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutPlaybackProgressInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    pageCount?: number | null
    extractedText?: string | null
    language?: string
    status?: $Enums.DocumentStatus
    audioDuration?: number | null
    totalChunks?: number
    processedChunks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    errorMessage?: string | null
    errorCode?: string | null
    failedAt?: Date | string | null
    userId: string
    chunks?: TextChunkUncheckedCreateNestedManyWithoutDocumentInput
    audioChunks?: AudioChunkUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutPlaybackProgressInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutPlaybackProgressInput, DocumentUncheckedCreateWithoutPlaybackProgressInput>
  }

  export type UserUpsertWithoutPlaybackProgressInput = {
    update: XOR<UserUpdateWithoutPlaybackProgressInput, UserUncheckedUpdateWithoutPlaybackProgressInput>
    create: XOR<UserCreateWithoutPlaybackProgressInput, UserUncheckedCreateWithoutPlaybackProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPlaybackProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPlaybackProgressInput, UserUncheckedUpdateWithoutPlaybackProgressInput>
  }

  export type UserUpdateWithoutPlaybackProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPlaybackProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DocumentUpsertWithoutPlaybackProgressInput = {
    update: XOR<DocumentUpdateWithoutPlaybackProgressInput, DocumentUncheckedUpdateWithoutPlaybackProgressInput>
    create: XOR<DocumentCreateWithoutPlaybackProgressInput, DocumentUncheckedCreateWithoutPlaybackProgressInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutPlaybackProgressInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutPlaybackProgressInput, DocumentUncheckedUpdateWithoutPlaybackProgressInput>
  }

  export type DocumentUpdateWithoutPlaybackProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput
    chunks?: TextChunkUpdateManyWithoutDocumentNestedInput
    audioChunks?: AudioChunkUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutPlaybackProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    chunks?: TextChunkUncheckedUpdateManyWithoutDocumentNestedInput
    audioChunks?: AudioChunkUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyUserInput = {
    id?: string
    title: string
    fileName: string
    fileUrl: string
    fileSize?: number | null
    pageCount?: number | null
    extractedText?: string | null
    language?: string
    status?: $Enums.DocumentStatus
    audioDuration?: number | null
    totalChunks?: number
    processedChunks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    errorMessage?: string | null
    errorCode?: string | null
    failedAt?: Date | string | null
  }

  export type PlaybackProgressCreateManyUserInput = {
    id?: string
    time: number
    chunkIndex?: number
    mode?: $Enums.ProcessingMode
    updatedAt?: Date | string
    documentId: string
  }

  export type DocumentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chunks?: TextChunkUpdateManyWithoutDocumentNestedInput
    audioChunks?: AudioChunkUpdateManyWithoutDocumentNestedInput
    playbackProgress?: PlaybackProgressUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chunks?: TextChunkUncheckedUpdateManyWithoutDocumentNestedInput
    audioChunks?: AudioChunkUncheckedUpdateManyWithoutDocumentNestedInput
    playbackProgress?: PlaybackProgressUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    pageCount?: NullableIntFieldUpdateOperationsInput | number | null
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    totalChunks?: IntFieldUpdateOperationsInput | number
    processedChunks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableStringFieldUpdateOperationsInput | string | null
    failedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PlaybackProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: FloatFieldUpdateOperationsInput | number
    chunkIndex?: IntFieldUpdateOperationsInput | number
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutPlaybackProgressNestedInput
  }

  export type PlaybackProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: FloatFieldUpdateOperationsInput | number
    chunkIndex?: IntFieldUpdateOperationsInput | number
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentId?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybackProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: FloatFieldUpdateOperationsInput | number
    chunkIndex?: IntFieldUpdateOperationsInput | number
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentId?: StringFieldUpdateOperationsInput | string
  }

  export type TextChunkCreateManyDocumentInput = {
    id?: string
    index: number
    text: string
    tokenCount?: number | null
    mode?: $Enums.ProcessingMode
    processed?: string | null
    audioPath?: string | null
    audioDuration?: number | null
    status?: $Enums.ChunkStatus
    createdAt?: Date | string
  }

  export type AudioChunkCreateManyDocumentInput = {
    id?: string
    s3Key: string
    s3Url: string
    duration?: number | null
    textHash?: string | null
    createdAt?: Date | string
    chunkIndex: number
  }

  export type PlaybackProgressCreateManyDocumentInput = {
    id?: string
    time: number
    chunkIndex?: number
    mode?: $Enums.ProcessingMode
    updatedAt?: Date | string
    userId: string
  }

  export type TextChunkUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    processed?: NullableStringFieldUpdateOperationsInput | string | null
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumChunkStatusFieldUpdateOperationsInput | $Enums.ChunkStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TextChunkUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    processed?: NullableStringFieldUpdateOperationsInput | string | null
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumChunkStatusFieldUpdateOperationsInput | $Enums.ChunkStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TextChunkUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    tokenCount?: NullableIntFieldUpdateOperationsInput | number | null
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    processed?: NullableStringFieldUpdateOperationsInput | string | null
    audioPath?: NullableStringFieldUpdateOperationsInput | string | null
    audioDuration?: NullableFloatFieldUpdateOperationsInput | number | null
    status?: EnumChunkStatusFieldUpdateOperationsInput | $Enums.ChunkStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AudioChunkUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    textHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
  }

  export type AudioChunkUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    textHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
  }

  export type AudioChunkUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    s3Key?: StringFieldUpdateOperationsInput | string
    s3Url?: StringFieldUpdateOperationsInput | string
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    textHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
  }

  export type PlaybackProgressUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: FloatFieldUpdateOperationsInput | number
    chunkIndex?: IntFieldUpdateOperationsInput | number
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPlaybackProgressNestedInput
  }

  export type PlaybackProgressUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: FloatFieldUpdateOperationsInput | number
    chunkIndex?: IntFieldUpdateOperationsInput | number
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PlaybackProgressUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: FloatFieldUpdateOperationsInput | number
    chunkIndex?: IntFieldUpdateOperationsInput | number
    mode?: EnumProcessingModeFieldUpdateOperationsInput | $Enums.ProcessingMode
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}