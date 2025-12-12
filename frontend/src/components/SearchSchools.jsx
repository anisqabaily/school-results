import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

export default function SearchSchools({ token }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await axios.get('/api/students/search', { params: { name: q }, headers: { Authorization: `Bearer ${token}` } });
    setResults(res.data.results);
  };

  const printPdf = async (id) => {
    const res = await fetch(`/api/students/${id}/print`, { headers: { Authorization: `Bearer ${token}` } });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div>
      <TextField label="ابحث بالاسم" value={q} onChange={e => setQ(e.target.value)} />
      <Button onClick={search}>بحث</Button>
      <List>
        {results.map(r => (
          <ListItem key={r.id_stud} secondaryAction={<Button onClick={() => printPdf(r.id_stud)}>طباعة</Button>}>
            <ListItemText primary={`${r.name_student} - ${r.school}`} secondary={`مجموع: ${r.Sum} - نسبة: ${r.nsba}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
