import { useState } from "react";
import FloatingLabelInput from "../../components/floating-label-input";
import PrimaryButton from "../../components/primary-button";
const SignUpForm: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    return (
        <form>
            <h3>Sign up</h3>
            <div className="mt-4">
                <FloatingLabelInput
                    id="first_name"
                    placeholder="First name"
                    type={"text"}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="mt-4">
                <FloatingLabelInput
                    id="last_name"
                    placeholder="Last name"
                    type={"text"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
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
            <div className="mt-4">
                <FloatingLabelInput
                    id="confirm-password"
                    placeholder="Confirm password*"
                    type={"password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <PrimaryButton type="submit" className="w-full rounded-md mt-4">
                Create Account
            </PrimaryButton>
        </form>
    );
};

export default SignUpForm;
