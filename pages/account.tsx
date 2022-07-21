import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";
import Layout from "../components/Layout";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";
import PrimaryButton from "../components/primary-button";
import SimpleInput from "../components/simple-input";
import SecondaryButton from "../components/secondary-button";
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
    const [accountDetails, setAccountDetails] = useState<Omit<User, "password">>({ ...user });

    type TInput = {
        label: string;
        key: "first_name" | "last_name";
    };

    const inputs: TInput[] = [
        { label: "First name", key: "first_name" },
        { label: "Last name", key: "last_name" },
    ];

    return (
        <div className="w-full mt-12">
            <div className="flex flex-col">
                <h4 className="text-black dark:text-white">Account details</h4>
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center gap-4 w-full">
                        <span className="text-base w-full">Email</span>
                        <SimpleInput
                            placeholder="Email"
                            type={"text"}
                            value={user.email}
                            disabled
                            className="border rounded-md"
                        />
                    </div>
                    {inputs.map((input, index) => (
                        <div
                            key={`account-details-input-${index}`}
                            className="flex items-center gap-4 w-full"
                        >
                            <span className="text-base w-full">{input.label}</span>
                            <SimpleInput
                                placeholder={input.label}
                                type="text"
                                value={accountDetails[input.key] ?? ""}
                                disabled={!editMode}
                                className="border rounded-md"
                                onChange={(e) =>
                                    setAccountDetails({
                                        ...accountDetails,
                                        [input.key]: e.target.value,
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="ml-auto w-fit">
                <SecondaryButton
                    className=" rounded-md"
                    onClick={(e) => {
                        setAccountDetails({ ...user });
                        setEditMode(!editMode);
                    }}
                >
                    {editMode ? "Discard" : "Edit mode"}
                </SecondaryButton>
                {editMode && (
                    <PrimaryButton className="rounded-md ml-2">Save changes</PrimaryButton>
                )}
            </div>
        </div>
    );
};

Account.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Account;
