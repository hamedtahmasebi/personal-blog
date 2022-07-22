import { User } from "@prisma/client";
import React, { useState } from "react";
import SimpleInput from "../simple-input";
import PrimaryButton from "../primary-button";
import SecondaryButton from "../secondary-button";
import axios from "axios";
import * as apiEndPoints from "../../utilities/apiEndPoints";
import { baseUrl } from "../../utilities/routes";
type TProps = {
    userInitialDetails: Omit<User, "password">;
};

export const ChangeNameForm: React.FC<TProps> = ({ userInitialDetails }) => {
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [accountDetails, setAccountDetails] = useState<Omit<User, "password">>(() => ({
        ...userInitialDetails,
    }));

    type TInput = {
        label: string;
        key: "first_name" | "last_name";
    };

    const inputs: TInput[] = [
        { label: "First name", key: "first_name" },
        { label: "Last name", key: "last_name" },
    ];

    const onSaveChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (JSON.stringify(accountDetails) === JSON.stringify(userInitialDetails)) {
                throw new Error("No changes were made to user credentials, aborting");
            }
            const res = await axios.post(baseUrl + apiEndPoints.CHANGE_ACCOUNT_DETAILS, {
                user: accountDetails,
            });
            if (res.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            return setEditMode(false);
        }
        return setEditMode(false);
    };

    return (
        <>
            <h4 className="text-black dark:text-white">Account details</h4>
            <div className="mt-5">
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4 w-full">
                        <span className="text-base w-full">Email</span>
                        <SimpleInput
                            placeholder="Email"
                            type={"text"}
                            value={userInitialDetails.email}
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

                    <div className="w-full">
                        <div className="flex flex-col md:flex-row ml-auto mt-4 gap-2 md:w-fit">
                            <SecondaryButton
                                className=" rounded-md"
                                onClick={(e) => {
                                    setAccountDetails({ ...userInitialDetails });
                                    setEditMode(!editMode);
                                }}
                            >
                                {editMode ? "Discard" : "Edit"}
                            </SecondaryButton>
                            {editMode && (
                                <PrimaryButton
                                    onClick={onSaveChanges}
                                    className="rounded-md md:ml-2"
                                >
                                    Save changes
                                </PrimaryButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
