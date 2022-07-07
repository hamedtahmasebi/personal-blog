import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import * as argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
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
            const result = await prisma.user.create({
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password: hash,
                },
            });
            const { password: pass, ...rest } = result;
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

export default signup;
