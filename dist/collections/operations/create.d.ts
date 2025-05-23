import type { PayloadRequest, PopulateType, SelectType, TransformCollectionWithSelect } from '../../types/index.js';
import type { Collection, DataFromCollectionSlug, RequiredDataFromCollectionSlug, SelectFromCollectionSlug } from '../config/types.js';
import { type CollectionSlug } from '../../index.js';
export type Arguments<TSlug extends CollectionSlug> = {
    autosave?: boolean;
    collection: Collection;
    data: RequiredDataFromCollectionSlug<TSlug>;
    depth?: number;
    disableTransaction?: boolean;
    disableVerificationEmail?: boolean;
    draft?: boolean;
    duplicateFromID?: DataFromCollectionSlug<TSlug>['id'];
    overrideAccess?: boolean;
    overwriteExistingFiles?: boolean;
    populate?: PopulateType;
    req: PayloadRequest;
    select?: SelectType;
    showHiddenFields?: boolean;
};
export declare const createOperation: <TSlug extends CollectionSlug, TSelect extends SelectFromCollectionSlug<TSlug>>(incomingArgs: Arguments<TSlug>) => Promise<TransformCollectionWithSelect<TSlug, TSelect>>;
//# sourceMappingURL=create.d.ts.map