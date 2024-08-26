import { useState } from 'react';
import { signUp } from '../../services/authService';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signUp(email, password, name, 'user');
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;
