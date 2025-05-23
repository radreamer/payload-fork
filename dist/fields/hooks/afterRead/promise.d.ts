import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js';
import type { JsonObject, PayloadRequest, PopulateType, SelectMode, SelectType } from '../../../types/index.js';
import type { Field, TabAsField } from '../../config/types.js';
import { type RequestContext } from '../../../index.js';
type Args = {
    /**
     * Data of the nearest parent block. If no parent block exists, this will be the `undefined`
     */
    blockData?: JsonObject;
    collection: null | SanitizedCollectionConfig;
    context: RequestContext;
    currentDepth: number;
    depth: number;
    doc: JsonObject;
    draft: boolean;
    fallbackLocale: null | string;
    field: Field | TabAsField;
    fieldIndex: number;
    /**
     * fieldPromises are used for things like field hooks. They should be awaited before awaiting populationPromises
     */
    fieldPromises: Promise<void>[];
    findMany: boolean;
    flattenLocales: boolean;
    global: null | SanitizedGlobalConfig;
    locale: null | string;
    overrideAccess: boolean;
    parentIndexPath: string;
    /**
     * @todo make required in v4.0
     */
    parentIsLocalized?: boolean;
    parentPath: string;
    parentSchemaPath: string;
    populate?: PopulateType;
    populationPromises: Promise<void>[];
    req: PayloadRequest;
    select?: SelectType;
    selectMode?: SelectMode;
    showHiddenFields: boolean;
    siblingDoc: JsonObject;
    siblingFields?: (Field | TabAsField)[];
    triggerAccessControl?: boolean;
    triggerHooks?: boolean;
};
export declare const promise: ({ blockData, collection, context, currentDepth, depth, doc, draft, fallbackLocale, field, fieldIndex, fieldPromises, findMany, flattenLocales, global, locale, overrideAccess, parentIndexPath, parentIsLocalized, parentPath, parentSchemaPath, populate, populationPromises, req, select, selectMode, showHiddenFields, siblingDoc, siblingFields, triggerAccessControl, triggerHooks, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=promise.d.ts.map