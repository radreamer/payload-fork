// @ts-strict-ignore
import { spawn } from 'child_process';
import crypto from 'crypto';
import { fileURLToPath } from 'node:url';
import path from 'path';
import WebSocket from 'ws';
import { Cron } from 'croner';
import { decrypt, encrypt } from './auth/crypto.js';
import { APIKeyAuthentication } from './auth/strategies/apiKey.js';
import { JWTAuthentication } from './auth/strategies/jwt.js';
import { generateImportMap } from './bin/generateImportMap/index.js';
import { checkPayloadDependencies } from './checkPayloadDependencies.js';
import localOperations from './collections/operations/local/index.js';
import { consoleEmailAdapter } from './email/consoleEmailAdapter.js';
import { fieldAffectsData } from './fields/config/types.js';
import localGlobalOperations from './globals/operations/local/index.js';
import { getJobsLocalAPI } from './queues/localAPI.js';
import { isNextBuild } from './utilities/isNextBuild.js';
import { getLogger } from './utilities/logger.js';
import { serverInit as serverInitTelemetry } from './utilities/telemetry/events/serverInit.js';
import { traverseFields } from './utilities/traverseFields.js';
export { default as executeAccess } from './auth/executeAccess.js';
export { executeAuthStrategies } from './auth/executeAuthStrategies.js';
export { extractAccessFromPermission } from './auth/extractAccessFromPermission.js';
export { getAccessResults } from './auth/getAccessResults.js';
export { getFieldsToSign } from './auth/getFieldsToSign.js';
export { getLoginOptions } from './auth/getLoginOptions.js';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
let checkedDependencies = false;
/**
 * @description Payload
 */ export class BasePayload {
    /**
   * @description Authorization and Authentication using headers and cookies to run auth user strategies
   * @returns permissions: Permissions
   * @returns user: User
   */ auth = async (options)=>{
        const { auth } = localOperations.auth;
        return auth(this, options);
    };
    authStrategies;
    blocks = {};
    collections = {};
    config;
    /**
   * @description Performs count operation
   * @param options
   * @returns count of documents satisfying query
   */ count = async (options)=>{
        const { count } = localOperations;
        return count(this, options);
    };
    /**
   * @description Performs countGlobalVersions operation
   * @param options
   * @returns count of global document versions satisfying query
   */ countGlobalVersions = async (options)=>{
        const { countGlobalVersions } = localGlobalOperations;
        return countGlobalVersions(this, options);
    };
    /**
   * @description Performs countVersions operation
   * @param options
   * @returns count of document versions satisfying query
   */ countVersions = async (options)=>{
        const { countVersions } = localOperations;
        return countVersions(this, options);
    };
    /**
   * @description Performs create operation
   * @param options
   * @returns created document
   */ create = async (options)=>{
        const { create } = localOperations;
        return create(this, options);
    };
    db;
    decrypt = decrypt;
    duplicate = async (options)=>{
        const { duplicate } = localOperations;
        return duplicate(this, options);
    };
    email;
    encrypt = encrypt;
    // TODO: re-implement or remove?
    // errorHandler: ErrorHandler
    extensions;
    /**
   * @description Find documents with criteria
   * @param options
   * @returns documents satisfying query
   */ find = async (options)=>{
        const { find } = localOperations;
        return find(this, options);
    };
    /**
   * @description Find document by ID
   * @param options
   * @returns document with specified ID
   */ findByID = async (options)=>{
        const { findByID } = localOperations;
        return findByID(this, options);
    };
    findGlobal = async (options)=>{
        const { findOne } = localGlobalOperations;
        return findOne(this, options);
    };
    /**
   * @description Find global version by ID
   * @param options
   * @returns global version with specified ID
   */ findGlobalVersionByID = async (options)=>{
        const { findVersionByID } = localGlobalOperations;
        return findVersionByID(this, options);
    };
    /**
   * @description Find global versions with criteria
   * @param options
   * @returns versions satisfying query
   */ findGlobalVersions = async (options)=>{
        const { findVersions } = localGlobalOperations;
        return findVersions(this, options);
    };
    /**
   * @description Find version by ID
   * @param options
   * @returns version with specified ID
   */ findVersionByID = async (options)=>{
        const { findVersionByID } = localOperations;
        return findVersionByID(this, options);
    };
    /**
   * @description Find versions with criteria
   * @param options
   * @returns versions satisfying query
   */ findVersions = async (options)=>{
        const { findVersions } = localOperations;
        return findVersions(this, options);
    };
    forgotPassword = async (options)=>{
        const { forgotPassword } = localOperations.auth;
        return forgotPassword(this, options);
    };
    getAdminURL = ()=>`${this.config.serverURL}${this.config.routes.admin}`;
    getAPIURL = ()=>`${this.config.serverURL}${this.config.routes.api}`;
    globals;
    importMap;
    jobs = getJobsLocalAPI(this);
    logger;
    login = async (options)=>{
        const { login } = localOperations.auth;
        return login(this, options);
    };
    resetPassword = async (options)=>{
        const { resetPassword } = localOperations.auth;
        return resetPassword(this, options);
    };
    /**
   * @description Restore global version by ID
   * @param options
   * @returns version with specified ID
   */ restoreGlobalVersion = async (options)=>{
        const { restoreVersion } = localGlobalOperations;
        return restoreVersion(this, options);
    };
    /**
   * @description Restore version by ID
   * @param options
   * @returns version with specified ID
   */ restoreVersion = async (options)=>{
        const { restoreVersion } = localOperations;
        return restoreVersion(this, options);
    };
    schema;
    secret;
    sendEmail;
    types;
    unlock = async (options)=>{
        const { unlock } = localOperations.auth;
        return unlock(this, options);
    };
    updateGlobal = async (options)=>{
        const { update } = localGlobalOperations;
        return update(this, options);
    };
    validationRules;
    verifyEmail = async (options)=>{
        const { verifyEmail } = localOperations.auth;
        return verifyEmail(this, options);
    };
    versions = {};
    async bin({ args, cwd, log }) {
        return new Promise((resolve, reject)=>{
            const spawned = spawn('node', [
                path.resolve(dirname, '../bin.js'),
                ...args
            ], {
                cwd,
                stdio: log || log === undefined ? 'inherit' : 'ignore'
            });
            spawned.on('exit', (code)=>{
                resolve({
                    code
                });
            });
            spawned.on('error', (error)=>{
                reject(error);
            });
        });
    }
    delete(options) {
        const { deleteLocal } = localOperations;
        return deleteLocal(this, options);
    }
    /**
   * @description Initializes Payload
   * @param options
   */ async init(options) {
        if (process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_DISABLE_DEPENDENCY_CHECKER !== 'true' && !checkedDependencies) {
            checkedDependencies = true;
            void checkPayloadDependencies();
        }
        this.importMap = options.importMap;
        if (!options?.config) {
            throw new Error('Error: the payload config is required to initialize payload.');
        }
        this.config = await options.config;
        this.logger = getLogger('payload', this.config.logger);
        if (!this.config.secret) {
            throw new Error('Error: missing secret key. A secret key is needed to secure Payload.');
        }
        this.secret = crypto.createHash('sha256').update(this.config.secret).digest('hex').slice(0, 32);
        this.globals = {
            config: this.config.globals
        };
        for (const collection of this.config.collections){
            let customIDType = undefined;
            const findCustomID = ({ field })=>{
                if ([
                    'array',
                    'blocks',
                    'group'
                ].includes(field.type) || field.type === 'tab' && 'name' in field) {
                    return true;
                }
                if (!fieldAffectsData(field)) {
                    return;
                }
                if (field.name === 'id') {
                    customIDType = field.type;
                    return true;
                }
            };
            traverseFields({
                callback: findCustomID,
                config: this.config,
                fields: collection.fields,
                parentIsLocalized: false
            });
            this.collections[collection.slug] = {
                config: collection,
                customIDType
            };
        }
        this.blocks = this.config.blocks.reduce((blocks, block)=>{
            blocks[block.slug] = block;
            return blocks;
        }, {});
        // Generate types on startup
        if (process.env.NODE_ENV !== 'production' && this.config.typescript.autoGenerate !== false) {
            // We cannot run it directly here, as generate-types imports json-schema-to-typescript, which breaks on turbopack.
            // see: https://github.com/vercel/next.js/issues/66723
            void this.bin({
                args: [
                    'generate:types'
                ],
                log: false
            });
        }
        this.db = this.config.db.init({
            payload: this
        });
        this.db.payload = this;
        if (this.db?.init) {
            await this.db.init();
        }
        if (!options.disableDBConnect && this.db.connect) {
            await this.db.connect();
        }
        // Load email adapter
        if (this.config.email instanceof Promise) {
            const awaitedAdapter = await this.config.email;
            this.email = awaitedAdapter({
                payload: this
            });
        } else if (this.config.email) {
            this.email = this.config.email({
                payload: this
            });
        } else {
            if (process.env.NEXT_PHASE !== 'phase-production-build') {
                this.logger.warn(`No email adapter provided. Email will be written to console. More info at https://payloadcms.com/docs/email/overview.`);
            }
            this.email = consoleEmailAdapter({
                payload: this
            });
        }
        // Warn if image resizing is enabled but sharp is not installed
        if (!this.config.sharp && this.config.collections.some((c)=>c.upload.imageSizes || c.upload.formatOptions)) {
            this.logger.warn(`Image resizing is enabled for one or more collections, but sharp not installed. Please install 'sharp' and pass into the config.`);
        }
        // Warn if user is deploying to Vercel, and any upload collection is missing a storage adapter
        if (process.env.VERCEL) {
            const uploadCollWithoutAdapter = this.config.collections.filter((c)=>c.upload && c.upload.adapter === undefined);
            if (uploadCollWithoutAdapter.length) {
                const slugs = uploadCollWithoutAdapter.map((c)=>c.slug).join(', ');
                this.logger.warn(`Collections with uploads enabled require a storage adapter when deploying to Vercel. Collection(s) without storage adapters: ${slugs}. See https://payloadcms.com/docs/upload/storage-adapters for more info.`);
            }
        }
        this.sendEmail = this.email['sendEmail'];
        serverInitTelemetry(this);
        // 1. loop over collections, if collection has auth strategy, initialize and push to array
        let jwtStrategyEnabled = false;
        this.authStrategies = this.config.collections.reduce((authStrategies, collection)=>{
            if (collection?.auth) {
                if (collection.auth.strategies.length > 0) {
                    authStrategies.push(...collection.auth.strategies);
                }
                // 2. if api key enabled, push api key strategy into the array
                if (collection.auth?.useAPIKey) {
                    authStrategies.push({
                        name: `${collection.slug}-api-key`,
                        authenticate: APIKeyAuthentication(collection)
                    });
                }
                // 3. if localStrategy flag is true
                if (!collection.auth.disableLocalStrategy && !jwtStrategyEnabled) {
                    jwtStrategyEnabled = true;
                }
            }
            return authStrategies;
        }, []);
        // 4. if enabled, push jwt strategy into authStrategies last
        if (jwtStrategyEnabled) {
            this.authStrategies.push({
                name: 'local-jwt',
                authenticate: JWTAuthentication
            });
        }
        try {
            if (!options.disableOnInit) {
                if (typeof options.onInit === 'function') {
                    await options.onInit(this);
                }
                if (typeof this.config.onInit === 'function') {
                    await this.config.onInit(this);
                }
            }
        } catch (error) {
            this.logger.error({
                err: error
            }, 'Error running onInit function');
            throw error;
        }
        if (this.config.jobs.autoRun && !isNextBuild()) {
            const DEFAULT_CRON = '* * * * *';
            const DEFAULT_LIMIT = 10;
            const cronJobs = typeof this.config.jobs.autoRun === 'function' ? await this.config.jobs.autoRun(this) : this.config.jobs.autoRun;
            await Promise.all(cronJobs.map((cronConfig)=>{
                const job = new Cron(cronConfig.cron ?? DEFAULT_CRON, async ()=>{
                    if (typeof this.config.jobs.shouldAutoRun === 'function') {
                        const shouldAutoRun = await this.config.jobs.shouldAutoRun(this);
                        if (!shouldAutoRun) {
                            job.stop();
                            return false;
                        }
                    }
                    await this.jobs.run({
                        limit: cronConfig.limit ?? DEFAULT_LIMIT,
                        queue: cronConfig.queue
                    });
                });
            }));
        }
        return this;
    }
    update(options) {
        const { update } = localOperations;
        return update(this, options);
    }
}
const initialized = new BasePayload();
export default initialized;
let cached = global._payload;
if (!cached) {
    cached = global._payload = {
        payload: null,
        promise: null,
        reload: false,
        ws: null
    };
}
export const reload = async (config, payload, skipImportMapGeneration)=>{
    if (typeof payload.db.destroy === 'function') {
        await payload.db.destroy();
    }
    payload.config = config;
    payload.collections = config.collections.reduce((collections, collection)=>{
        collections[collection.slug] = {
            config: collection,
            customIDType: payload.collections[collection.slug]?.customIDType
        };
        return collections;
    }, {});
    payload.blocks = config.blocks.reduce((blocks, block)=>{
        blocks[block.slug] = block;
        return blocks;
    }, {});
    payload.globals = {
        config: config.globals
    };
    // TODO: support HMR for other props in the future (see payload/src/index init()) that may change on Payload singleton
    // Generate types
    if (config.typescript.autoGenerate !== false) {
        // We cannot run it directly here, as generate-types imports json-schema-to-typescript, which breaks on turbopack.
        // see: https://github.com/vercel/next.js/issues/66723
        void payload.bin({
            args: [
                'generate:types'
            ],
            log: false
        });
    }
    // Generate component map
    if (skipImportMapGeneration !== true && config.admin?.importMap?.autoGenerate !== false) {
        await generateImportMap(config, {
            log: true
        });
    }
    await payload.db.init();
    if (payload.db.connect) {
        await payload.db.connect({
            hotReload: true
        });
    }
    global._payload_clientConfigs = {};
    global._payload_schemaMap = null;
    global._payload_clientSchemaMap = null;
    global._payload_doNotCacheClientConfig = true // This will help refreshing the client config cache more reliably. If you remove this, please test HMR + client config refreshing (do new fields appear in the document?)
    ;
    global._payload_doNotCacheSchemaMap = true;
    global._payload_doNotCacheClientSchemaMap = true;
};
export const getPayload = async (options)=>{
    if (!options?.config) {
        throw new Error('Error: the payload config is required for getPayload to work.');
    }
    if (cached.payload) {
        if (cached.reload === true) {
            let resolve;
            // getPayload is called multiple times, in parallel. However, we only want to run `await reload` once. By immediately setting cached.reload to a promise,
            // we can ensure that all subsequent calls will wait for the first reload to finish. So if we set it here, the 2nd call of getPayload
            // will reach `if (cached.reload instanceof Promise) {` which then waits for the first reload to finish.
            cached.reload = new Promise((res)=>resolve = res);
            const config = await options.config;
            await reload(config, cached.payload, !options.importMap);
            resolve();
        }
        if (cached.reload instanceof Promise) {
            await cached.reload;
        }
        if (options?.importMap) {
            cached.payload.importMap = options.importMap;
        }
        return cached.payload;
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!cached.promise) {
        // no need to await options.config here, as it's already awaited in the BasePayload.init
        cached.promise = new BasePayload().init(options);
    }
    try {
        cached.payload = await cached.promise;
        if (!cached.ws && process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && process.env.DISABLE_PAYLOAD_HMR !== 'true') {
            try {
                const port = process.env.PORT || '3000';
                const path = '/_next/webpack-hmr';
                // The __NEXT_ASSET_PREFIX env variable is set for both assetPrefix and basePath (tested in Next.js 15.1.6)
                const prefix = process.env.__NEXT_ASSET_PREFIX ?? '';
                cached.ws = new WebSocket(process.env.PAYLOAD_HMR_URL_OVERRIDE ?? `ws://localhost:${port}${prefix}${path}`);
                cached.ws.onmessage = (event)=>{
                    if (typeof event.data === 'string') {
                        const data = JSON.parse(event.data);
                        if ('action' in data && data.action === 'serverComponentChanges') {
                            cached.reload = true;
                        }
                    }
                };
                cached.ws.onerror = (_)=>{
                // swallow any websocket connection error
                };
            } catch (_) {
            // swallow e
            }
        }
    } catch (e) {
        cached.promise = null;
        // add identifier to error object, so that our error logger in routeError.ts does not attempt to re-initialize getPayload
        e.payloadInitError = true;
        throw e;
    }
    if (options?.importMap) {
        cached.payload.importMap = options.importMap;
    }
    return cached.payload;
};
export * from './auth/index.js';
export { jwtSign } from './auth/jwt.js';
export { accessOperation } from './auth/operations/access.js';
export { forgotPasswordOperation } from './auth/operations/forgotPassword.js';
export { initOperation } from './auth/operations/init.js';
export { checkLoginPermission } from './auth/operations/login.js';
export { loginOperation } from './auth/operations/login.js';
export { logoutOperation } from './auth/operations/logout.js';
export { meOperation } from './auth/operations/me.js';
export { refreshOperation } from './auth/operations/refresh.js';
export { registerFirstUserOperation } from './auth/operations/registerFirstUser.js';
export { resetPasswordOperation } from './auth/operations/resetPassword.js';
export { unlockOperation } from './auth/operations/unlock.js';
export { verifyEmailOperation } from './auth/operations/verifyEmail.js';
export { JWTAuthentication } from './auth/strategies/jwt.js';
export { incrementLoginAttempts } from './auth/strategies/local/incrementLoginAttempts.js';
export { resetLoginAttempts } from './auth/strategies/local/resetLoginAttempts.js';
export { generateImportMap } from './bin/generateImportMap/index.js';
export { genImportMapIterateFields } from './bin/generateImportMap/iterateFields.js';
export { createClientCollectionConfig, createClientCollectionConfigs } from './collections/config/client.js';
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
export { createClientConfig, serverOnlyAdminConfigProperties, serverOnlyConfigProperties } from './config/client.js';
export { defaults } from './config/defaults.js';
export { sanitizeConfig } from './config/sanitize.js';
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
export { validateQueryPaths } from './database/queryValidation/validateQueryPaths.js';
export { validateSearchParam } from './database/queryValidation/validateSearchParams.js';
export { APIError, APIErrorName, AuthenticationError, DuplicateCollection, DuplicateFieldName, DuplicateGlobal, ErrorDeletingFile, FileRetrievalError, FileUploadError, Forbidden, InvalidConfiguration, InvalidFieldName, InvalidFieldRelationship, Locked, LockedAuth, MissingCollectionLabel, MissingEditorProp, MissingFieldInputOptions, MissingFieldType, MissingFile, NotFound, QueryError, UnverifiedEmail, ValidationError, ValidationErrorName } from './errors/index.js';
export { baseBlockFields } from './fields/baseFields/baseBlockFields.js';
export { baseIDField } from './fields/baseFields/baseIDField.js';
export { createClientField, createClientFields } from './fields/config/client.js';
export { sanitizeFields } from './fields/config/sanitize.js';
export { getDefaultValue } from './fields/getDefaultValue.js';
export { traverseFields as afterChangeTraverseFields } from './fields/hooks/afterChange/traverseFields.js';
export { promise as afterReadPromise } from './fields/hooks/afterRead/promise.js';
export { traverseFields as afterReadTraverseFields } from './fields/hooks/afterRead/traverseFields.js';
export { traverseFields as beforeChangeTraverseFields } from './fields/hooks/beforeChange/traverseFields.js';
export { traverseFields as beforeValidateTraverseFields } from './fields/hooks/beforeValidate/traverseFields.js';
export { default as sortableFieldTypes } from './fields/sortableFieldTypes.js';
export { validations } from './fields/validations.js';
export { createClientGlobalConfig, createClientGlobalConfigs } from './globals/config/client.js';
export { docAccessOperation as docAccessOperationGlobal } from './globals/operations/docAccess.js';
export { findOneOperation } from './globals/operations/findOne.js';
export { findVersionByIDOperation as findVersionByIDOperationGlobal } from './globals/operations/findVersionByID.js';
export { findVersionsOperation as findVersionsOperationGlobal } from './globals/operations/findVersions.js';
export { restoreVersionOperation as restoreVersionOperationGlobal } from './globals/operations/restoreVersion.js';
export { updateOperation as updateOperationGlobal } from './globals/operations/update.js';
export { jobAfterRead } from './queues/config/index.js';
export { importHandlerPath } from './queues/operations/runJobs/runJob/importHandlerPath.js';
export { getLocalI18n } from './translations/getLocalI18n.js';
export * from './types/index.js';
export { getFileByPath } from './uploads/getFileByPath.js';
export { addDataAndFileToRequest } from './utilities/addDataAndFileToRequest.js';
export { addLocalesToRequestFromData, sanitizeLocales } from './utilities/addLocalesToRequest.js';
export { commitTransaction } from './utilities/commitTransaction.js';
export { configToJSONSchema, entityToJSONSchema, fieldsToJSONSchema, withNullableJSONSchemaType } from './utilities/configToJSONSchema.js';
export { createArrayFromCommaDelineated } from './utilities/createArrayFromCommaDelineated.js';
export { createLocalReq } from './utilities/createLocalReq.js';
export { createPayloadRequest } from './utilities/createPayloadRequest.js';
export { deepCopyObject, deepCopyObjectComplex, deepCopyObjectSimple } from './utilities/deepCopyObject.js';
export { deepMerge, deepMergeWithCombinedArrays, deepMergeWithReactComponents, deepMergeWithSourceArrays } from './utilities/deepMerge.js';
export { checkDependencies } from './utilities/dependencies/dependencyChecker.js';
export { getDependencies } from './utilities/dependencies/getDependencies.js';
export { findUp, findUpSync, pathExistsAndIsAccessible, pathExistsAndIsAccessibleSync } from './utilities/findUp.js';
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
export { deepMergeSimple } from '@payloadcms/translations/utilities';

//# sourceMappingURL=index.js.map