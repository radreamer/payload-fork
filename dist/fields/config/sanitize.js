// @ts-strict-ignore
import { deepMergeSimple } from '@payloadcms/translations/utilities';
import { v4 as uuid } from 'uuid';
import { DuplicateFieldName, InvalidFieldName, InvalidFieldRelationship, MissingEditorProp, MissingFieldType } from '../../errors/index.js';
import { ReservedFieldName } from '../../errors/ReservedFieldName.js';
import { formatLabels, toWords } from '../../utilities/formatLabels.js';
import { baseBlockFields } from '../baseFields/baseBlockFields.js';
import { baseIDField } from '../baseFields/baseIDField.js';
import { baseTimezoneField } from '../baseFields/timezone/baseField.js';
import { defaultTimezones } from '../baseFields/timezone/defaultTimezones.js';
import { setDefaultBeforeDuplicate } from '../setDefaultBeforeDuplicate.js';
import { validations } from '../validations.js';
import { reservedAPIKeyFieldNames, reservedBaseAuthFieldNames, reservedBaseUploadFieldNames, reservedVerifyFieldNames } from './reservedFieldNames.js';
import { sanitizeJoinField } from './sanitizeJoinField.js';
import { fieldAffectsData as _fieldAffectsData, fieldIsLocalized, tabHasName } from './types.js';
export const sanitizeFields = async ({ collectionConfig, config, existingFieldNames = new Set(), fields, isTopLevelField = true, joinPath = '', joins, parentIsLocalized, polymorphicJoins, requireFieldLevelRichTextEditor = false, richTextSanitizationPromises, validRelationships })=>{
    if (!fields) {
        return [];
    }
    for(let i = 0; i < fields.length; i++){
        const field = fields[i];
        if ('_sanitized' in field && field._sanitized === true) {
            continue;
        }
        if ('_sanitized' in field) {
            field._sanitized = true;
        }
        if (!field.type) {
            throw new MissingFieldType(field);
        }
        const fieldAffectsData = _fieldAffectsData(field);
        if (isTopLevelField && fieldAffectsData && field.name) {
            if (collectionConfig && collectionConfig.upload) {
                if (reservedBaseUploadFieldNames.includes(field.name)) {
                    throw new ReservedFieldName(field, field.name);
                }
            }
            if (collectionConfig && collectionConfig.auth && typeof collectionConfig.auth === 'object' && !collectionConfig.auth.disableLocalStrategy) {
                if (reservedBaseAuthFieldNames.includes(field.name)) {
                    throw new ReservedFieldName(field, field.name);
                }
                if (collectionConfig.auth.verify) {
                    if (reservedAPIKeyFieldNames.includes(field.name)) {
                        throw new ReservedFieldName(field, field.name);
                    }
                    if (reservedVerifyFieldNames.includes(field.name)) {
                        throw new ReservedFieldName(field, field.name);
                    }
                }
            }
        }
        // assert that field names do not contain forbidden characters
        if (fieldAffectsData && field.name.includes('.')) {
            throw new InvalidFieldName(field, field.name);
        }
        // Auto-label
        if ('name' in field && field.name && typeof field.label !== 'object' && typeof field.label !== 'string' && typeof field.label !== 'function' && field.label !== false) {
            field.label = toWords(field.name);
        }
        if (field.type === 'checkbox' && typeof field.defaultValue === 'undefined' && field.required === true) {
            field.defaultValue = false;
        }
        if (field.type === 'join') {
            sanitizeJoinField({
                config,
                field,
                joinPath,
                joins,
                parentIsLocalized,
                polymorphicJoins
            });
        }
        if (field.type === 'relationship' || field.type === 'upload') {
            if (validRelationships) {
                const relationships = Array.isArray(field.relationTo) ? field.relationTo : [
                    field.relationTo
                ];
                relationships.forEach((relationship)=>{
                    if (!validRelationships.includes(relationship)) {
                        throw new InvalidFieldRelationship(field, relationship);
                    }
                });
            }
            if (field.min && !field.minRows) {
                console.warn(`(payload): The "min" property is deprecated for the Relationship field "${field.name}" and will be removed in a future version. Please use "minRows" instead.`);
                field.minRows = field.min;
            }
            if (field.max && !field.maxRows) {
                console.warn(`(payload): The "max" property is deprecated for the Relationship field "${field.name}" and will be removed in a future version. Please use "maxRows" instead.`);
                field.maxRows = field.max;
            }
        }
        if (field.type === 'upload') {
            if (!field.admin || !('isSortable' in field.admin)) {
                field.admin = {
                    isSortable: true,
                    ...field.admin
                };
            }
        }
        if (field.type === 'array' && field.fields) {
            field.fields.push(baseIDField);
        }
        if ((field.type === 'blocks' || field.type === 'array') && field.label) {
            field.labels = field.labels || formatLabels(field.name);
        }
        if (fieldAffectsData) {
            if (existingFieldNames.has(field.name)) {
                throw new DuplicateFieldName(field.name);
            } else if (![
                'blockName',
                'id'
            ].includes(field.name)) {
                existingFieldNames.add(field.name);
            }
            if (typeof field.localized !== 'undefined') {
                let shouldDisableLocalized = !config.localization;
                if (process.env.NEXT_PUBLIC_PAYLOAD_COMPATIBILITY_allowLocalizedWithinLocalized !== 'true' && parentIsLocalized && // @todo PAYLOAD_DO_NOT_SANITIZE_LOCALIZED_PROPERTY=true will be the default in 4.0
                process.env.PAYLOAD_DO_NOT_SANITIZE_LOCALIZED_PROPERTY !== 'true') {
                    shouldDisableLocalized = true;
                }
                if (shouldDisableLocalized) {
                    delete field.localized;
                }
            }
            if (typeof field.validate === 'undefined') {
                const defaultValidate = validations[field.type];
                if (defaultValidate) {
                    field.validate = (val, options)=>defaultValidate(val, {
                            ...field,
                            ...options
                        });
                } else {
                    field.validate = ()=>true;
                }
            }
            if (!field.hooks) {
                field.hooks = {};
            }
            if (!field.access) {
                field.access = {};
            }
            setDefaultBeforeDuplicate(field, parentIsLocalized);
        }
        if (!field.admin) {
            field.admin = {};
        }
        // Make sure that the richText field has an editor
        if (field.type === 'richText') {
            const sanitizeRichText = async (_config)=>{
                if (!field.editor) {
                    if (_config.editor && !requireFieldLevelRichTextEditor) {
                        // config.editor should be sanitized at this point
                        field.editor = _config.editor;
                    } else {
                        throw new MissingEditorProp(field) // while we allow disabling editor functionality, you should not have any richText fields defined if you do not have an editor
                        ;
                    }
                }
                if (typeof field.editor === 'function') {
                    field.editor = await field.editor({
                        config: _config,
                        isRoot: requireFieldLevelRichTextEditor,
                        parentIsLocalized: parentIsLocalized || field.localized
                    });
                }
                if (field.editor.i18n && Object.keys(field.editor.i18n).length >= 0) {
                    config.i18n.translations = deepMergeSimple(config.i18n.translations, field.editor.i18n);
                }
            };
            if (richTextSanitizationPromises) {
                richTextSanitizationPromises.push(sanitizeRichText);
            } else {
                await sanitizeRichText(config);
            }
        }
        if (field.type === 'blocks' && field.blocks) {
            if (field.blockReferences && field.blocks?.length) {
                throw new Error('You cannot have both blockReferences and blocks in the same blocks field');
            }
            for (const block of field.blockReferences ?? field.blocks){
                if (typeof block === 'string') {
                    continue;
                }
                if (block._sanitized === true) {
                    continue;
                }
                block._sanitized = true;
                block.fields = block.fields.concat(baseBlockFields);
                block.labels = !block.labels ? formatLabels(block.slug) : block.labels;
                block.fields = await sanitizeFields({
                    collectionConfig,
                    config,
                    existingFieldNames: new Set(),
                    fields: block.fields,
                    isTopLevelField: false,
                    parentIsLocalized: parentIsLocalized || field.localized,
                    requireFieldLevelRichTextEditor,
                    richTextSanitizationPromises,
                    validRelationships
                });
            }
        }
        if ('fields' in field && field.fields) {
            field.fields = await sanitizeFields({
                collectionConfig,
                config,
                existingFieldNames: fieldAffectsData ? new Set() : existingFieldNames,
                fields: field.fields,
                isTopLevelField: isTopLevelField && !fieldAffectsData,
                joinPath: fieldAffectsData ? `${joinPath ? joinPath + '.' : ''}${field.name}` : joinPath,
                joins,
                parentIsLocalized: parentIsLocalized || fieldIsLocalized(field),
                polymorphicJoins,
                requireFieldLevelRichTextEditor,
                richTextSanitizationPromises,
                validRelationships
            });
        }
        if (field.type === 'tabs') {
            for(let j = 0; j < field.tabs.length; j++){
                const tab = field.tabs[j];
                const isNamedTab = tabHasName(tab);
                if (isNamedTab && typeof tab.label === 'undefined') {
                    tab.label = toWords(tab.name);
                }
                if ('admin' in tab && tab.admin?.condition && typeof tab.admin.condition === 'function' && !tab.id) {
                    // Always attach a UUID to tabs with a condition so there's no conflicts even if there are duplicate nested names
                    tab.id = isNamedTab ? `${tab.name}_${uuid()}` : uuid();
                }
                tab.fields = await sanitizeFields({
                    collectionConfig,
                    config,
                    existingFieldNames: isNamedTab ? new Set() : existingFieldNames,
                    fields: tab.fields,
                    isTopLevelField: isTopLevelField && !isNamedTab,
                    joinPath: isNamedTab ? `${joinPath ? joinPath + '.' : ''}${tab.name}` : joinPath,
                    joins,
                    parentIsLocalized: parentIsLocalized || isNamedTab && tab.localized,
                    polymorphicJoins,
                    requireFieldLevelRichTextEditor,
                    richTextSanitizationPromises,
                    validRelationships
                });
                field.tabs[j] = tab;
            }
        }
        if (field.type === 'ui' && typeof field.admin.disableBulkEdit === 'undefined') {
            field.admin.disableBulkEdit = true;
        }
        fields[i] = field;
        // Insert our field after assignment
        if (field.type === 'date' && field.timezone) {
            const name = field.name + '_tz';
            const defaultTimezone = config.admin.timezones.defaultTimezone;
            const supportedTimezones = config.admin.timezones.supportedTimezones;
            const options = typeof supportedTimezones === 'function' ? supportedTimezones({
                defaultTimezones
            }) : supportedTimezones;
            // Need to set the options here manually so that any database enums are generated correctly
            // The UI component will import the options from the config
            const timezoneField = baseTimezoneField({
                name,
                defaultValue: defaultTimezone,
                options,
                required: field.required
            });
            fields.splice(++i, 0, timezoneField);
        }
    }
    return fields;
};

//# sourceMappingURL=sanitize.js.map