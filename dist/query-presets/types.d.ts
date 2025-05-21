import type { Field } from '../fields/config/types.js';
import type { Access, CollectionSlug } from '../index.js';
import type { ListPreferences } from '../preferences/types.js';
import type { Where } from '../types/index.js';
export declare const operations: readonly ["read", "update", "delete"];
type Operation = (typeof operations)[number];
export type QueryPreset = {
    access: {
        [operation in Operation]: {
            constraint: 'everyone' | 'onlyMe' | 'specificUsers';
            users?: string[];
        };
    };
    columns: ListPreferences['columns'];
    id: number | string;
    isShared: boolean;
    relatedCollection: CollectionSlug;
    title: string;
    where: Where;
};
export type QueryPresetConstraint = {
    access: Access<QueryPreset>;
    fields?: Field[];
    label: string;
    value: string;
};
export type QueryPresetConstraints = QueryPresetConstraint[];
export {};
//# sourceMappingURL=types.d.ts.map