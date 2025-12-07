// src/admin/components/Topbar.jsx
import React from 'react';
import styled from 'styled-components';

const TopbarContainer = styled.div`
  height: 60px;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  color: black; /* ✅ Đặt màu chữ đen cho toàn bộ nội dung topbar */
`;

const AdminInfo = styled.div`
  font-weight: bold;
`;

const Topbar = () => {
  return (
    <TopbarContainer>
      <AdminInfo>👤 Admin</AdminInfo>
    </TopbarContainer>
  );
};

export default Topbar;
