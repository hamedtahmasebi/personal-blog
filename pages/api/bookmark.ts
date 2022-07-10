import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
const bookmark: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ error: "Token cookie not found" });
    const verifyObj = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!verifyObj) return res.status(401).json({ error: "Token is expired, please log in again" });
    if (!(verifyObj.sub && typeof verifyObj.sub === "string"))
        return res.status(400).json({ error: "Authentication failed, please log in again" });
    const user = await prisma.user.findUnique({
        where: {
            id: verifyObj.sub,
        },
    });

    if (req.method === "GET") {
        try {
            const dbResult = await prisma.bookmark.findMany({
                where: {
                    user_id: verifyObj.sub as string,
                },
            });
            return res.status(200).json({
                bookmarks: dbResult,
            });
        } catch (error) {
            res.status(500).end();
        }
    }

    if (req.method === "POST") {
        const post_id = req.body.post_id;
        if (!post_id) return res.status(400).json({ error: "post_id is required" });

        const possibleBookmark = await prisma.bookmark.findFirst({
            where: {
                id: String(req.body.post_id),
                user_id: verifyObj.sub,
            },
        });
        try {
            if (!user) res.status(404).json({ error: "User was not found in the database" });

            if (possibleBookmark) return res.status(400).json({ error: "Already bookmarked" });

            await prisma.bookmark.create({
                data: {
                    user_id: verifyObj.sub,
                    id: String(req.body.post_id),
                },
            });
            return res.status(200).end();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

export default bookmark;
