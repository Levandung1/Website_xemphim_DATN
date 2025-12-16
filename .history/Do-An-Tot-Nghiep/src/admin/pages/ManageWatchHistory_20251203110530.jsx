// src/admin/pages/ManageWatchHistory.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: black; /* ✅ đảm bảo chữ mặc định là đen */
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 8px;
  border-collapse: collapse;
  color: black; /* ✅ chữ trong bảng là đen */
`;

const Th = styled.th`
  background: #f2f2f2;
  padding: 10px;
  text-align: left;
  color: black; /* ✅ header chữ đen */
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: black; /* ✅ ô dữ liệu chữ đen */
`;

const ActionButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
`;

const ManageWatchHistory = () => {
  const [history, setHistory] = useState([
    { id: 1, user: 'jdoe', movie: 'Batman Begins', date: '2025-01-01' },
    { id: 2, user: 'admin', movie: 'Inception', date: '2025-01-15' },
  ]);

  const handleDelete = (id) => {
    const confirm = window.confirm('Xoá lịch sử này?');
    if (confirm) {
      setHistory(prev => prev.filter(h => h.id !== id));
    }
  };

  return (
    <Container>
      <Title>🕒 Quản lý lịch sử xem</Title>
      <Table>
        <thead>
          <tr>
            <Th>Người dùng</Th>
            <Th>Phim</Th>
            <Th>Ngày xem</Th>
            <Th>Hành động</Th>
          </tr>
        </thead>
        <tbody>
          {history.map(item => (
            <tr key={item.id}>
              <Td>{item.user}</Td>
              <Td>{item.movie}</Td>
              <Td>{item.date}</Td>
              <Td>
                <ActionButton onClick={() => handleDelete(item.id)}>Xoá</ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageWatchHistory;