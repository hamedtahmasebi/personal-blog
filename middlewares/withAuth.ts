import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
const withAuth = (handlerFunction: NextApiHandler): NextApiHandler => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        let access_token = req.headers.access_token || undefined;

        if (!access_token) {
            return (req: NextApiRequest, res: NextApiResponse) => {
                res.status(401).json({ error: "access token is required" });
            };
        }

        if (typeof access_token !== "string") {
            return (req: NextApiRequest, res: NextApiResponse) => {
                res.status(401).json({
                    error: "Access Token must be a string",
                });
            };
        }

        const verifyObj = jwt.verify(access_token, process.env.JWT_SECRET as string);
        if (verifyObj) {
            return handlerFunction(req, res);
        }
    };
};

export default withAuth;
