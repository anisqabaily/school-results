import React, { useState } from 'react';
import { Container, Tabs, Tab, Box } from '@mui/material';
import Login from './components/Login';
import SearchSchools from './components/SearchSchools';
import SearchMahd from './components/SearchMahd';
import EditSchools from './components/EditSchools';
import EditMahd from './components/EditMahd';
import UserMenu from './components/UserMenu';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [tab, setTab] = useState(0);

  if (!token) {
    return <Login onLogin={(t) => { setToken(t); localStorage.setItem('token', t); }} />;
  }

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="بحث المدارس" />
          <Tab label="بحث المعاهد" />
          <Tab label="تعديل المدارس" />
          <Tab label="تعديل المعاهد" />
          <Tab label="المستخدم" />
        </Tabs>
      </Box>

      {tab === 0 && <SearchSchools token={token} />}
      {tab === 1 && <SearchMahd token={token} />}
      {tab === 2 && <EditSchools token={token} />}
      {tab === 3 && <EditMahd token={token} />}
      {tab === 4 && <UserMenu token={token} onLogout={() => { localStorage.removeItem('token'); setToken(null); }} />}
    </Container>
  );
}
