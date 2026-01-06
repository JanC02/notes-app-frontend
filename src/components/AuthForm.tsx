import { type FormEvent, type ChangeEvent } from "react";
import { useInput } from "../hooks/useInput";
import { type RootState } from "../store/store";
import { useSelector } from "react-redux";
import Spinner from "./ui/Spinner";

interface AuthFormProps {
    submitFunction: (email: string, password: string) => void;
    formTitle: string;
    buttonText: string;
    activeText: string;
    isRegistration?: boolean;
};

export default function AuthForm({ submitFunction, formTitle, buttonText, activeText, isRegistration = false }: AuthFormProps) {
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

        if (!isRegistration || (isEmailValid && isPasswordValid)) {
            submitFunction(emailValue, passwordValue);
        }
    };

    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const error = useSelector((state: RootState) => state.auth.error);

    return <form onSubmit={handleSubmit} className="rounded-md shadow-lg w-md m-6 p-8 bg-[#f7f7f7] text-stone-900 flex flex-col">
        <h2 className="text-2xl font-medium mb-8">{formTitle}</h2>
        <div className="flex flex-col gap-y-4 mb-8">
            <div className="flex flex-col gap-y-3">
                <label htmlFor="email">Email:</label>
                <input className={`h-10 rounded-md bg-[#f7f7f7] p-4 border ${isRegistration && emailError ? 'border-red-500' : 'border-stone-700/60'}`} autoComplete="on" id="email" type="email" name="email" value={emailValue} onChange={(e: ChangeEvent<HTMLInputElement>) => handleEmailChange(e.target.value)} onBlur={handleEmailTouch} required />
                { isRegistration && emailError && <span className="text-red-500">Invalid email address</span> }
            </div>
            <div className="flex flex-col gap-y-3">
                <label htmlFor="password">Password:</label>
                <input className={`h-10 rounded-md bg-[#f7f7f7] p-4 border ${isRegistration && passwordError ? 'border-red-500' : 'border-stone-700/60'}`} autoComplete="on" id="password" type="password" name="password" value={passwordValue} onChange={(e: ChangeEvent<HTMLInputElement>) => handlePasswordChange(e.currentTarget.value)} onBlur={handlePasswordTouch} required />
                    { isRegistration && passwordError && <span className="text-red-500">Invalid password</span> }
            </div>
            { error &&  <div className="flex flex-col gap-y-3">
                <p className="text-red-500">{error}</p>
            </div> }
        </div>
        <button disabled={isRegistration && (!isEmailValid || !isPasswordValid)} className="flex gap-x-3 py-2 px-4 justify-center items-center bg-emerald-500 text-stone-100 font-medium shadow-md rounded-md cursor-pointer disabled:cursor-not-allowed">
            { isLoading ? <>{activeText} <Spinner className="text-stone-100 w-4 h-4"/></> : buttonText }
        </button>
    </form>
}