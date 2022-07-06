import { FormEvent, useState } from "react";
import FloatingLabelInput from "../../components/floating-label-input";
import PrimaryButton from "../../components/primary-button";
import { validateEmail } from "../../utilities/actions";
import { registerErrors } from "../../utilities/errorMessages";
import { BiErrorCircle } from "react-icons/bi";
const SignUpForm: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);

    const validateForm = () => {
        let errors = [];
        if (!(email && password && confirmPassword)) {
            errors.push(registerErrors.fillAllRequiredFields);
        }
        if (password !== confirmPassword) {
            errors.push(registerErrors.passwordAndConfirmNotMatch);
        }
        if (!validateEmail(email)) {
            errors.push(registerErrors.invalidFormatEmail);
        }
        setErrors(errors);
        return errors;
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm();
        if (errors.length !== 0) return;
    };

    return (
        <form onSubmit={onSubmit}>
            <h3>Sign up</h3>

            <p className="text-sm mt-2">
                Fields with <span className="font-bold align-middle mx-1 text-sm">*</span> Are
                required
            </p>
            {errors.length > 0 && (
                <p className="flex flex-col gap-1 mt-2">
                    {errors.map((err, index) => (
                        <span
                            key={`err-${index}`}
                            className="flex items-center gap-1 text-sm text-red-700 dark:text-red-500"
                        >
                            <BiErrorCircle />
                            {err}
                        </span>
                    ))}
                </p>
            )}
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
