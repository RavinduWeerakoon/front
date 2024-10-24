import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsernamesAndIds, addNewUser } from '../../services/journalService';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux'; // For accessing the Redux store

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [Error, setError] = useState('');
  const doctor = useSelector((state) => state.auth.displayName); // Access the doctor object from the Redux store
  console.log(doctor);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsernamesAndIds(doctor);
        if (Array.isArray(usersData)) {
          setUsers(usersData); // Ensure usersData is an array before setting it
        } else {
          setUsers([]); // Fallback to an empty array if usersData is not valid
        }
      
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleAddUserClick = () => {
    setIsAdding(true);
  };
  const handleNewUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };
  const handleAddNewUser = async () => {
    setIsConfirming(true);
    try {
      const response = await addNewUser(newUsername, doctor); // Service file should handle the logic of adding the user
      if (!response.success) {
        console.error('Error adding new user:', response.message);
        setError(response.message);
        return;
      }
      const newUser = {
        userId: response.userId,
        displayName: response.displayName,
        username: response.username,
        
      };
      setUsers((prevUsers) => [...prevUsers, newUser]); // Add new user to the list
      setNewUsername('');
      setIsAdding(false);
    } catch (error) {
      setError('Error adding new user');
      console.error('Error adding new user:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  const filteredUsers = (!users || users.length === 0)
    ? []
    : users.filter((user) => user.displayName.toLowerCase().includes(searchQuery.toLowerCase())); 

  const columns = [
    {
      field: 'displayName',
      headerName: 'Username',
      width: 150,
      renderCell: (params) => (
        <Link to={`/dashboard/user/${params.row.userId}`}>
          {params.value}
        </Link>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by username"
      />
      <div style={{ height: 400, width: '100%' , marginBottom: '60px'}}>
        <DataGrid
          rows={(filteredUsers.length === 0) ? users : filteredUsers}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.userId}
        />
      </div>
       {/* Add User Section */}
       {isAdding ? (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <TextField
            label="New Username"
            value={newUsername}
            onChange={handleNewUsernameChange}
            variant="outlined"
            sx={{ mr: 2 ,width: '1000px'}}
          />
          <Button
            variant="contained"
            onClick={handleAddNewUser}
            disabled={isConfirming}
            startIcon={<CheckIcon />}
          >
            {isConfirming ? 'Adding...' : 'Done'}
          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUserClick}
          sx={{ mt: 2 }}
          startIcon={<AddIcon />}
        >
          Add User
        </Button>
      )}
      {Error &&
        <Typography color="error" sx={{ mt: 2 }}>
          {Error}
        </Typography>
       }
    </Box>
  );
};

export default Users;