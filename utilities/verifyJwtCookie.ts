import jwt from "jsonwebtoken";
export default function isJwtValid(jwtCookie: string, jwtSecret: string) {
    const { sub } = jwt.verify(jwtCookie, jwtSecret);
    if (sub) return true;
    return false;
}
