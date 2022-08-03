import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";
import Layout from "../components/Layout";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";
import { ChangeNameForm } from "../components/account/change-name-form";
import ChangePasswordForm from "../components/account/change-password-form";
import DeleteAccountForm from "../components/account/delete-account-form";
import { DarkModeSwitch } from "../components/dark-mode-switch";
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
} = ({ user: userInitialDetails }) => {
    return (
        <div className="flex flex-col gap-8 w-full mt-12 mb-24">
            <div>
                <ChangeNameForm userInitialDetails={userInitialDetails} />
            </div>

            <div>
                <ChangePasswordForm />
            </div>

            <div>
                <DeleteAccountForm />
            </div>

            <div className="flex justify-between mt-5">
                <h3>Dark Mode</h3>
                <DarkModeSwitch />
            </div>
        </div>
    );
};

Account.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Account;
