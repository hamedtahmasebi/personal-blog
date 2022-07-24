import { NextApiHandler } from "next";
import cookie from "cookie";
export const signout: NextApiHandler = (req, res) => {
    if (req.cookies.token) {
        const serializedCookie = cookie.serialize("token", "deleted", {
            path: "/",
            httpOnly: true,
            maxAge: 0,
        });
        res.setHeader("Set-Cookie", serializedCookie);
    }
    res.status(200).end();
};

export default signout;
