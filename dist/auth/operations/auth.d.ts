import type { SanitizedPermissions, TypedUser } from '../../index.js';
import type { PayloadRequest } from '../../types/index.js';
export type AuthArgs = {
    headers: Request['headers'];
    req?: Omit<PayloadRequest, 'user'>;
};
export type AuthResult = {
    permissions: SanitizedPermissions;
    responseHeaders?: Headers;
    user: null | TypedUser;
};
export declare const auth: (args: Required<AuthArgs>) => Promise<AuthResult>;
//# sourceMappingURL=auth.d.ts.map