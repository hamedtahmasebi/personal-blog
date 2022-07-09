import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";

const addBookmark: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.cookies;
    const post_id = req.body.post_id;
    if (!token)
        return res
            .status(401)
            .json({ error: "User has not authenticated", isAuthenticated: false });
    if (!post_id) return res.status(401).json({ error: "post_id is required" });
    const { sub } = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!(sub && typeof sub === "string"))
        return res.status(401).json({ error: "Authentication Failed, please log in again" });
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: sub,
            },
        });
        if (!user) throw new Error("User not found in database");
        await prisma.bookmark.create({
            data: {
                user_id: sub,
                id: String(req.body.post_id),
            },
        });
        return res.status(200).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export default addBookmark;
