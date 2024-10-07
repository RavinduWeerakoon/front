import { useState } from 'react';
import { signUp } from '../../services/authService';
import {Button, TextField, Grid, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import {Dialog} from "@mui/material";
import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            const user = await signUp(email, password, name, 'user');
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }
    const handleShowPassword =()=>{
        setShowPassword((prev)=>!prev);
    };



    return (
        <Dialog open={true}>
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh", backgroundColor:"f0f0f0" } }>
            <Grid item xs={12} sm={8} md={4} style={{backgroundColor: "f0f0f0"}}>
            <Grid container direction="column" alignItems="center" justifyContent="flex-start" spacing={2} style={{ height: "100%" ,backgroundColor:"f0f0f0"}}>
            <Grid item>
            <Typography variant='h4'>Register</Typography>
            </Grid>
            <Grid item>
            <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
            <Grid item>
                <TextField type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Grid>
            <Grid item>
                <TextField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            
            <Grid item>
                <TextField 
                type={showPassword ? "text" : "password"}
                placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} 
                InputProps={{
                    endAdornment:(
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}
                            aria-label='toggle password visibility'
                            edge='end'
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                    />
            </Grid>
            <Grid item>
                
                <Button type="submit" variant="contained">Register</Button>
            </Grid>
            <Grid item>
                <Button variant="contained" component={Link} to="/login">Already Have an Account</Button>
            </Grid>

            </Grid>
            </form>
            </Grid>
            </Grid>
            </Grid>
        </Grid>
        </Dialog>
    )
}

export default Register;
