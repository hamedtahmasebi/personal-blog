import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import withAuth from "../../middlewares/withAuth";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found");

    if (req.headers.access_token) {
        const verifyObj = jwt.verify(req.headers.access_token as string, process.env.JWT_SECRET);
        const dbResult = await prisma.bookmark.findMany({
            where: {
                user_id: verifyObj.sub as string,
            },
        });
        res.status(200).json({
            bookmarks: dbResult || [],
        });
    }
};

export default withAuth(handler);
