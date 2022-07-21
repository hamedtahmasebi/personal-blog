import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";
import Layout from "../components/Layout";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";
import PrimaryButton from "../components/primary-button";
import SimpleInput from "../components/simple-input";
import SecondaryButton from "../components/secondary-button";
import axios from "axios";
import { CHANGE_ACCOUNT_DETAILS } from "../utilities/apiEndPoints";
import { baseUrl } from "../utilities/routes";
import { useRouter } from "next/router";
import { ChangeNameForm } from "../components/account/change-name-form";
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
} = ({ user: userInitialDetails }) => {
    return (
        <div className="w-full mt-12">
            <ChangeNameForm userInitialDetails={userInitialDetails} />
        </div>
    );
};

Account.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Account;
