// @ts-strict-ignore
import crypto from 'crypto';
import scmp from 'scmp';
export const authenticateLocalStrategy = async ({ doc, password })=>{
    try {
        const { hash, salt } = doc;
        if (typeof salt === 'string' && typeof hash === 'string') {
            const res = await new Promise((resolve, reject)=>{
                crypto.pbkdf2(password, salt, 25000, 512, 'sha256', (e, hashBuffer)=>{
                    if (e) {
                        reject(null);
                    }
                    if (scmp(hashBuffer, Buffer.from(hash, 'hex'))) {
                        resolve(doc);
                    } else {
                        reject(null);
                    }
                });
            });
            return res;
        }
        return null;
    } catch (err) {
        return null;
    }
};

//# sourceMappingURL=authenticate.js.map