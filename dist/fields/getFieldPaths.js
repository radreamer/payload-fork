// @ts-strict-ignore
export function getFieldPaths({ field, index, parentIndexPath, parentPath, parentSchemaPath }) {
    if ('name' in field) {
        return {
            indexPath: `${parentIndexPath ? parentIndexPath + '-' : ''}${index}`,
            path: `${parentPath ? parentPath + '.' : ''}${field.name}`,
            schemaPath: `${parentSchemaPath ? parentSchemaPath + '.' : ''}${field.name}`
        };
    }
    const indexSuffix = `_index-${`${parentIndexPath ? parentIndexPath + '-' : ''}${index}`}`;
    return {
        indexPath: `${parentIndexPath ? parentIndexPath + '-' : ''}${index}`,
        path: `${parentPath ? parentPath + '.' : ''}${indexSuffix}`,
        schemaPath: `${parentSchemaPath ? parentSchemaPath + '.' : ''}${indexSuffix}`
    };
}
export function getFieldPathsModified({ field, index, parentIndexPath, parentPath, parentSchemaPath }) {
    const parentPathSegments = parentPath.split('.');
    const parentIsUnnamed = parentPathSegments[parentPathSegments.length - 1].startsWith('_index-');
    const parentWithoutIndex = parentIsUnnamed ? parentPathSegments.slice(0, -1).join('.') : parentPath;
    const parentPathToUse = parentIsUnnamed ? parentWithoutIndex : parentPath;
    if ('name' in field) {
        return {
            indexPath: '',
            path: `${parentPathToUse ? parentPathToUse + '.' : ''}${field.name}`,
            schemaPath: `${parentSchemaPath ? parentSchemaPath + '.' : ''}${field.name}`
        };
    }
    const indexSuffix = `_index-${`${parentIndexPath ? parentIndexPath + '-' : ''}${index}`}`;
    return {
        indexPath: `${parentIndexPath ? parentIndexPath + '-' : ''}${index}`,
        path: `${parentPathToUse ? parentPathToUse + '.' : ''}${indexSuffix}`,
        schemaPath: `${!parentIsUnnamed && parentSchemaPath ? parentSchemaPath + '.' : ''}${indexSuffix}`
    };
}

//# sourceMappingURL=getFieldPaths.js.map