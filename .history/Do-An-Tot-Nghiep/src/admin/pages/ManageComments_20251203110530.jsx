// src/admin/pages/ManageComments.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: black; /* ✅ đảm bảo chữ trong nội dung là màu đen */
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 8px;
  border-collapse: collapse;
  color: black; /* ✅ chữ trong bảng là màu đen */
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
  color: black; /* ✅ nội dung bảng chữ đen */
`;

const ActionButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
`;

const ManageComments = () => {
  const [comments, setComments] = useState([
    { id: 1, content: 'Phim này hay quá!', user: 'jdoe', movie: 'Batman Begins', date: '2025-01-02' },
    { id: 2, content: 'Tuyệt vời luôn', user: 'admin', movie: 'Inception', date: '2025-02-01' },
  ]);

  const handleDelete = (id) => {
    const confirm = window.confirm('Xoá bình luận này?');
    if (confirm) {
      setComments(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <Container>
      <Title>💬 Quản lý bình luận</Title>
      <Table>
        <thead>
          <tr>
            <Th>Nội dung</Th>
            <Th>Người dùng</Th>
            <Th>Phim</Th>
            <Th>Ngày</Th>
            <Th>Hành động</Th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <Td>{comment.content}</Td>
              <Td>{comment.user}</Td>
              <Td>{comment.movie}</Td>
              <Td>{comment.date}</Td>
              <Td>
                <ActionButton onClick={() => handleDelete(comment.id)}>Xoá</ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageComments;