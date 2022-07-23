import { NextApiHandler } from "next";
import * as argon2 from "argon2";
import prisma from "../../../lib/prisma";
import isTokenValid from "../../../utilities/verifyJwtCookie";
import jwt from "jsonwebtoken";
import cookie from "cookie";
const deleteAccount: NextApiHandler = async (req, res) => {
    if (!(req.cookies.token && isTokenValid(req.cookies.token, process.env.JWT_SECRET as string)))
        return res.status(401).json({ error: "Login required" });

    const { sub } = jwt.verify(req.cookies.token, process.env.JWT_SECRET as string);
    if (!(sub && typeof sub === "string"))
        return res.status(401).json({ error: "Invalid token, please login again" });
    if (!req.body.password) return res.status(400).json({ error: "Password is required" });
    try {
        const user = await prisma.user.findUnique({ where: { id: sub } });
        if (!user)
            return res
                .status(404)
                .json({ error: "No user found with this credentials, please contact support" });

        const verifyPass = await argon2.verify(user.password, req.body.password);
        if (!verifyPass) return res.status(401).json({ error: "Wrong password" });

        if (verifyPass === true) {
            await prisma.user.delete({ where: { id: sub } });
            const serializedCookie = cookie.serialize("token", "deleted", {
                path: "/",
                httpOnly: true,
                maxAge: 0,
            });
            res.setHeader("Set-Cookie", serializedCookie);
            return res.status(200).end();
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error, please contact support" });
    }
};

export default deleteAccount;
