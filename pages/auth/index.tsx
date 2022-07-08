import { useState } from "react";
import LoginForm from "./login-form";
import SignUpForm from "./signup-form";
export default function Auth() {
    const [formType, setFormType] = useState<"signup" | "login">("login");

    return (
        <div className="flex justify-center w-full mt-4">
            <div className="mt-4 px-6 w-full md:w-1/3">
                <div className="md:shadow-2xl md:p-6 rounded-xl">
                    {formType === "signup" && <SignUpForm />}

                    {formType === "login" && <LoginForm />}

                    <div className="mt-4 text-center">
                        <span className="text-sm">
                            {formType === "signup" ? "Already have an account? " : "Or "}
                        </span>
                        <button
                            onClick={(e) => setFormType(formType === "login" ? "signup" : "login")}
                            className="text-sm text-primary-main dark:text-primaryDark-main font-semibold hover:underline"
                        >
                            {formType === "signup" && "Log in"}
                            {formType === "login" && "Create an account"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
