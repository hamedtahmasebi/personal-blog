import { NextApiHandler } from "next";
import isJwtValid from "../../../../utilities/verifyJwtCookie";
import prisma from "../../../../lib/prisma";
const details: NextApiHandler = async (req, res) => {
    if (req.method !== "POST") return res.status(400).end();
    if (!req.cookies.token) {
        res.statusCode === 401;
        res.json({ error: "Login required" });
    }
    const isTokenValid = isJwtValid(req.cookies.token, process.env.JWT_SECRET as string);
    if (!isTokenValid) {
        res.status(401).json({ error: "invalid token, please login again" });
    }
    const { password, id, ...rest } = await prisma.user.update({
        where: { email: req.body.user.email },
        data: {
            first_name: req.body.user.first_name,
            last_name: req.body.user.last_name,
        },
    });

    res.json({ user: { ...rest } });
};

export default details;
