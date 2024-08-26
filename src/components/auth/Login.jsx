import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, getUserRole } from "../../services/authService";
import { Button, TextField, Grid, Typography } from "@mui/material";
import { loginSuccess, loginFailure } from "../../store/authSlice";





const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const error = useSelector((state) => state.auth.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "auth/login/pending" });
        try {
            const user = await signIn(email, password);
            if (user) {
                const email = user.email;
                const uid = user.uid;
                const displayName = user.displayName;

                const role = await getUserRole(user.uid);
                console.log(email, uid, displayName);
                console.log(role);
                dispatch(loginSuccess({ email,uid, displayName, role }));
            }
        } catch (error) {
            dispatch(loginFailure(error.message));
            console.log(error);
        }
    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh", backgroundColor:"f0f0f0" }  }>
            <Grid item xs={12} sm={8} md={4} style={{backgroundColor: "f0f0f0"}}>
            <Grid container direction="column" alignItems="center" justifyContent="flex-start" spacing={2} style={{ height: "100%" ,backgroundColor:"f0f0f0"}}>
            <Grid item>
            <Typography variant="h4">Login</Typography>
            </Grid>
            <Grid item>
            <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Grid>
                    {/* <Grid item>
                        <Button type="submit" variant="contained" disabled={status === "loading"}>
                            {status === "loading" ? <CircularProgress /> : "Login"}
                        </Button>
                    </Grid> */}
                    <Grid item>
                        <Button type="submit" variant="contained">Login</Button>
                    </Grid>
                    {error && <Grid item><Typography color="error">{error}</Typography></Grid>}
                </Grid>
            </form>
            </Grid>
            {loginSuccess && (
            <Grid item>
            <Typography variant="body1" color="primary">Login successful!</Typography>
        </Grid>)
            }
        
        </Grid>
        </Grid>
        </Grid>
    )
}

export default Login;