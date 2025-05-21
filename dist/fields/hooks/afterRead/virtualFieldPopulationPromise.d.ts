import type { PayloadRequest } from '../../../types/index.js';
import type { FlattenedField } from '../../config/types.js';
export declare const virtualFieldPopulationPromise: ({ name, draft, fallbackLocale, fields, locale, overrideAccess, ref, req, segments, showHiddenFields, siblingDoc, }: {
    draft: boolean;
    fallbackLocale: string;
    fields: FlattenedField[];
    locale: string;
    name: string;
    overrideAccess: boolean;
    ref: any;
    req: PayloadRequest;
    segments: string[];
    showHiddenFields: boolean;
    siblingDoc: Record<string, unknown>;
}) => Promise<void>;
//# sourceMappingURL=virtualFieldPopulationPromise.d.ts.map