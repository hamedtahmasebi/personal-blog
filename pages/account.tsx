import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";

type TPageProps = {
    user: Omit<User, "password">;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
    if (!req.cookies.token) {
        res.statusCode === 401;
        return {
            redirect: {
                permanent: false,
                destination: "/auth",
            },
            props: {},
        };
    }
    // TODO: Create a utility function for token confirmation
    const { sub } = jwt.verify(req.cookies.token, process.env.JWT_SECRET as string);
    if (!sub || typeof sub !== "string") {
        res.statusCode === 401;
        return {
            redirect: {
                permanent: false,
                destination: "/auth",
            },
            props: {},
        };
    }
    const dbRes = await prisma.user.findUnique({ where: { id: sub } });
    if (!dbRes) {
        res.statusCode === 500;
        return { props: { error: "Internal server error" } };
    }

    let props: TPageProps = {
        user: dbRes,
    };

    return {
        props: props,
    };
};

export const Account: NextPage<TPageProps> & {
    getLayout: (page: React.ReactElement) => React.ReactElement;
} = ({ user }) => {
    const [editMode, setEditMode] = React.useState<boolean>(false);
    return (
        <div className="w-full mt-12">
            <div className="flex flex-col">
                <h4 className="text-black dark:text-white">Account details</h4>
                <div className="py-4">
                    <div className="flex">
                        <span>
                            First name <span>Something</span>
                        </span>
                        <span>
                            Last name <span>Something</span>
                        </span>
                    </div>
                    <div className="flex w-1/2 gap-4 justify-between mt-4">
                        <div className="flex gap-4 bg-slate-100 py-2 px-4 rounded-lg">
                            <span className="text-base">Email</span>{" "}
                            <span className="text-base text-black font-semibold dark:text-white ">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Account.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Account;
