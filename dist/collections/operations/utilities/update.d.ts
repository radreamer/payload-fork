import type { DeepPartial } from 'ts-essentials';
import type { Payload, PayloadRequest, PopulateType, SelectType, TransformCollectionWithSelect } from '../../../types/index.js';
import type { DataFromCollectionSlug, SanitizedCollectionConfig, SelectFromCollectionSlug } from '../../config/types.js';
import { type AccessResult, type CollectionSlug, type FileToSave, type SanitizedConfig } from '../../../index.js';
export type SharedUpdateDocumentArgs<TSlug extends CollectionSlug> = {
    accessResults: AccessResult;
    autosave: boolean;
    collectionConfig: SanitizedCollectionConfig;
    config: SanitizedConfig;
    data: DeepPartial<DataFromCollectionSlug<TSlug>>;
    depth: number;
    docWithLocales: any;
    draftArg: boolean;
    fallbackLocale: string;
    filesToUpload: FileToSave[];
    id: number | string;
    locale: string;
    overrideAccess: boolean;
    overrideLock: boolean;
    payload: Payload;
    populate?: PopulateType;
    publishSpecificLocale?: string;
    req: PayloadRequest;
    select: SelectType;
    showHiddenFields: boolean;
};
/**
 * This function is used to update a document in the DB and return the result.
 *
 * It runs the following hooks in order:
 * - beforeValidate - Fields
 * - beforeValidate - Collection
 * - beforeChange - Collection
 * - beforeChange - Fields
 * - afterRead - Fields
 * - afterRead - Collection
 * - afterChange - Fields
 * - afterChange - Collection
 */
export declare const updateDocument: <TSlug extends CollectionSlug, TSelect extends SelectFromCollectionSlug<TSlug> = SelectType>({ id, accessResults, autosave, collectionConfig, config, data, depth, docWithLocales, draftArg, fallbackLocale, filesToUpload, locale, overrideAccess, overrideLock, payload, populate, publishSpecificLocale, req, select, showHiddenFields, }: SharedUpdateDocumentArgs<TSlug>) => Promise<TransformCollectionWithSelect<TSlug, TSelect>>;
//# sourceMappingURL=update.d.ts.map