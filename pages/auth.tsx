import React from "react";
import LoginForm from "../components/auth/login-form";
import SignUpForm from "../components/auth/signup-form";
import NavigationBar from "../components/navigation-bar";

export const Auth = () => {
    const [formType, setFormType] = React.useState<"login" | "signup">("login");
    return (
        <div className="flex px-6  h-full relative">
            <div className="fixed -bottom-1 left-0 w-full md:relative md:w-auto md:px-6">
                <NavigationBar />
            </div>
            <div className="flex justify-center items-center w-full">
                <div className="w-full md:w-4/6 lg:w-3/6 xl:w-2/6 md:shadow-lg border md:p-8 rounded-2xl">
                    {formType === "login" && (
                        <>
                            <LoginForm />
                            <div className="text-center mt-4">
                                <span className="text-sm">
                                    Or{" "}
                                    <button
                                        onClick={() => setFormType("signup")}
                                        className="text-primary-main dark:text-primaryDark-main font-bold"
                                    >
                                        Create an account
                                    </button>
                                </span>
                            </div>
                        </>
                    )}
                    {formType === "signup" && (
                        <>
                            <SignUpForm />
                            <div className="text-center mt-4">
                                <span className="text-sm">
                                    Already have an account?
                                    <button
                                        onClick={() => setFormType("login")}
                                        className="text-primary-main dark:text-primaryDark-main font-bold"
                                    >
                                        Login
                                    </button>
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
