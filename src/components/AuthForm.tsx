import { type FormEvent, type ChangeEvent } from "react";
import { useInput } from "../hooks/useInput";
import { type RootState } from "../store/store";
import { useSelector } from "react-redux";
import Spinner from "./ui/Spinner";

interface AuthFormProps {
    submitFunction: (email: string, password: string) => void;
};

export default function AuthForm({ submitFunction }: AuthFormProps) {
    const { 
        value: emailValue, 
        error: emailError,
        isValid: isEmailValid,
        handleChange: handleEmailChange,
        handleTouch: handleEmailTouch
    } = useInput((value: string) => value.includes('@'));

    const { 
        value: passwordValue, 
        error: passwordError,
        isValid: isPasswordValid,
        handleChange: handlePasswordChange,
        handleTouch: handlePasswordTouch
    } = useInput((value: string) => value.length >= 8);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isEmailValid && isPasswordValid) {
            submitFunction(emailValue, passwordValue);
        }
    };

    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" value={emailValue} onChange={(e: ChangeEvent<HTMLInputElement>) => handleEmailChange(e.target.value)} onBlur={handleEmailTouch} required />
            { emailError && <span className="text-red-400">Invalid email</span> }
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" value={passwordValue} onChange={(e: ChangeEvent<HTMLInputElement>) => handlePasswordChange(e.currentTarget.value)} onBlur={handlePasswordTouch} required />
                { passwordError && <span className="text-red-400">Invalid password</span> }
        </div>
        <button disabled={!isEmailValid || !isPasswordValid} className="flex gap-x-1 py-1 px-3 w-30 justify-center bg-emerald-300 text-stone-700 font-medium shadow-md rounded-md cursor-pointer disabled:cursor-not-allowed">
            { isLoading ? <>Submitting... <Spinner className="text-stone-700"/></> : 'Sumbit'}
        </button>
    </form>
}