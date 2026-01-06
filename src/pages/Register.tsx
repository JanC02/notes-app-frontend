import AuthForm from "../components/AuthForm";
import { useDispatch } from "react-redux";
import { register } from "../store/slices/auth";
import { type AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import AuthPagesContainer from "../components/AuthPagesContainer";

export default function RegisterPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleRegister = async (email: string, password: string) => {
        const resultAction = await dispatch(register({ email, password }));

        if (register.fulfilled.match(resultAction)) {
            navigate('/login');
        }
    };

    return <AuthPagesContainer>
            <AuthForm submitFunction={handleRegister} formTitle="Register" buttonText="Register" activeText="Submitting..." isRegistration />
        </AuthPagesContainer>
}