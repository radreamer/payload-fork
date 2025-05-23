// @ts-strict-ignore
import executeAccess from '../../auth/executeAccess.js';
import { combineQueries } from '../../database/combineQueries.js';
import { validateQueryPaths } from '../../database/queryValidation/validateQueryPaths.js';
import { buildVersionGlobalFields } from '../../index.js';
import { killTransaction } from '../../utilities/killTransaction.js';
export const countGlobalVersionsOperation = async (args)=>{
    try {
        const { disableErrors, global, overrideAccess, req: { payload }, req, where } = args;
        // /////////////////////////////////////
        // Access
        // /////////////////////////////////////
        let accessResult;
        if (!overrideAccess) {
            accessResult = await executeAccess({
                disableErrors,
                req
            }, global.access.readVersions);
            // If errors are disabled, and access returns false, return empty results
            if (accessResult === false) {
                return {
                    totalDocs: 0
                };
            }
        }
        const fullWhere = combineQueries(where, accessResult);
        const versionFields = buildVersionGlobalFields(payload.config, global, true);
        await validateQueryPaths({
            globalConfig: global,
            overrideAccess,
            req,
            versionFields,
            where
        });
        const result = await payload.db.countGlobalVersions({
            global: global.slug,
            req,
            where: fullWhere
        });
        // /////////////////////////////////////
        // Return results
        // /////////////////////////////////////
        return result;
    } catch (error) {
        await killTransaction(args.req);
        throw error;
    }
};

//# sourceMappingURL=countGlobalVersions.js.map