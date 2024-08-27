import React, { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { DataGrid } from '@mui/x-data-grid';

const dummyData = [
  { id: 1, name: 'Alice', age: 25, emotioncore: 75, isCritical: false },
  { id: 2, name: 'Bob', age: 30, emotioncore: 60, isCritical: true },
  { id: 3, name: 'Charlie', age: 35, emotioncore: 85, isCritical: false },
  { id: 4, name: 'David', age: 40, emotioncore: 50, isCritical: true },
  { id: 5, name: 'Eve', age: 45, emotioncore: 90, isCritical: false },
];

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = dummyData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'emotioncore', headerName: 'Emotioncore', width: 150 },
    {
      field: 'isCritical',
      headerName: 'Critical Status',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.value ? 'error' : 'success'}
        >
          {params.value ? 'Critical' : 'Normal'}
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="div" sx={{ mb: 2 }}>
        User List
      </Typography>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Users;