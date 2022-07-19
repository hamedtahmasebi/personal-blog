import React, { useState } from "react";
import LoginForm from "./login-form";
import SignUpForm from "./signup-form";
export const Register = () => {
    const [form, setForm] = useState<"login" | "signup">("login");
    return (
        <>
            {form === "login" && (
                <>
                    <LoginForm />
                    <div className="text-center mt-6">
                        <span>Or </span>
                        <button
                            onClick={() => setForm("signup")}
                            className="text-primary-main dark:text-primaryDark-main"
                        >
                            <b>Create an account</b>
                        </button>
                    </div>
                </>
            )}
            {form === "signup" && (
                <>
                    <SignUpForm />
                    <div className="text-center mt-6">
                        <span>Already have an account?</span>
                        <button
                            onClick={() => setForm("login")}
                            className="text-primary-main dark:text-primaryDark-main"
                        >
                            <b>Log in</b>
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default Register;
