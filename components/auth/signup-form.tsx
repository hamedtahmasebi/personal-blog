import { FormEvent, useState } from "react";
import FloatingLabelInput from "../floating-label-input";
import PrimaryButton from "../primary-button";
import { validateEmail } from "../../utilities/actions";
import { registerErrors } from "../../utilities/errorMessages";
import { BiErrorCircle } from "react-icons/bi";
import Spinner from "../spinner";
import axios, { AxiosError } from "axios";
import * as ROUTES from "../../utilities/routes";
import { signup as signupApiEndpoint } from "../../utilities/apiEndPoints";
import { useRouter } from "next/router";
const SignUpForm: React.FC = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
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

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        const errors = validateForm();
        if (errors.length !== 0) return;
        try {
            const res = await axios.post(ROUTES.baseUrl + signupApiEndpoint, {
                firstName,
                lastName,
                email,
                password,
            });
            if (res.status === 200) {
                router.push(ROUTES.baseUrl + ROUTES.HOME);
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data.error) {
                setErrors([error.response.data.error]);
            }
        }
        setIsPending(false);
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
            <PrimaryButton disabled={isPending} type="submit" className="w-full rounded-md mt-4">
                {isPending && (
                    <div className="h-8 w-8 mx-auto">
                        <Spinner />
                    </div>
                )}
                {!isPending && "Create Account"}{" "}
            </PrimaryButton>
        </form>
    );
};

export default SignUpForm;
