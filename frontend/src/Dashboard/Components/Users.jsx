import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsernamesAndIds } from '../../services/journalService';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsernamesAndIds();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.userId}
        />
      </div>
    </Box>
  );
};

export default Users;