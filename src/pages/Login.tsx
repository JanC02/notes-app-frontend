import AuthForm from "../components/AuthForm";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/auth";
import { type AppDispatch } from "../store/store";

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = (email: string, password: string) => {
        dispatch(login({ email, password }));
    };

    return <div>
        Login Page
        <AuthForm submitFunction={handleLogin} />
    </div>
}