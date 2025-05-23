import { status as httpStatus } from 'http-status';
import { getRequestCollectionWithID } from '../../utilities/getRequestEntity.js';
import { headersWithCors } from '../../utilities/headersWithCors.js';
import { docAccessOperation } from '../operations/docAccess.js';
export const docAccessHandler = async (req)=>{
    const { id, collection } = getRequestCollectionWithID(req, {
        optionalID: true
    });
    const result = await docAccessOperation({
        id,
        collection,
        req
    });
    return Response.json(result, {
        headers: headersWithCors({
            headers: new Headers(),
            req
        }),
        status: httpStatus.OK
    });
};

//# sourceMappingURL=docAccess.js.map