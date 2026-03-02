import crypto from "crypto";

export function hashPassword(password) {
    return crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
}

export function verifyPassword(password, storedHash) {
    const hash = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    return hash === storedHash;
}