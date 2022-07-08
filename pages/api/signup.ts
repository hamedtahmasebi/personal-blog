import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import * as argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import cookie from "cookie";
import jwt from "jsonwebtoken";
const JWT_EXPIRY_TIME: string = "1h";

export const signup: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            error: "Email and password are required",
        });
    }

    const hash = await argon2.hash(password);
    try {
        const possibleUserAccount = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (possibleUserAccount !== null && possibleUserAccount.email === email) {
            res.status(400).json({ error: `User already exists` });
        }
        if (possibleUserAccount === null) {
            const dbResult = await prisma.user.create({
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password: hash,
                },
            });
            const { password: pass, ...rest } = dbResult;
            const token = createJwtToken(dbResult.id);
            const serializedCookie = cookie.serialize("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60, //one hour in seconds
                path: "/",
            });

            res.setHeader("Set-Cookie", serializedCookie);
            res.status(200).json({ ...rest });
        }
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            res.status(500).json({
                error: "Internal Server Error",
            });
        }
        console.log(error);
    }
};

function createJwtToken(user_id: string) {
    return jwt.sign({ sub: user_id }, process.env.JWT_SECRET as string, {
        expiresIn: JWT_EXPIRY_TIME,
    });
}

export default signup;
