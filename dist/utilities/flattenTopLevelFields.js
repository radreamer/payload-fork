// @ts-strict-ignore
import { fieldAffectsData, fieldHasSubFields, fieldIsPresentationalOnly, tabHasName } from '../fields/config/types.js';
/**
 * Flattens a collection's fields into a single array of fields, as long
 * as the fields do not affect data.
 *
 * @param fields
 * @param keepPresentationalFields if true, will skip flattening fields that are presentational only
 */ function flattenFields(fields, keepPresentationalFields) {
    return fields.reduce((acc, field)=>{
        if (fieldAffectsData(field) || keepPresentationalFields && fieldIsPresentationalOnly(field)) {
            acc.push(field);
        } else if (fieldHasSubFields(field)) {
            acc.push(...flattenFields(field.fields, keepPresentationalFields));
        } else if (field.type === 'tabs' && 'tabs' in field) {
            return [
                ...acc,
                ...field.tabs.reduce((tabFields, tab)=>{
                    if (tabHasName(tab)) {
                        return [
                            ...tabFields,
                            {
                                ...tab,
                                type: 'tab'
                            }
                        ];
                    } else {
                        return [
                            ...tabFields,
                            ...flattenFields(tab.fields, keepPresentationalFields)
                        ];
                    }
                }, [])
            ];
        }
        return acc;
    }, []);
}
export default flattenFields;

//# sourceMappingURL=flattenTopLevelFields.js.map