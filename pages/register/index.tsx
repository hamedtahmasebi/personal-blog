import React from "react";
import { LoginForm } from "./login-form";
export default function Register() {
    return (
        <div className="flex justify-center w-full mt-4">
            <div className="mt-4 px-6 w-full md:w-1/3">
                <LoginForm />
            </div>
        </div>
    );
}
