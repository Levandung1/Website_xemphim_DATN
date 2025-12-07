// src/admin/AdminLayout.jsx
import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

const AdminLayout = ({ children }) => {
  return (
    <Layout>
      <Sidebar />
      <Main>
        <Topbar />
        <Content>{children}</Content>
      </Main>
    </Layout>
  );
};

export default AdminLayout;
