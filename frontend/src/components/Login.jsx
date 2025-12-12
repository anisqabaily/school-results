import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
      const res = await axios.post('/api/auth/login', { name, password });
      onLogin(res.data.token);
    } catch (err) {
      alert('خطأ في تسجيل الدخول');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
      <TextField label="اسم المستخدم" fullWidth value={name} onChange={e => setName(e.target.value)} />
      <TextField label="كلمة المرور" fullWidth type="password" value={password} onChange={e => setPassword(e.target.value)} sx={{ mt: 2 }} />
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={submit}>تسجيل الدخول</Button>
    </Box>
  );
}
