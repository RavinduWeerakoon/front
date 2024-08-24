import React,{useState} from "react";
import { signIn, getUserRole } from "../../services/authService";

const Login = ({setUserRole}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signIn(email, password);
            if (user) {
                const role = await getUserRole(user.uid);
                setUserRole(role);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;