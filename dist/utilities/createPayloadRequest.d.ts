import type { SanitizedConfig } from '../config/types.js';
import type { PayloadRequest } from '../types/index.js';
type Args = {
    config: Promise<SanitizedConfig> | SanitizedConfig;
    params?: {
        collection: string;
    };
    request: Request;
};
export declare const createPayloadRequest: ({ config: configPromise, params, request, }: Args) => Promise<PayloadRequest>;
export {};
//# sourceMappingURL=createPayloadRequest.d.ts.map