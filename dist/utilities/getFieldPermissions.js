// @ts-strict-ignore
/**
 * Gets read and operation-level permissions for a given field based on cascading field permissions.
 * @returns An object with the following properties:
 * - `operation`: Whether the user has permission to perform the operation on the field (`create` or `update`).
 * - `permissions`: The field-level permissions.
 * - `read`: Whether the user has permission to read the field.
 */ export const getFieldPermissions = ({ field, operation, parentName, permissions })=>({
        operation: permissions === true || permissions?.[operation] === true || permissions?.[parentName] === true || 'name' in field && typeof permissions === 'object' && permissions?.[field.name] && (permissions[field.name] === true || operation in permissions[field.name] && permissions[field.name][operation]),
        permissions: permissions === undefined || permissions === null || permissions === true ? true : 'name' in field ? permissions?.[field.name] : permissions,
        read: permissions === true || permissions?.read === true || permissions?.[parentName] === true || 'name' in field && typeof permissions === 'object' && permissions?.[field.name] && (permissions[field.name] === true || 'read' in permissions[field.name] && permissions[field.name].read)
    });

//# sourceMappingURL=getFieldPermissions.js.map