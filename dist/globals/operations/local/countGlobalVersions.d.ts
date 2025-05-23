import type { GlobalSlug, Payload, RequestContext, TypedLocale } from '../../../index.js';
import type { Document, PayloadRequest, Where } from '../../../types/index.js';
export type CountGlobalVersionsOptions<TSlug extends GlobalSlug> = {
    /**
     * [Context](https://payloadcms.com/docs/hooks/context), which will then be passed to `context` and `req.context`,
     * which can be read by hooks. Useful if you want to pass additional information to the hooks which
     * shouldn't be necessarily part of the document, for example a `triggerBeforeChange` option which can be read by the BeforeChange hook
     * to determine if it should run or not.
     */
    context?: RequestContext;
    /**
     * [Control auto-population](https://payloadcms.com/docs/queries/depth) of nested relationship and upload fields.
     */
    depth?: number;
    /**
     * When set to `true`, errors will not be thrown.
     */
    disableErrors?: boolean;
    /**
     * the Global slug to operate against.
     */
    global: TSlug;
    /**
     * Specify [locale](https://payloadcms.com/docs/configuration/localization) for any returned documents.
     */
    locale?: TypedLocale;
    /**
     * Skip access control.
     * Set to `false` if you want to respect Access Control for the operation, for example when fetching data for the fron-end.
     * @default true
     */
    overrideAccess?: boolean;
    /**
     * The `PayloadRequest` object. You can pass it to thread the current [transaction](https://payloadcms.com/docs/database/transactions), user and locale to the operation.
     * Recommended to pass when using the Local API from hooks, as usually you want to execute the operation within the current transaction.
     */
    req?: Partial<PayloadRequest>;
    /**
     * If you set `overrideAccess` to `false`, you can pass a user to use against the access control checks.
     */
    user?: Document;
    /**
     * A filter [query](https://payloadcms.com/docs/queries/overview)
     */
    where?: Where;
};
export default function countGlobalVersionsLocal<TSlug extends GlobalSlug>(payload: Payload, options: CountGlobalVersionsOptions<TSlug>): Promise<{
    totalDocs: number;
}>;
//# sourceMappingURL=countGlobalVersions.d.ts.map