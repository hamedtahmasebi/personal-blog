import * as argon2 from "argon2";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
import cookie from "cookie";
const JWT_EXPIRY_TIME: string = "1h";
const login: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ error: "Email and Password are required" });
    }
    const dbResult = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (dbResult === null) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const isVerified = await argon2.verify(dbResult.password, password);
    if (isVerified) {
        const token = createJwtToken(dbResult.id);

        const serializedCookie = cookie.serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60, //one hour in seconds
            path: "/",
        });

        res.setHeader("Set-Cookie", serializedCookie);
        return res.status(200).end();
    }
    return res.status(401).json({ error: "Invalid credentials" });
};

function createJwtToken(user_id: string) {
    return jwt.sign({ sub: user_id }, process.env.JWT_SECRET as string, {
        expiresIn: JWT_EXPIRY_TIME,
    });
}

export default login;
