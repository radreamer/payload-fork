import type { ClientField } from '../fields/config/client.js';
import type { Field, FieldAffectingData, FieldAffectingDataClient, FieldPresentationalOnly, FieldPresentationalOnlyClient } from '../fields/config/types.js';
type FlattenedField<TField> = TField extends ClientField ? FieldAffectingDataClient | FieldPresentationalOnlyClient : FieldAffectingData | FieldPresentationalOnly;
/**
 * Flattens a collection's fields into a single array of fields, as long
 * as the fields do not affect data.
 *
 * @param fields
 * @param keepPresentationalFields if true, will skip flattening fields that are presentational only
 */
declare function flattenFields<TField extends ClientField | Field>(fields: TField[], keepPresentationalFields?: boolean): FlattenedField<TField>[];
export default flattenFields;
//# sourceMappingURL=flattenTopLevelFields.d.ts.map