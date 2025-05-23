import type { SanitizedConfig } from '../config/types.js';
import type { PayloadRequest } from '../types/index.js';
/**
 * Mutates the Request to contain 'locale' and 'fallbackLocale' based on data or searchParams
 */
export declare function addLocalesToRequestFromData(req: PayloadRequest): void;
type SanitizeLocalesArgs = {
    fallbackLocale: string;
    locale: string;
    localization: SanitizedConfig['localization'];
};
type SanitizeLocalesReturn = {
    fallbackLocale?: string;
    locale?: string;
};
export declare const sanitizeLocales: ({ fallbackLocale, locale, localization, }: SanitizeLocalesArgs) => SanitizeLocalesReturn;
export {};
//# sourceMappingURL=addLocalesToRequest.d.ts.map