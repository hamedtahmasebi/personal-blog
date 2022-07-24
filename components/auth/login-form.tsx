import { useState, FormEvent } from "react";
import FloatingLabelInput from "../floating-label-input";
import PrimaryButton from "../primary-button";
import { validateEmail } from "../../utilities/actions";
import { registerErrors } from "../../utilities/errorMessages";
import { BiErrorCircle } from "react-icons/bi";
import { login as loginApiEndpoint } from "../../utilities/apiEndPoints";
import axios, { AxiosError } from "axios";
import Spinner from "../spinner";
import { useRouter } from "next/router";
import * as ROUTES from "../../utilities/routes";
import { toast } from "react-toastify";

type TProps = {
    onSuccessLogin?: Function;
    onFailLogin?: Function;
};

const LoginForm = ({ onSuccessLogin, onFailLogin }: TProps) => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
    const validateForm = () => {
        let errors = [];
        if (!(email && password)) {
            errors.push(registerErrors.fillAllRequiredFields);
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
            const res = await axios.post(ROUTES.baseUrl + loginApiEndpoint, { email, password });
            if (res.status === 200) {
                toast.success("Logged In successfully");
                onSuccessLogin && onSuccessLogin();
                router.push(`/${ROUTES.HOME}`);
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data.error) {
                setErrors([error.response.data.error]);
            }
            setErrors(["Something went wrong"]);
            onFailLogin && onFailLogin();
            console.log(error);
        }
        setIsPending(false);
    };

    return (
        <form onSubmit={onSubmit}>
            <h3>Login</h3>
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
            <PrimaryButton disabled={isPending} type="submit" className="w-full rounded-md mt-4">
                {isPending && (
                    <div className="h-auto w-8 mx-auto">
                        <Spinner />
                    </div>
                )}
                {!isPending && "Log in"}
            </PrimaryButton>
        </form>
    );
};

export default LoginForm;
