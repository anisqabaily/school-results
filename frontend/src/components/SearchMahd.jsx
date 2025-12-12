import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

export default function SearchMahd({ token }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await axios.get('/api/mahd/search', { params: { name: q }, headers: { Authorization: `Bearer ${token}` } });
    setResults(res.data.results);
  };

  return (
    <div>
      <TextField label="ابحث بالاسم" value={q} onChange={e => setQ(e.target.value)} />
      <Button onClick={search}>بحث</Button>
      <List>
        {results.map(r => (
          <ListItem key={r.id_stud}>
            <ListItemText primary={`${r.name_student} - ${r.school}`} secondary={`مجموع: ${r.Sum}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
