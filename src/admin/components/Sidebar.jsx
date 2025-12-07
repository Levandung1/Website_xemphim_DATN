// src/admin/components/Sidebar.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 220px;
  background-color: #20232a;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 1.4rem;
  color: #e50914;
`;

const MenuItem = styled(Link)`
  margin-bottom: 15px;
  font-size: 1rem;
  color: white;
  text-decoration: none;

  &:hover {
    color: #e50914;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Title>Quản trị</Title>
      <MenuItem to="/admin/manage-movies">🎬 Quản lý phim</MenuItem>
      <MenuItem to="/admin/manage-users">👥 Quản lý người dùng</MenuItem>
      <MenuItem to="/admin/manage-comments">💬 Quản lý bình luận</MenuItem>
      <MenuItem to="/admin/manage-history">🕒 Lịch sử xem</MenuItem>
      <MenuItem to="/admin/manage-categories">🏷️ Quản lý thể loại</MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
