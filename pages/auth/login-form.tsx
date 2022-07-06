import { useState } from "react";
import FloatingLabelInput from "../../components/floating-label-input";
import PrimaryButton from "../../components/primary-button";
const LoginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    return (
        <form action="">
            <h3>Login</h3>
            <div className="mt-4">
                <FloatingLabelInput
                    id="email"
                    placeholder="Email*"
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mt-4">
                <FloatingLabelInput
                    id="password"
                    placeholder="Password*"
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <PrimaryButton type="submit" className="w-full rounded-md mt-4">
                Log in
            </PrimaryButton>
        </form>
    );
};

export default LoginForm;
