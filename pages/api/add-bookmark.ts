import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import withAuth from "../../middlewares/withAuth";
import jwt from "jsonwebtoken";

const addBookmark: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.access_token || undefined;
    const post_id = req.body.post_id;
    if (!post_id) {
        return res.status(401).json({ error: "post_id is required" });
    }
    if (!token || typeof token !== "string") {
        return res
            .status(401)
            .json({ error: "Access token was not provided or it has invalid type" });
    }
    const { sub } = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!(sub && typeof sub === "string"))
        return res.status(401).json({ error: "Access token is invalid" });
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

export default withAuth(addBookmark);
