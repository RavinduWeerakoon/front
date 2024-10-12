import { useState } from 'react';
import { signUp } from '../../services/authService';
import {Button, TextField, Grid, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import {Dialog} from "@mui/material";
import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const [errorMessages, setErrorMessages] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!name) errors.name = "Name is required.";
        if (!email) errors.email = "Email is required.";
        if (!password) errors.password = "Password is required.";
        if (!confirmPassword) errors.confirmPassword = "Confirm Password is required.";
        if (password !== confirmPassword) errors.passwordMatch = "Passwords do not match.";

        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            return;
        }
    
        try {
            
            const response = await signUp(email, password, name, 'user');
            console.log(response);
            if(response.success){
            const user  = response.user;
            navigate('/signin');
            console.log(user);
            }
            else{
                setErrorMessage(response.message);
            }
            ;
        } catch (error) {
            setErrorMessage("Failed to register");
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
                <TextField
                type="text"
                placeholder="Name"
                value={name} 
                onChange={(e) => setName(e.target.value)}
                error= {!! errorMessages.name}
                helperText={errorMessages.name} />
            </Grid>
            <Grid item>
                <TextField 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                error={!! errorMessages.email}
                helperText={errorMessages.email} />
            </Grid>
            
            <Grid item>
                <TextField 
                type={showPassword ? "text" : "password"}
                placeholder="Password" value={password} 
                onChange={(e) => setPassword(e.target.value)}
                error={!! errorMessages.password}
                helperText={errorMessages.password} 
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
                <TextField type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                error = {!! errorMessages.confirmPassword}
                helperText={errorMessages.confirmPassword} 
                 />
            </Grid>
            <Grid item>
                
                <Button type="submit" variant="contained">Register</Button>
            </Grid>
            { errorMessage && (
            <Grid item>
                <Typography variant="body1" color="error">{errorMessage}</Typography>
            </Grid>
)}
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
