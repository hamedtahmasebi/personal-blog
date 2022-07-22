import axios, { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import * as apiEndPoints from "../../utilities/apiEndPoints";
import { baseUrl } from "../../utilities/routes";
import PrimaryButton from "../primary-button";
import SimpleInput from "../simple-input";
import Spinner from "../spinner";
export const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    const [isPending, setIsPending] = useState<boolean>(false);

    const onSubmitChangePassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        try {
            const res = await axios.post(baseUrl + apiEndPoints.CHANGE_PASSWORD, {
                oldPassword,
                newPassword,
                confirmNewPassword,
            });
            if (res.status === 200) {
                toast.success("Changed password successfully");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error: any) {
            console.log(error);
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error);
            } else {
                toast.error(error?.message ?? "something went wrong");
            }
        }
        return setIsPending(false);
    };

    return (
        <>
            <h4 className="text-black dark:text-white">Change password</h4>
            <form className="mt-6" onSubmit={onSubmitChangePassword}>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4 w-full">
                        <span className="text-base w-full">Current password</span>
                        <SimpleInput
                            placeholder="Current password"
                            type={"password"}
                            className="border rounded-md"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full">
                        <span className="text-base w-full">New password</span>
                        <SimpleInput
                            placeholder="New password"
                            type={"password"}
                            className="border rounded-md"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full">
                        <span className="text-base w-full">Confirm new password</span>
                        <SimpleInput
                            placeholder="Confirm new password"
                            type={"password"}
                            className="border rounded-md"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </div>

                    <div className="ml-auto w-full md:w-fit">
                        <PrimaryButton
                            type="submit"
                            disabled={isPending}
                            className="rounded-md w-full "
                        >
                            {isPending ? (
                                <div className="h-8 w-8 mx-auto">
                                    <Spinner background="transparent" fill="white" />
                                </div>
                            ) : (
                                "Change password"
                            )}
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ChangePasswordForm;
