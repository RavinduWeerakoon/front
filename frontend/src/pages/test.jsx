// Import necessary Firebase modules
import React, { useEffect, useState } from 'react';
import { fetchRecords } from '../services/journalService';



const TestComponent = ({ userId }) => {
  const [records, setRecords] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const records = await fetchRecords(userId);
      alert(JSON.stringify(records));
      await setRecords(records);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>This is test</h2>
      <h1>Records</h1>
      <pre>{JSON.stringify(records, null, 2)}</pre>
    </div>
  );
};

export default TestComponent;