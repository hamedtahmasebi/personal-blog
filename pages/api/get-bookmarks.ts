import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import withAuth from "../../middlewares/withAuth";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.cookies;
    if (token) {
        const verifyObj = jwt.verify(token, process.env.JWT_SECRET as string);
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
    return res.status(401).send({ error: "Token not provided or expired" });
};

export default handler;
