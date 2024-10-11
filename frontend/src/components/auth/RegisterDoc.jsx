import { useState } from 'react';
import { signUp } from '../../services/authService';
import {Button, TextField, Grid, Typography} from "@mui/material";
const RegisterDoc = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signUp(email, password, name, 'psychologist');
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh", backgroundColor:"f0f0f0" } }>
            <Grid item xs={12} sm={8} md={4} style={{backgroundColor: "f0f0f0"}}>
            <Grid container direction="column" alignItems="center" justifyContent="flex-start" spacing={2} style={{ height: "100%" ,backgroundColor:"f0f0f0"}}>
            <Grid item>
            <Typography variant='h4'>Register Psychologist</Typography>
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
                <TextField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Grid>
            <Grid item>
                
                <Button type="submit" variant="contained">Register</Button>
            </Grid>
            

            </Grid>
            </form>
            </Grid>
            </Grid>
            </Grid>
        </Grid>
    )
}

export default RegisterDoc;
