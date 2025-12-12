import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';

export default function UserMenu({ token, onLogout }) {
  const [oldP, setOldP] = useState('');
  const [newP, setNewP] = useState('');

  const change = async () => {
    try {
      await axios.post('/api/users/change-password', { oldPassword: oldP, newPassword: newP }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Password changed');
    } catch (err) { alert('Error'); }
  };

  return (
    <Box>
      <TextField label="كلمة المرور القديمة" type="password" value={oldP} onChange={e => setOldP(e.target.value)} />
      <TextField label="كلمة المرور الجديدة" type="password" value={newP} onChange={e => setNewP(e.target.value)} />
      <Button onClick={change}>تغيير كلمة المرور</Button>
      <Button onClick={onLogout}>تسجيل خروج</Button>
    </Box>
  );
}
