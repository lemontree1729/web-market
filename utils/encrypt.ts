import { envExist } from "./validateEnv"
import crypto, { randomBytes } from 'crypto'
import * as jose from 'jose'
import { isInError, isStringError } from "./server/commonError"

export function uuid4() {
    let result
    while (true) {
        var rnd = randomBytes(16);
        rnd[6] = (rnd[6] & 0x0f) | 0x40;
        rnd[8] = (rnd[8] & 0x3f) | 0x80;
        result = rnd.toString("hex").match(/(.{8})(.{4})(.{4})(.{4})(.{12})/);
        if (!result) {
            continue
        }
        result.shift();
        break;
    }
    return result.join("-");
}

export function encryptPassword(password: string) {
    const SECRET_PASSWORD_KEY = envExist(process.env.SECRET_PASSWORD_KEY, "secret password key", true)
    return crypto.createHmac('SHA3-256', SECRET_PASSWORD_KEY).update(password).digest('hex')
}

export function encryptAuthNumber(fingerprint: string) {
    const SECRET_FINGERPRINT_KEY = envExist(process.env.SECRET_FINGERPRINT_KEY, "secret fingerprint key", true)
    return crypto.createHmac('SHA3-256', SECRET_FINGERPRINT_KEY).update(fingerprint).digest('hex')
}

export async function createJWT(aud: string, role: string, jti: string, expirationtime: string | number,) {
    const privateKey = await jose.importPKCS8(envExist(process.env.PKCS8, "pkcs8", true), "ES256")
    const jwt = await new jose.SignJWT({ role })
        .setProtectedHeader({ alg: 'ES256' })
        .setIssuedAt()
        .setIssuer('web-market')
        .setAudience(aud)
        .setExpirationTime(expirationtime)
        .setJti(jti)
        .sign(privateKey)
    return jwt

}

export async function verifyJWT(jwt: string) {
    const publicKey = await jose.importSPKI(envExist(process.env.SPKI, "spki", true), "ES256")
    const { payload: { aud, role, jti } } = await jose.jwtVerify(jwt, publicKey, { algorithms: ["ES256"], issuer: 'web-market' })
    if (typeof aud !== "string") {
        throw isStringError("aud")
    }
    if (typeof role !== "string") {
        throw isStringError("role")
    }
    if (!(["admin", "user"].includes(role))) {
        throw isInError("role")
    }
    if (typeof jti !== "string") {
        throw isStringError("jti")
    }
    return { aud, role, jti }
}