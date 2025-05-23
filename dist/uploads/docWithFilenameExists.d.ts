import type { PayloadRequest } from '../types/index.js';
type Args = {
    collectionSlug: string;
    filename: string;
    path: string;
    req: PayloadRequest;
};
declare const docWithFilenameExists: ({ collectionSlug, filename, req }: Args) => Promise<boolean>;
export default docWithFilenameExists;
//# sourceMappingURL=docWithFilenameExists.d.ts.map