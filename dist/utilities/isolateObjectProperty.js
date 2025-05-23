/* eslint-disable no-restricted-exports */ /**
 * Creates a proxy for the given object that has its own property
 */ export default function isolateObjectProperty(object, key) {
    const keys = Array.isArray(key) ? key : [
        key
    ];
    const delegate = {};
    // Initialize delegate with the keys, if they exist in the original object
    for (const k of keys){
        if (k in object) {
            delegate[k] = object[k];
        }
    }
    const handler = {
        deleteProperty (target, p) {
            return Reflect.deleteProperty(keys.includes(p) ? delegate : target, p);
        },
        get (target, p, receiver) {
            return Reflect.get(keys.includes(p) ? delegate : target, p, receiver);
        },
        has (target, p) {
            return Reflect.has(keys.includes(p) ? delegate : target, p);
        },
        set (target, p, newValue, receiver) {
            if (keys.includes(p)) {
                // in case of transactionID we must ignore any receiver, because
                // "If provided and target does not have a setter for propertyKey, the property will be set on receiver instead."
                return Reflect.set(delegate, p, newValue);
            } else {
                return Reflect.set(target, p, newValue, receiver);
            }
        }
    };
    return new Proxy(object, handler);
}

//# sourceMappingURL=isolateObjectProperty.js.map