// @ts-strict-ignore
export const generateCookie = (args)=>{
    const { name, domain, expires, httpOnly, maxAge, path, returnCookieAsObject, sameSite, secure: secureArg, value } = args;
    let cookieString = `${name}=${value || ''}`;
    const cookieObject = {
        name,
        value
    };
    const secure = secureArg || sameSite === 'None';
    if (expires) {
        if (returnCookieAsObject) {
            cookieObject.expires = expires.toUTCString();
        } else {
            cookieString += `; Expires=${expires.toUTCString()}`;
        }
    }
    if (maxAge) {
        if (returnCookieAsObject) {
            cookieObject.maxAge = maxAge;
        } else {
            cookieString += `; Max-Age=${maxAge.toString()}`;
        }
    }
    if (domain) {
        if (returnCookieAsObject) {
            cookieObject.domain = domain;
        } else {
            cookieString += `; Domain=${domain}`;
        }
    }
    if (path) {
        if (returnCookieAsObject) {
            cookieObject.path = path;
        } else {
            cookieString += `; Path=${path}`;
        }
    }
    if (secure) {
        if (returnCookieAsObject) {
            cookieObject.secure = secure;
        } else {
            cookieString += `; Secure=${secure}`;
        }
    }
    if (httpOnly) {
        if (returnCookieAsObject) {
            cookieObject.httpOnly = httpOnly;
        } else {
            cookieString += `; HttpOnly=${httpOnly}`;
        }
    }
    if (sameSite) {
        if (returnCookieAsObject) {
            cookieObject.sameSite = sameSite;
        } else {
            cookieString += `; SameSite=${sameSite}`;
        }
    }
    return returnCookieAsObject ? cookieObject : cookieString;
};
export const getCookieExpiration = ({ seconds = 7200 })=>{
    const currentTime = new Date();
    currentTime.setSeconds(currentTime.getSeconds() + seconds);
    return currentTime;
};
export const generatePayloadCookie = ({ collectionAuthConfig, cookiePrefix, returnCookieAsObject = false, token })=>{
    const sameSite = typeof collectionAuthConfig.cookies.sameSite === 'string' ? collectionAuthConfig.cookies.sameSite : collectionAuthConfig.cookies.sameSite ? 'Strict' : undefined;
    return generateCookie({
        name: `${cookiePrefix}-token`,
        domain: collectionAuthConfig.cookies.domain ?? undefined,
        expires: getCookieExpiration({
            seconds: collectionAuthConfig.tokenExpiration
        }),
        httpOnly: true,
        path: '/',
        returnCookieAsObject,
        sameSite,
        secure: collectionAuthConfig.cookies.secure,
        value: token
    });
};
export const generateExpiredPayloadCookie = ({ collectionAuthConfig, cookiePrefix, returnCookieAsObject = false })=>{
    const sameSite = typeof collectionAuthConfig.cookies.sameSite === 'string' ? collectionAuthConfig.cookies.sameSite : collectionAuthConfig.cookies.sameSite ? 'Strict' : undefined;
    const expires = new Date(Date.now() - 1000);
    return generateCookie({
        name: `${cookiePrefix}-token`,
        domain: collectionAuthConfig.cookies.domain ?? undefined,
        expires,
        httpOnly: true,
        path: '/',
        returnCookieAsObject,
        sameSite,
        secure: collectionAuthConfig.cookies.secure
    });
};
export const parseCookies = (headers)=>{
    const cookieMap = new Map();
    const cookie = headers.get('Cookie');
    if (cookie) {
        cookie.split(';').forEach((cookie)=>{
            const parts = cookie.split('=');
            const key = parts.shift()?.trim();
            const encodedValue = parts.join('=');
            try {
                const decodedValue = decodeURI(encodedValue);
                cookieMap.set(key, decodedValue);
            } catch (ignore) {
                return null;
            }
        });
    }
    return cookieMap;
};

//# sourceMappingURL=cookies.js.map