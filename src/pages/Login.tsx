import AuthForm from "../components/AuthForm";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/auth";
import { type AppDispatch } from "../store/store";
import AuthPagesContainer from "../components/AuthPagesContainer";

export default function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = (email: string, password: string) => {
        dispatch(login({ email, password }));
    };

    return <AuthPagesContainer>
        <AuthForm submitFunction={handleLogin} formTitle="Log in" buttonText="Log in" activeText="Loggin in..." />
    </AuthPagesContainer>
}