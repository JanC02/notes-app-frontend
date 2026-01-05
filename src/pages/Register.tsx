import AuthForm from "../components/AuthForm";
import { useDispatch } from "react-redux";
import { register } from "../store/slices/auth";
import { type AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleRegister = async (email: string, password: string) => {
        const resultAction = await dispatch(register({ email, password }));

        if (register.fulfilled.match(resultAction)) {
            navigate('/login');
        }
    };

    return <div>
        Register Page
        <AuthForm submitFunction={handleRegister} />
    </div>
}