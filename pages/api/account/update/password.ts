import { NextApiHandler } from "next";
import isJwtValid from "../../../../utilities/verifyJwtCookie";
import * as argon2 from "argon2";
import prisma from "../../../../lib/prisma";
import jwt from "jsonwebtoken";
const password: NextApiHandler = async (req, res) => {
    if (!req.cookies.token) {
        return res.status(401).json({ error: "Login required" });
    }
    const isTokenValid = isJwtValid(req.cookies.token, process.env.JWT_SECRET as string);
    if (!isTokenValid) {
        return res.status(401).json({ error: "Invalid token, please login again" });
    }

    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const { sub } = jwt.verify(req.cookies.token, process.env.JWT_SECRET as string);
    if (!(sub && typeof sub === "string")) return res.status(400).json({ error: "Login required" });

    if (!(oldPassword && newPassword && confirmNewPassword))
        return res.status(400).json({ error: "Please fill all required fields" });

    if (newPassword !== confirmNewPassword)
        return res.status(400).json({ error: "Passwords do not match" });

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: sub,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isOldPasswordValid = await argon2.verify(user?.password, oldPassword);
        if (!isOldPasswordValid)
            return res.status(401).json({ error: "Old password is not correct" });

        const newPassHash = await argon2.hash(newPassword);

        await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                password: newPassHash,
            },
        });

        return res.status(200).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};

export default password;
