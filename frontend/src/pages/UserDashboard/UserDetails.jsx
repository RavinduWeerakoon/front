import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { getPatientDetails, updatePatientDetails } from '../../services/journalService';
import { getAuth } from 'firebase/auth';

const UserDetails = () => {
    const { userId } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const [patientDetails, setPatientDetails] = useState({
        fullName: '',
        age: '',
        gender: '',
        phoneNumber: '',
        emergencyContactName: '',
        relation: '',
        emergencyContactEmail: '',
        emergencyContactPhoneNumber: '',
    });

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    const details = await getPatientDetails(user.uid);
                    setPatientDetails(details);
                }
            } catch (error) {
                console.error('Error fetching patient details:', error);
            }
        };

        fetchPatientDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                await updatePatientDetails(user.uid, patientDetails);
                setIsEditMode(false);
            }
        } catch (error) {
            console.error('Error updating patient details:', error);
        }
    };

    return (
        <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                {isEditMode ? 'Edit Patient Details' : 'Patient Details'}
            </Typography>
            <form onSubmit={handleSubmit}>

                <TextField
                    label="Full Name"
                    name="fullName"
                    value={patientDetails.fullName || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !isEditMode }}
                />
                <TextField
                    label="Age"
                    name="age"
                    value={patientDetails.age || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !isEditMode }}
                />
                <TextField
                    label="Gender"
                    name="gender"
                    value={patientDetails.gender || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !isEditMode }}
                />
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={patientDetails.phoneNumber || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !isEditMode }}
                />
                <TextField
                    label="Emergency Contact Name"
                    name="emergencyContactName"
                    value={patientDetails.emergencyContactName || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !isEditMode }}
                />
                <TextField
                    label="Relation"
                    name="relation"
                    value={patientDetails.relation || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !isEditMode }}
                />
                <TextField
                    label="Emergency Contact Email"
                    name="emergencyContactEmail"
                    value={patientDetails.emergencyContactEmail || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !isEditMode }}
                />
                <TextField
                    label="Emergency Contact Phone Number"
                    name="emergencyContactPhoneNumber"
                    value={patientDetails.emergencyContactPhoneNumber || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: !isEditMode }}
                />

                {isEditMode ? (
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Save
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={() => setIsEditMode(true)}
                    >
                        Edit
                    </Button>
                )}
            </form>
        </Box>
    );
};

export default UserDetails;