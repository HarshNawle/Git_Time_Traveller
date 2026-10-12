import { createHash, randomBytes } from "crypto";
import  jwt  from "jsonwebtoken";
import { env } from "../config/env.js";

const JWT_ISSUER = "git-history-time-traveller";
const JWT_AUDIENCE = "git-history-time-traveller";

export const generateRandomToken = () => {
    return randomBytes(48).toString("base64url")
};

export const hashToken = (token: string) => {
    return createHash("sha256").update(token).digest("hex");
};

export const createAccessToken = (userId: string) => {
    return jwt.sign({}, env.JWT_SECRET, {
        subject: userId,
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
        expiresIn: "15m",
        algorithm: "HS256"
    })
};

export const verifyAccessToken = (token : string) => {
    const payload = jwt.verify(
        token,
        env.JWT_SECRET,
        {
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE,
            algorithms: ["HS256"]
        }
    );

    if(typeof payload === "string" || typeof payload.sub !== "string") {
        throw new Error("invalid access token payload")
    }

    return payload.sub;
}