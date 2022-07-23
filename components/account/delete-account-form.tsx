import axios from "axios";
import React, { FormEvent, useState } from "react";
import { baseUrl } from "../../utilities/routes";
import DangerButton from "../danger-button";
import Modal from "../modal";
import SimpleInput from "../simple-input";
import * as apiEndPoints from "../../utilities/apiEndPoints";
export const DeleteAccountForm = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    const onSubmitDelete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password) return;
        try {
            const res = await axios.post(baseUrl + apiEndPoints.REMOVE_ACCOUNT, { password });
            if (res.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col w-full gap-4">
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={onSubmitDelete}>
                        <p className="text-red-600 text-base">
                            Please pay attention that all your data will be deleted!
                        </p>
                        <span className="text-black dark:text-white text-base mt-3">Password</span>
                        <SimpleInput
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="border mt-1"
                        />
                        <div className="ml-auto w-full md:w-fit">
                            <DangerButton
                                type="submit"
                                className="mt-4 w-full rounded"
                                disabled={!password}
                            >
                                Delete
                            </DangerButton>
                        </div>
                    </form>
                </Modal>
            )}
            <h4 className="text-red-600 dark:text-red-500">Delete account</h4>
            <p className="text-red-600 text-base">
                Please pay attention after removing you account all of your data will be lost
                permanently.
            </p>
            <div className="ml-auto w-full md:w-fit">
                <DangerButton onClick={() => setShowModal(true)} className="rounded w-full">
                    Delete account
                </DangerButton>
            </div>
        </div>
    );
};

export default DeleteAccountForm;
