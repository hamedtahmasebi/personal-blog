import React from "react";
import FloatingLabelInput from "../../components/floating-label-input";
import PrimaryButton from "../../components/primary-button";
export const LoginForm = () => {
    return (
        <>
            <div className="md:shadow-2xl md:p-6 rounded-xl">
                <header>
                    <h3>SignUp</h3>
                    <p className="mt-2 text-sm">
                        Ex ut incididunt duis non veniam irure. Fugiat sunt est aliquip excepteur
                        consequat officia consequat sunt eiusmod. Consequat sint eiusmod proident
                        incididunt id quis dolor mollit non qui. Dolore eiusmod irure adipisicing
                        tempor cupidatat.
                    </p>
                </header>
                <div className="mt-4">
                    <FloatingLabelInput id="full-name" placeholder="Full name" type={"text"} />
                </div>
                <div className="mt-4">
                    <FloatingLabelInput id="email" placeholder="Email*" type={"email"} />
                </div>
                <div className="mt-4">
                    <FloatingLabelInput id="password" placeholder="Password*" type={"password"} />
                </div>
                <div className="mt-4">
                    <FloatingLabelInput
                        id="confirm-password"
                        placeholder="Confirm password*"
                        type={"password"}
                    />
                </div>

                <label htmlFor="terms-of-service" className="flex items-center mt-4 px-1">
                    <input type="checkbox" name="" id="terms-of-service" />
                    <span className="ml-4 text-base">I agree to the terms of service</span>
                </label>
                <footer className="mt-4 text-right">
                    <PrimaryButton className="w-full md:w-auto rounded-md">Sign up</PrimaryButton>
                </footer>
            </div>
        </>
    );
};
