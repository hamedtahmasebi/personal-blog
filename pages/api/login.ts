import * as argon2 from "argon2";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
const JWT_EXPIRY_TIME: string = "3h";
const login: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ error: "Email and Password are required" });
    }
    const dbResult = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (dbResult === null) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const isVerified = await argon2.verify(dbResult.password, password);
    if (isVerified) {
        return res.status(200).json({
            accessToken: createJWT(email),
        });
    }
    return res.status(401).json({ error: "Invalid credentials" });
};

function createJWT(username: string) {
    return jwt.sign({ username: username }, process.env.JWT_SECRET as string, {
        expiresIn: JWT_EXPIRY_TIME,
    });
}

export default login;
