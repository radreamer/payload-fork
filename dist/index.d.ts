import type { ExecutionResult, GraphQLSchema, ValidationRule } from 'graphql';
import type { Request as graphQLRequest, OperationArgs } from 'graphql-http';
import type { Logger } from 'pino';
import type { NonNever } from 'ts-essentials';
import type { AuthArgs } from './auth/operations/auth.js';
import type { Result as ForgotPasswordResult } from './auth/operations/forgotPassword.js';
import type { Options as ForgotPasswordOptions } from './auth/operations/local/forgotPassword.js';
import type { Options as LoginOptions } from './auth/operations/local/login.js';
import type { Options as ResetPasswordOptions } from './auth/operations/local/resetPassword.js';
import type { Options as UnlockOptions } from './auth/operations/local/unlock.js';
import type { Options as VerifyEmailOptions } from './auth/operations/local/verifyEmail.js';
import type { Result as LoginResult } from './auth/operations/login.js';
import type { Result as ResetPasswordResult } from './auth/operations/resetPassword.js';
import type { AuthStrategy, User } from './auth/types.js';
import type { BulkOperationResult, Collection, DataFromCollectionSlug, SelectFromCollectionSlug, TypeWithID } from './collections/config/types.js';
export type { FieldState } from './admin/forms/Form.js';
import type { Options as CountOptions } from './collections/operations/local/count.js';
import type { Options as CreateOptions } from './collections/operations/local/create.js';
import type { ByIDOptions as DeleteByIDOptions, ManyOptions as DeleteManyOptions } from './collections/operations/local/delete.js';
import type { Options as DuplicateOptions } from './collections/operations/local/duplicate.js';
import type { Options as FindOptions } from './collections/operations/local/find.js';
import type { Options as FindByIDOptions } from './collections/operations/local/findByID.js';
import type { Options as FindVersionByIDOptions } from './collections/operations/local/findVersionByID.js';
import type { Options as FindVersionsOptions } from './collections/operations/local/findVersions.js';
import type { Options as RestoreVersionOptions } from './collections/operations/local/restoreVersion.js';
import type { ByIDOptions as UpdateByIDOptions, ManyOptions as UpdateManyOptions } from './collections/operations/local/update.js';
import type { InitOptions, SanitizedConfig } from './config/types.js';
import type { BaseDatabaseAdapter, PaginatedDocs } from './database/types.js';
import type { InitializedEmailAdapter } from './email/types.js';
import type { DataFromGlobalSlug, Globals, SelectFromGlobalSlug } from './globals/config/types.js';
import type { CountGlobalVersionsOptions } from './globals/operations/local/countGlobalVersions.js';
import type { Options as FindGlobalOptions } from './globals/operations/local/findOne.js';
import type { Options as FindGlobalVersionByIDOptions } from './globals/operations/local/findVersionByID.js';
import type { Options as FindGlobalVersionsOptions } from './globals/operations/local/findVersions.js';
import type { Options as RestoreGlobalVersionOptions } from './globals/operations/local/restoreVersion.js';
import type { Options as UpdateGlobalOptions } from './globals/operations/local/update.js';
import type { ApplyDisableErrors, JsonObject, SelectType, TransformCollectionWithSelect, TransformGlobalWithSelect } from './types/index.js';
export type * from './admin/types.js';
import type { TypeWithVersion } from './versions/types.js';
import { decrypt, encrypt } from './auth/crypto.js';
import { type ImportMap } from './bin/generateImportMap/index.js';
import { type FlattenedBlock } from './fields/config/types.js';
export { default as executeAccess } from './auth/executeAccess.js';
export { executeAuthStrategies } from './auth/executeAuthStrategies.js';
export { extractAccessFromPermission } from './auth/extractAccessFromPermission.js';
export { getAccessResults } from './auth/getAccessResults.js';
export { getFieldsToSign } from './auth/getFieldsToSign.js';
export { getLoginOptions } from './auth/getLoginOptions.js';
export interface GeneratedTypes {
    authUntyped: {
        [slug: string]: {
            forgotPassword: {
                email: string;
            };
            login: {
                email: string;
                password: string;
            };
            registerFirstUser: {
                email: string;
                password: string;
            };
            unlock: {
                email: string;
            };
        };
    };
    blocksUntyped: {
        [slug: string]: JsonObject;
    };
    collectionsJoinsUntyped: {
        [slug: string]: {
            [schemaPath: string]: CollectionSlug;
        };
    };
    collectionsSelectUntyped: {
        [slug: string]: SelectType;
    };
    collectionsUntyped: {
        [slug: string]: JsonObject & TypeWithID;
    };
    dbUntyped: {
        defaultIDType: number | string;
    };
    globalsSelectUntyped: {
        [slug: string]: SelectType;
    };
    globalsUntyped: {
        [slug: string]: JsonObject;
    };
    jobsUntyped: {
        tasks: {
            [slug: string]: {
                input?: JsonObject;
                output?: JsonObject;
            };
        };
        workflows: {
            [slug: string]: {
                input: JsonObject;
            };
        };
    };
    localeUntyped: null | string;
    userUntyped: User;
}
type ResolveCollectionType<T> = 'collections' extends keyof T ? T['collections'] : T['collectionsUntyped'];
type ResolveBlockType<T> = 'blocks' extends keyof T ? T['blocks'] : T['blocksUntyped'];
type ResolveCollectionSelectType<T> = 'collectionsSelect' extends keyof T ? T['collectionsSelect'] : T['collectionsSelectUntyped'];
type ResolveCollectionJoinsType<T> = 'collectionsJoins' extends keyof T ? T['collectionsJoins'] : T['collectionsJoinsUntyped'];
type ResolveGlobalType<T> = 'globals' extends keyof T ? T['globals'] : T['globalsUntyped'];
type ResolveGlobalSelectType<T> = 'globalsSelect' extends keyof T ? T['globalsSelect'] : T['globalsSelectUntyped'];
export type TypedCollection = ResolveCollectionType<GeneratedTypes>;
export type TypedBlock = ResolveBlockType<GeneratedTypes>;
export type TypedUploadCollection = NonNever<{
    [K in keyof TypedCollection]: 'filename' | 'filesize' | 'mimeType' | 'url' extends keyof TypedCollection[K] ? TypedCollection[K] : never;
}>;
export type TypedCollectionSelect = ResolveCollectionSelectType<GeneratedTypes>;
export type TypedCollectionJoins = ResolveCollectionJoinsType<GeneratedTypes>;
export type TypedGlobal = ResolveGlobalType<GeneratedTypes>;
export type TypedGlobalSelect = ResolveGlobalSelectType<GeneratedTypes>;
export type StringKeyOf<T> = Extract<keyof T, string>;
export type CollectionSlug = StringKeyOf<TypedCollection>;
export type BlockSlug = StringKeyOf<TypedBlock>;
export type UploadCollectionSlug = StringKeyOf<TypedUploadCollection>;
type ResolveDbType<T> = 'db' extends keyof T ? T['db'] : T['dbUntyped'];
export type DefaultDocumentIDType = ResolveDbType<GeneratedTypes>['defaultIDType'];
export type GlobalSlug = StringKeyOf<TypedGlobal>;
type ResolveLocaleType<T> = 'locale' extends keyof T ? T['locale'] : T['localeUntyped'];
type ResolveUserType<T> = 'user' extends keyof T ? T['user'] : T['userUntyped'];
export type TypedLocale = ResolveLocaleType<GeneratedTypes>;
export type TypedUser = ResolveUserType<GeneratedTypes>;
type ResolveAuthOperationsType<T> = 'auth' extends keyof T ? T['auth'] : T['authUntyped'];
export type TypedAuthOperations = ResolveAuthOperationsType<GeneratedTypes>;
type ResolveJobOperationsType<T> = 'jobs' extends keyof T ? T['jobs'] : T['jobsUntyped'];
export type TypedJobs = ResolveJobOperationsType<GeneratedTypes>;
/**
 * @description Payload
 */
export declare class BasePayload {
    /**
     * @description Authorization and Authentication using headers and cookies to run auth user strategies
     * @returns permissions: Permissions
     * @returns user: User
     */
    auth: (options: AuthArgs) => Promise<import("./auth/operations/auth.js").AuthResult>;
    authStrategies: AuthStrategy[];
    blocks: Record<BlockSlug, FlattenedBlock>;
    collections: Record<CollectionSlug, Collection>;
    config: SanitizedConfig;
    /**
     * @description Performs count operation
     * @param options
     * @returns count of documents satisfying query
     */
    count: <T extends CollectionSlug>(options: CountOptions<T>) => Promise<{
        totalDocs: number;
    }>;
    /**
     * @description Performs countGlobalVersions operation
     * @param options
     * @returns count of global document versions satisfying query
     */
    countGlobalVersions: <T extends GlobalSlug>(options: CountGlobalVersionsOptions<T>) => Promise<{
        totalDocs: number;
    }>;
    /**
     * @description Performs countVersions operation
     * @param options
     * @returns count of document versions satisfying query
     */
    countVersions: <T extends CollectionSlug>(options: CountOptions<T>) => Promise<{
        totalDocs: number;
    }>;
    /**
     * @description Performs create operation
     * @param options
     * @returns created document
     */
    create: <TSlug extends CollectionSlug, TSelect extends SelectFromCollectionSlug<TSlug>>(options: CreateOptions<TSlug, TSelect>) => Promise<TransformCollectionWithSelect<TSlug, TSelect>>;
    db: DatabaseAdapter;
    decrypt: typeof decrypt;
    duplicate: <TSlug extends CollectionSlug, TSelect extends SelectFromCollectionSlug<TSlug>>(options: DuplicateOptions<TSlug, TSelect>) => Promise<TransformCollectionWithSelect<TSlug, TSelect>>;
    email: InitializedEmailAdapter;
    encrypt: typeof encrypt;
    extensions: (args: {
        args: OperationArgs<any>;
        req: graphQLRequest<unknown, unknown>;
        result: ExecutionResult;
    }) => Promise<any>;
    /**
     * @description Find documents with criteria
     * @param options
     * @returns documents satisfying query
     */
    find: <TSlug extends CollectionSlug, TSelect extends SelectFromCollectionSlug<TSlug>>(options: FindOptions<TSlug, TSelect>) => Promise<PaginatedDocs<TransformCollectionWithSelect<TSlug, TSelect>>>;
    /**
     * @description Find document by ID
     * @param options
     * @returns document with specified ID
     */
    findByID: <TSlug extends CollectionSlug, TDisableErrors extends boolean, TSelect extends SelectFromCollectionSlug<TSlug>>(options: FindByIDOptions<TSlug, TDisableErrors, TSelect>) => Promise<ApplyDisableErrors<TransformCollectionWithSelect<TSlug, TSelect>, TDisableErrors>>;
    findGlobal: <TSlug extends GlobalSlug, TSelect extends SelectFromGlobalSlug<TSlug>>(options: FindGlobalOptions<TSlug, TSelect>) => Promise<TransformGlobalWithSelect<TSlug, TSelect>>;
    /**
     * @description Find global version by ID
     * @param options
     * @returns global version with specified ID
     */
    findGlobalVersionByID: <TSlug extends GlobalSlug>(options: FindGlobalVersionByIDOptions<TSlug>) => Promise<TypeWithVersion<DataFromGlobalSlug<TSlug>>>;
    /**
     * @description Find global versions with criteria
     * @param options
     * @returns versions satisfying query
     */
    findGlobalVersions: <TSlug extends GlobalSlug>(options: FindGlobalVersionsOptions<TSlug>) => Promise<PaginatedDocs<TypeWithVersion<DataFromGlobalSlug<TSlug>>>>;
    /**
     * @description Find version by ID
     * @param options
     * @returns version with specified ID
     */
    findVersionByID: <TSlug extends CollectionSlug>(options: FindVersionByIDOptions<TSlug>) => Promise<TypeWithVersion<DataFromCollectionSlug<TSlug>>>;
    /**
     * @description Find versions with criteria
     * @param options
     * @returns versions satisfying query
     */
    findVersions: <TSlug extends CollectionSlug>(options: FindVersionsOptions<TSlug>) => Promise<PaginatedDocs<TypeWithVersion<DataFromCollectionSlug<TSlug>>>>;
    forgotPassword: <TSlug extends CollectionSlug>(options: ForgotPasswordOptions<TSlug>) => Promise<ForgotPasswordResult>;
    getAdminURL: () => string;
    getAPIURL: () => string;
    globals: Globals;
    importMap: ImportMap;
    jobs: {
        queue: <TTaskOrWorkflowSlug extends keyof TypedJobs["tasks"] | keyof TypedJobs["workflows"]>(args: {
            input: TypedJobs["tasks"][TTaskOrWorkflowSlug]["input"];
            queue?: string;
            req?: import("./types/index.js").PayloadRequest;
            task: TTaskOrWorkflowSlug extends keyof TypedJobs["tasks"] ? TTaskOrWorkflowSlug : never;
            waitUntil?: Date;
            workflow?: never;
        } | {
            input: TypedJobs["workflows"][TTaskOrWorkflowSlug]["input"];
            queue?: string;
            req?: import("./types/index.js").PayloadRequest;
            task?: never;
            waitUntil?: Date;
            workflow: TTaskOrWorkflowSlug extends keyof TypedJobs["workflows"] ? TTaskOrWorkflowSlug : never;
        }) => Promise<TTaskOrWorkflowSlug extends keyof TypedJobs["workflows"] ? import("./queues/config/types/workflowTypes.js").RunningJob<TTaskOrWorkflowSlug> : import("./queues/config/types/workflowTypes.js").RunningJobFromTask<TTaskOrWorkflowSlug>>;
        run: (args?: {
            limit?: number;
            overrideAccess?: boolean;
            processingOrder?: import("./types/index.js").Sort;
            queue?: string;
            req?: import("./types/index.js").PayloadRequest;
            sequential?: boolean;
            where?: import("./types/index.js").Where;
        }) => Promise<ReturnType<typeof import("./queues/operations/runJobs/index.js").runJobs>>;
        runByID: (args: {
            id: number | string;
            overrideAccess?: boolean;
            req?: import("./types/index.js").PayloadRequest;
        }) => Promise<ReturnType<typeof import("./queues/operations/runJobs/index.js").runJobs>>;
        cancel: (args: {
            overrideAccess?: boolean;
            queue?: string;
            req?: import("./types/index.js").PayloadRequest;
            where: import("./types/index.js").Where;
        }) => Promise<void>;
        cancelByID: (args: {
            id: number | string;
            overrideAccess?: boolean;
            req?: import("./types/index.js").PayloadRequest;
        }) => Promise<void>;
    };
    logger: Logger;
    login: <TSlug extends CollectionSlug>(options: LoginOptions<TSlug>) => Promise<{
        user: DataFromCollectionSlug<TSlug>;
    } & LoginResult>;
    resetPassword: <TSlug extends CollectionSlug>(options: ResetPasswordOptions<TSlug>) => Promise<ResetPasswordResult>;
    /**
     * @description Restore global version by ID
     * @param options
     * @returns version with specified ID
     */
    restoreGlobalVersion: <TSlug extends GlobalSlug>(options: RestoreGlobalVersionOptions<TSlug>) => Promise<DataFromGlobalSlug<TSlug>>;
    /**
     * @description Restore version by ID
     * @param options
     * @returns version with specified ID
     */
    restoreVersion: <TSlug extends CollectionSlug>(options: RestoreVersionOptions<TSlug>) => Promise<DataFromCollectionSlug<TSlug>>;
    schema: GraphQLSchema;
    secret: string;
    sendEmail: InitializedEmailAdapter['sendEmail'];
    types: {
        arrayTypes: any;
        blockInputTypes: any;
        blockTypes: any;
        fallbackLocaleInputType?: any;
        groupTypes: any;
        localeInputType?: any;
        tabTypes: any;
    };
    unlock: <TSlug extends CollectionSlug>(options: UnlockOptions<TSlug>) => Promise<boolean>;
    updateGlobal: <TSlug extends GlobalSlug, TSelect extends SelectFromGlobalSlug<TSlug>>(options: UpdateGlobalOptions<TSlug, TSelect>) => Promise<TransformGlobalWithSelect<TSlug, TSelect>>;
    validationRules: (args: OperationArgs<any>) => ValidationRule[];
    verifyEmail: <TSlug extends CollectionSlug>(options: VerifyEmailOptions<TSlug>) => Promise<boolean>;
    versions: {
        [slug: string]: any;
    };
    bin({ args, cwd, log, }: {
        args: string[];
        cwd?: string;
        log?: boolean;
    }): Promise<{
        code: number;
    }>;
    /**
     * @description delete one or more documents
     * @param options
     * @returns Updated document(s)
     */
    delete<TSlug extends CollectionSlug, TSelect extends SelectFromCollectionSlug<TSlug>>(options: DeleteByIDOptions<TSlug, TSelect>): Promise<TransformCollectionWithSelect<TSlug, TSelect>>;
    delete<TSlug extends CollectionSlug, TSelect extends SelectFromCollectionSlug<TSlug>>(options: DeleteManyOptions<TSlug, TSelect>): Promise<BulkOperationResult<TSlug, TSelect>>;
    /**
     * @description Initializes Payload
     * @param options
     */
    init(options: InitOptions): Promise<Payload>;
    update<TSlug extends CollectionSlug, TSelect extends SelectFromCollectionSlug<TSlug>>(options: UpdateManyOptions<TSlug, TSelect>): Promise<BulkOperationResult<TSlug, TSelect>>;
    /**
     * @description Update one or more documents
     * @param options
     * @returns Updated document(s)
     */
    update<TSlug extends CollectionSlug, TSelect extends SelectFromCollectionSlug<TSlug>>(options: UpdateByIDOptions<TSlug, TSelect>): Promise<TransformCollectionWithSelect<TSlug, TSelect>>;
}
declare const initialized: BasePayload;
export default initialized;
export declare const reload: (config: SanitizedConfig, payload: Payload, skipImportMapGeneration?: boolean) => Promise<void>;
export declare const getPayload: (options: Pick<InitOptions, "config" | "importMap">) => Promise<Payload>;
type Payload = BasePayload;
interface RequestContext {
    [key: string]: unknown;
}
export interface DatabaseAdapter extends BaseDatabaseAdapter {
}
export type { Payload, RequestContext };
export * from './auth/index.js';
export { jwtSign } from './auth/jwt.js';
export { accessOperation } from './auth/operations/access.js';
export { forgotPasswordOperation } from './auth/operations/forgotPassword.js';
export { initOperation } from './auth/operations/init.js';
export { checkLoginPermission } from './auth/operations/login.js';
export { loginOperation } from './auth/operations/login.js';
export { logoutOperation } from './auth/operations/logout.js';
export type { MeOperationResult } from './auth/operations/me.js';
export { meOperation } from './auth/operations/me.js';
export { refreshOperation } from './auth/operations/refresh.js';
export { registerFirstUserOperation } from './auth/operations/registerFirstUser.js';
export { resetPasswordOperation } from './auth/operations/resetPassword.js';
export { unlockOperation } from './auth/operations/unlock.js';
export { verifyEmailOperation } from './auth/operations/verifyEmail.js';
export { JWTAuthentication } from './auth/strategies/jwt.js';
export { incrementLoginAttempts } from './auth/strategies/local/incrementLoginAttempts.js';
export { resetLoginAttempts } from './auth/strategies/local/resetLoginAttempts.js';
export type { AuthStrategyFunction, AuthStrategyFunctionArgs, AuthStrategyResult, CollectionPermission, DocumentPermissions, FieldPermissions, GlobalPermission, IncomingAuthType, Permission, Permissions, SanitizedCollectionPermission, SanitizedDocumentPermissions, SanitizedFieldPermissions, SanitizedGlobalPermission, SanitizedPermissions, User, VerifyConfig, } from './auth/types.js';
export { generateImportMap } from './bin/generateImportMap/index.js';
export type { ImportMap } from './bin/generateImportMap/index.js';
export { genImportMapIterateFields } from './bin/generateImportMap/iterateFields.js';
export { type ClientCollectionConfig, createClientCollectionConfig, createClientCollectionConfigs, type ServerOnlyCollectionAdminProperties, type ServerOnlyCollectionProperties, type ServerOnlyUploadProperties, } from './collections/config/client.js';
export type { AfterChangeHook as CollectionAfterChangeHook, AfterDeleteHook as CollectionAfterDeleteHook, AfterErrorHook as CollectionAfterErrorHook, AfterForgotPasswordHook as CollectionAfterForgotPasswordHook, AfterLoginHook as CollectionAfterLoginHook, AfterLogoutHook as CollectionAfterLogoutHook, AfterMeHook as CollectionAfterMeHook, AfterOperationHook as CollectionAfterOperationHook, AfterReadHook as CollectionAfterReadHook, AfterRefreshHook as CollectionAfterRefreshHook, AuthCollection, AuthOperationsFromCollectionSlug, BaseListFilter, BeforeChangeHook as CollectionBeforeChangeHook, BeforeDeleteHook as CollectionBeforeDeleteHook, BeforeLoginHook as CollectionBeforeLoginHook, BeforeOperationHook as CollectionBeforeOperationHook, BeforeReadHook as CollectionBeforeReadHook, BeforeValidateHook as CollectionBeforeValidateHook, BulkOperationResult, Collection, CollectionAdminOptions, CollectionConfig, DataFromCollectionSlug, HookOperationType, MeHook as CollectionMeHook, RefreshHook as CollectionRefreshHook, RequiredDataFromCollection, RequiredDataFromCollectionSlug, SanitizedCollectionConfig, SanitizedJoins, TypeWithID, TypeWithTimestamps, } from './collections/config/types.js';
export type { CompoundIndex } from './collections/config/types.js';
export type { SanitizedCompoundIndex } from './collections/config/types.js';
export { createDataloaderCacheKey, getDataLoader } from './collections/dataloader.js';
export { countOperation } from './collections/operations/count.js';
export { createOperation } from './collections/operations/create.js';
export { deleteOperation } from './collections/operations/delete.js';
export { deleteByIDOperation } from './collections/operations/deleteByID.js';
export { docAccessOperation } from './collections/operations/docAccess.js';
export { duplicateOperation } from './collections/operations/duplicate.js';
export { findOperation } from './collections/operations/find.js';
export { findByIDOperation } from './collections/operations/findByID.js';
export { findVersionByIDOperation } from './collections/operations/findVersionByID.js';
export { findVersionsOperation } from './collections/operations/findVersions.js';
export { restoreVersionOperation } from './collections/operations/restoreVersion.js';
export { updateOperation } from './collections/operations/update.js';
export { updateByIDOperation } from './collections/operations/updateByID.js';
export { buildConfig } from './config/build.js';
export { type ClientConfig, createClientConfig, serverOnlyAdminConfigProperties, serverOnlyConfigProperties, type UnsanitizedClientConfig, } from './config/client.js';
export { defaults } from './config/defaults.js';
export { type OrderableEndpointBody } from './config/orderable/index.js';
export { sanitizeConfig } from './config/sanitize.js';
export type * from './config/types.js';
export { combineQueries } from './database/combineQueries.js';
export { createDatabaseAdapter } from './database/createDatabaseAdapter.js';
export { defaultBeginTransaction } from './database/defaultBeginTransaction.js';
export { flattenWhereToOperators } from './database/flattenWhereToOperators.js';
export { getLocalizedPaths } from './database/getLocalizedPaths.js';
export { createMigration } from './database/migrations/createMigration.js';
export { getMigrations } from './database/migrations/getMigrations.js';
export { getPredefinedMigration } from './database/migrations/getPredefinedMigration.js';
export { migrate } from './database/migrations/migrate.js';
export { migrateDown } from './database/migrations/migrateDown.js';
export { migrateRefresh } from './database/migrations/migrateRefresh.js';
export { migrateReset } from './database/migrations/migrateReset.js';
export { migrateStatus } from './database/migrations/migrateStatus.js';
export { migrationsCollection } from './database/migrations/migrationsCollection.js';
export { migrationTemplate } from './database/migrations/migrationTemplate.js';
export { readMigrationFiles } from './database/migrations/readMigrationFiles.js';
export { writeMigrationIndex } from './database/migrations/writeMigrationIndex.js';
export type * from './database/queryValidation/types.js';
export type { EntityPolicies, PathToQuery } from './database/queryValidation/types.js';
export { validateQueryPaths } from './database/queryValidation/validateQueryPaths.js';
export { validateSearchParam } from './database/queryValidation/validateSearchParams.js';
export type { BaseDatabaseAdapter, BeginTransaction, CommitTransaction, Connect, Count, CountArgs, CountGlobalVersionArgs, CountGlobalVersions, CountVersions, Create, CreateArgs, CreateGlobal, CreateGlobalArgs, CreateGlobalVersion, CreateGlobalVersionArgs, CreateMigration, CreateVersion, CreateVersionArgs, DatabaseAdapterResult as DatabaseAdapterObj, DBIdentifierName, DeleteMany, DeleteManyArgs, DeleteOne, DeleteOneArgs, DeleteVersions, DeleteVersionsArgs, Destroy, Find, FindArgs, FindGlobal, FindGlobalArgs, FindGlobalVersions, FindGlobalVersionsArgs, FindOne, FindOneArgs, FindVersions, FindVersionsArgs, GenerateSchema, Init, Migration, MigrationData, MigrationTemplateArgs, PaginatedDocs, QueryDrafts, QueryDraftsArgs, RollbackTransaction, Transaction, UpdateGlobal, UpdateGlobalArgs, UpdateGlobalVersion, UpdateGlobalVersionArgs, UpdateJobs, UpdateJobsArgs, UpdateMany, UpdateManyArgs, UpdateOne, UpdateOneArgs, UpdateVersion, UpdateVersionArgs, Upsert, UpsertArgs, } from './database/types.js';
export type { EmailAdapter as PayloadEmailAdapter, SendEmailOptions } from './email/types.js';
export { APIError, APIErrorName, AuthenticationError, DuplicateCollection, DuplicateFieldName, DuplicateGlobal, ErrorDeletingFile, FileRetrievalError, FileUploadError, Forbidden, InvalidConfiguration, InvalidFieldName, InvalidFieldRelationship, Locked, LockedAuth, MissingCollectionLabel, MissingEditorProp, MissingFieldInputOptions, MissingFieldType, MissingFile, NotFound, QueryError, UnverifiedEmail, ValidationError, ValidationErrorName, } from './errors/index.js';
export type { ValidationFieldError } from './errors/index.js';
export { baseBlockFields } from './fields/baseFields/baseBlockFields.js';
export { baseIDField } from './fields/baseFields/baseIDField.js';
export { createClientField, createClientFields, type ServerOnlyFieldAdminProperties, type ServerOnlyFieldProperties, } from './fields/config/client.js';
export { sanitizeFields } from './fields/config/sanitize.js';
export type { AdminClient, ArrayField, ArrayFieldClient, BaseValidateOptions, Block, BlockJSX, BlocksField, BlocksFieldClient, CheckboxField, CheckboxFieldClient, ClientBlock, ClientField, ClientFieldProps, CodeField, CodeFieldClient, CollapsibleField, CollapsibleFieldClient, Condition, DateField, DateFieldClient, EmailField, EmailFieldClient, Field, FieldAccess, FieldAffectingData, FieldAffectingDataClient, FieldBase, FieldBaseClient, FieldHook, FieldHookArgs, FieldPresentationalOnly, FieldPresentationalOnlyClient, FieldTypes, FieldWithMany, FieldWithManyClient, FieldWithMaxDepth, FieldWithMaxDepthClient, FieldWithPath, FieldWithPathClient, FieldWithSubFields, FieldWithSubFieldsClient, FilterOptions, FilterOptionsProps, FlattenedArrayField, FlattenedBlock, FlattenedBlocksField, FlattenedField, FlattenedGroupField, FlattenedJoinField, FlattenedTabAsField, GroupField, GroupFieldClient, HookName, JoinField, JoinFieldClient, JSONField, JSONFieldClient, Labels, LabelsClient, NamedGroupField, NamedGroupFieldClient, NamedTab, NonPresentationalField, NonPresentationalFieldClient, NumberField, NumberFieldClient, Option, OptionLabel, OptionObject, PointField, PointFieldClient, PolymorphicRelationshipField, PolymorphicRelationshipFieldClient, RadioField, RadioFieldClient, RelationshipField, RelationshipFieldClient, RelationshipValue, RichTextField, RichTextFieldClient, RowField, RowFieldClient, SelectField, SelectFieldClient, SingleRelationshipField, SingleRelationshipFieldClient, Tab, TabAsField, TabAsFieldClient, TabsField, TabsFieldClient, TextareaField, TextareaFieldClient, TextField, TextFieldClient, UIField, UIFieldClient, UnnamedGroupField, UnnamedGroupFieldClient, UnnamedTab, UploadField, UploadFieldClient, Validate, ValidateOptions, ValueWithRelation, } from './fields/config/types.js';
export { getDefaultValue } from './fields/getDefaultValue.js';
export { traverseFields as afterChangeTraverseFields } from './fields/hooks/afterChange/traverseFields.js';
export { promise as afterReadPromise } from './fields/hooks/afterRead/promise.js';
export { traverseFields as afterReadTraverseFields } from './fields/hooks/afterRead/traverseFields.js';
export { traverseFields as beforeChangeTraverseFields } from './fields/hooks/beforeChange/traverseFields.js';
export { traverseFields as beforeValidateTraverseFields } from './fields/hooks/beforeValidate/traverseFields.js';
export { default as sortableFieldTypes } from './fields/sortableFieldTypes.js';
export { validations } from './fields/validations.js';
export type { ArrayFieldValidation, BlocksFieldValidation, CheckboxFieldValidation, CodeFieldValidation, ConfirmPasswordFieldValidation, DateFieldValidation, EmailFieldValidation, JSONFieldValidation, NumberFieldManyValidation, NumberFieldSingleValidation, NumberFieldValidation, PasswordFieldValidation, PointFieldValidation, RadioFieldValidation, RelationshipFieldManyValidation, RelationshipFieldSingleValidation, RelationshipFieldValidation, RichTextFieldValidation, SelectFieldManyValidation, SelectFieldSingleValidation, SelectFieldValidation, TextareaFieldValidation, TextFieldManyValidation, TextFieldSingleValidation, TextFieldValidation, UploadFieldManyValidation, UploadFieldSingleValidation, UploadFieldValidation, UsernameFieldValidation, } from './fields/validations.js';
export { type ClientGlobalConfig, createClientGlobalConfig, createClientGlobalConfigs, type ServerOnlyGlobalAdminProperties, type ServerOnlyGlobalProperties, } from './globals/config/client.js';
export type { AfterChangeHook as GlobalAfterChangeHook, AfterReadHook as GlobalAfterReadHook, BeforeChangeHook as GlobalBeforeChangeHook, BeforeReadHook as GlobalBeforeReadHook, BeforeValidateHook as GlobalBeforeValidateHook, DataFromGlobalSlug, GlobalAdminOptions, GlobalConfig, SanitizedGlobalConfig, } from './globals/config/types.js';
export { docAccessOperation as docAccessOperationGlobal } from './globals/operations/docAccess.js';
export { findOneOperation } from './globals/operations/findOne.js';
export { findVersionByIDOperation as findVersionByIDOperationGlobal } from './globals/operations/findVersionByID.js';
export { findVersionsOperation as findVersionsOperationGlobal } from './globals/operations/findVersions.js';
export { restoreVersionOperation as restoreVersionOperationGlobal } from './globals/operations/restoreVersion.js';
export { updateOperation as updateOperationGlobal } from './globals/operations/update.js';
export type { CollapsedPreferences, ColumnPreference, DocumentPreferences, FieldsPreferences, InsideFieldsPreferences, ListPreferences, PreferenceRequest, PreferenceUpdateRequest, TabsPreferences, } from './preferences/types.js';
export type { QueryPreset } from './query-presets/types.js';
export { jobAfterRead } from './queues/config/index.js';
export type { JobsConfig, RunJobAccess, RunJobAccessArgs } from './queues/config/types/index.js';
export type { RunInlineTaskFunction, RunTaskFunction, RunTaskFunctions, TaskConfig, TaskHandler, TaskHandlerArgs, TaskHandlerResult, TaskHandlerResults, TaskInput, TaskOutput, TaskType, } from './queues/config/types/taskTypes.js';
export type { BaseJob, JobLog, JobTaskStatus, RunningJob, SingleTaskStatus, WorkflowConfig, WorkflowHandler, WorkflowTypes, } from './queues/config/types/workflowTypes.js';
export { importHandlerPath } from './queues/operations/runJobs/runJob/importHandlerPath.js';
export { getLocalI18n } from './translations/getLocalI18n.js';
export * from './types/index.js';
export { getFileByPath } from './uploads/getFileByPath.js';
export type * from './uploads/types.js';
export { addDataAndFileToRequest } from './utilities/addDataAndFileToRequest.js';
export { addLocalesToRequestFromData, sanitizeLocales } from './utilities/addLocalesToRequest.js';
export { commitTransaction } from './utilities/commitTransaction.js';
export { configToJSONSchema, entityToJSONSchema, fieldsToJSONSchema, withNullableJSONSchemaType, } from './utilities/configToJSONSchema.js';
export { createArrayFromCommaDelineated } from './utilities/createArrayFromCommaDelineated.js';
export { createLocalReq } from './utilities/createLocalReq.js';
export { createPayloadRequest } from './utilities/createPayloadRequest.js';
export { deepCopyObject, deepCopyObjectComplex, deepCopyObjectSimple, } from './utilities/deepCopyObject.js';
export { deepMerge, deepMergeWithCombinedArrays, deepMergeWithReactComponents, deepMergeWithSourceArrays, } from './utilities/deepMerge.js';
export { checkDependencies, type CustomVersionParser, } from './utilities/dependencies/dependencyChecker.js';
export { getDependencies } from './utilities/dependencies/getDependencies.js';
export type { FieldSchemaJSON } from './utilities/fieldSchemaToJSON.js';
export { findUp, findUpSync, pathExistsAndIsAccessible, pathExistsAndIsAccessibleSync, } from './utilities/findUp.js';
export { flattenAllFields } from './utilities/flattenAllFields.js';
export { default as flattenTopLevelFields } from './utilities/flattenTopLevelFields.js';
export { formatErrors } from './utilities/formatErrors.js';
export { formatLabels, formatNames, toWords } from './utilities/formatLabels.js';
export { getBlockSelect } from './utilities/getBlockSelect.js';
export { getCollectionIDFieldTypes } from './utilities/getCollectionIDFieldTypes.js';
export { getFieldByPath } from './utilities/getFieldByPath.js';
export { getObjectDotNotation } from './utilities/getObjectDotNotation.js';
export { getRequestLanguage } from './utilities/getRequestLanguage.js';
export { handleEndpoints } from './utilities/handleEndpoints.js';
export { headersWithCors } from './utilities/headersWithCors.js';
export { initTransaction } from './utilities/initTransaction.js';
export { isEntityHidden } from './utilities/isEntityHidden.js';
export { default as isolateObjectProperty } from './utilities/isolateObjectProperty.js';
export { isPlainObject } from './utilities/isPlainObject.js';
export { isValidID } from './utilities/isValidID.js';
export { killTransaction } from './utilities/killTransaction.js';
export { logError } from './utilities/logError.js';
export { defaultLoggerOptions } from './utilities/logger.js';
export { mapAsync } from './utilities/mapAsync.js';
export { mergeHeaders } from './utilities/mergeHeaders.js';
export { sanitizeFallbackLocale } from './utilities/sanitizeFallbackLocale.js';
export { sanitizeJoinParams } from './utilities/sanitizeJoinParams.js';
export { sanitizePopulateParam } from './utilities/sanitizePopulateParam.js';
export { sanitizeSelectParam } from './utilities/sanitizeSelectParam.js';
export { stripUnselectedFields } from './utilities/stripUnselectedFields.js';
export { traverseFields } from './utilities/traverseFields.js';
export type { TraverseFieldsCallback } from './utilities/traverseFields.js';
export { buildVersionCollectionFields } from './versions/buildCollectionFields.js';
export { buildVersionGlobalFields } from './versions/buildGlobalFields.js';
export { buildVersionCompoundIndexes } from './versions/buildVersionCompoundIndexes.js';
export { versionDefaults } from './versions/defaults.js';
export { deleteCollectionVersions } from './versions/deleteCollectionVersions.js';
export { appendVersionToQueryKey } from './versions/drafts/appendVersionToQueryKey.js';
export { getQueryDraftsSort } from './versions/drafts/getQueryDraftsSort.js';
export { enforceMaxVersions } from './versions/enforceMaxVersions.js';
export { getLatestCollectionVersion } from './versions/getLatestCollectionVersion.js';
export { getLatestGlobalVersion } from './versions/getLatestGlobalVersion.js';
export { saveVersion } from './versions/saveVersion.js';
export type { SchedulePublishTaskInput } from './versions/schedule/types.js';
export type { SchedulePublish, TypeWithVersion } from './versions/types.js';
export { deepMergeSimple } from '@payloadcms/translations/utilities';
//# sourceMappingURL=index.d.ts.map